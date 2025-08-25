const express = require('express');
const Order = require('../Models/Order');
const Cart = require('../Models/Cart');
const { getIO } = require('../Socket'); // Make sure path is correct
const Fish = require('../Models/Fish');
const Customer = require('../Models/Customer');

const createOrder = async (req,res)=>{
  const userId = req.user.id; 
  const { paymentMethod} = req.body;

  try {

const user = await Customer.findById(userId)
if(!user){
  return res.status(200).json({success:false,message:"User Not Found"})
}
if(!user.verified){
  return res.status(200).json({success:false,message:"Account Disabled"})
}

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Group items by shopId
    const shopGroups = {};
    cart.items.forEach(item => {
      const shopId = item.shopId.toString();
      if (!shopGroups[shopId]) {
        shopGroups[shopId] = [];
      }
      shopGroups[shopId].push(item);
    });

    const createdOrders = [];

    for (const shopId in shopGroups) {
      const items = shopGroups[shopId];
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
const totalPrice = items.reduce((sum, item) => sum + item.price , 0);
      

  for (const item of items) {
    const fish = await Fish.findById(item.productId);

    if (!fish) {
      return res.status(404).json({ message: `Fish not found: ${item.name}` });
    }

    // check if enough stock
    if (fish.availableQuantityKg < item.quantity) {
      return res.status(400).json({ message: `Not enough stock for ${fish.name}` });
    }

    fish.availableQuantityKg -= item.quantity;

    // update availability if stock runs out
    if (fish.availableQuantityKg <= 0) {
      fish.availableQuantityKg = 0;
      fish.isAvailable = false;
    }

    await fish.save();
  }


const newOrder = new Order({
  userId,
  shopId,
  items,
  totalQuantity,
  totalPrice,
  deliveryCharge: 40,
  paymentMethod,
  paymentStatus: paymentMethod === 'COD' ? 'pending' : 'paid',
  orderStatus: 'placed',
  shopsNotified: [shopId]
});



  await newOrder.save();
      createdOrders.push(newOrder);


      
     const io = getIO();
io.to(shopId).emit('new-order', {
  orderId: newOrder._id,
  shopId,
  sound: true,
  message: "New Order Received!"
});


io.to("adminRoom").emit("admin-notification", {
      orderId: newOrder._id,
      userId: userId,
      shopId: shopId,
      message: "An order has been confirmed!"
    });

    }

    cart.items = [];
    cart.totalPrice = 0;
    cart.totalQuantity = 0;
    await cart.save();

    res.status(201).json({ message: "Orders placed", orders: createdOrders });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


const getOrderByOwner = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const orders = await Order.find({
      shopsNotified: ownerId
    });
if(orders.length == 0){
  return res.status(201).json({success:false,message:"No Orders in Shops"})
}
    res.status(200).json({success:true,orders});
  } catch (error) {
    console.error("Error fetching orders by owner:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate({
        path: 'shopsNotified', 
        select: 'shopName shopImage' 
      });

    if (orders.length == 0) {
      return res.status(201).json({ success: false, message: "No Orders" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders by user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getOrderByOrderId = async (req,res)=>{
  try {
    const {orderId} = req.params
    const order = await Order.findById(orderId)
    
    if(!order){
      return res.status(201).json({success:false,message:"Order Not Found"})
    }
    res.status(200).json({success:true,order})
  } catch (error) {
     console.error("Error fetching orders by user:", error);
    res.status(500).json({ error: "Server error" });
  }
}


const getOrderByShopId = async (req,res)=>{
try {
  const ownerId = req.user.id;
  const orders = await Order.find({shopsNotified:ownerId})
  if(orders.length == 0){
    return res.status(200).json({success:false,message:"No Orders"})
  }

  res.status(200).json({success:true,orders})
} catch (error) {
   console.error("Error fetching orders by user:", error);
    res.status(500).json({ error: "Server error" });
}
}

const updateOrderStatusByOwner = async (req,res)=>{
  try {
    const {status} = req.body
    const {orderId} = req.params

console.log(orderId,status)

    const order = await Order.findByIdAndUpdate(orderId,{orderStatus:status},{new:true})
    if(!order){
      return res.status(200).json({success:false,message:"Order Not Found"})
    }
    res.status(201).json({success:true,order})
  } catch (error) {
       console.error("Error fetching orders by user:", error);
    res.status(500).json({ error: "Server error" });
  }
}
module.exports = {createOrder,getOrderByOwner,getOrdersByUser,getOrderByOrderId,getOrderByShopId,updateOrderStatusByOwner}