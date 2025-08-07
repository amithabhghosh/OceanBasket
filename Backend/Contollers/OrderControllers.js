const express = require('express');
const Order = require('../Models/Order');
const Cart = require('../Models/Cart');
const { getIO } = require('../Socket'); // Make sure path is correct

const createOrder = async (req,res)=>{
  const userId = req.user.id; // Assuming auth middleware sets this
  const { paymentMethod} = req.body;

  try {
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
const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
module.exports = {createOrder}