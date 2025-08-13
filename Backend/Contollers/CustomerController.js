const express = require('express');
const argon2 = require('argon2'); // ✅ use argon2
const jwt = require('jsonwebtoken');
const User = require('../Models/Customer');
const Cart = require("../Models/Cart")
const {CustomerAuthentication} = require("../MiddleWare/Middleware")
const {getAuthentication} = require("../MiddleWare/getAuth");
const Fish = require('../Models/Fish');
const mongoose = require('mongoose');
const generateOTP = require('../utils/GenerateOTP');
const sendOTP = require('../utils/sendOTP');
const Customer = require('../Models/Customer');
const { default: axios } = require('axios');
const Owner = require('../Models/Owner');
const { isInEditWindow } = require('../utils/timeWindow');
const moment = require("moment-timezone");
require("dotenv").config() 

let otpStore = {};
const OTP_EXPIRATION = 5 * 60 * 1000;
let sessionId = null;
const otpSending = async (req,res)=>{

const {phone}=req.body
  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser){
      return res.status(400).json({ msg: 'User already exists' });
    }

console.log("Generating OTP...");
console.log(process.env.FAST2SMS_API_KEY) 
        const otp = generateOTP();
        const expiresAt = Date.now() + OTP_EXPIRATION;
        
        otpStore[phone] = { otp, expiresAt };

 await sendOTP(phone,otp)

// console.log("API KEY:", process.env.TWO_FACTOR_API_KEY);

// const response = await axios.get(
//   `https://2factor.in/API/V1/${process.env.TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN/OTP1`
// );



//     sessionId = response.data.Details;
//      res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       sessionId,
//     });
  } catch (error) {
  console.error("Error sending OTP:", error.response?.data || error.message);
  res.status(500).json({ error: "Failed to send OTP" });
  }
}

const verifyCustomer = async (req,res)=>{
  try{

const { phone, otp } = req.body;

    if (!otpStore[phone] || otpStore[phone].expiresAt < Date.now()) {
      return res.json({ message: "OTP expired. Request a new one." });
    }
  
    if (otpStore[phone].otp !== otp) {
      return res.json({ message: "Invalid OTP" });
    }
  
    delete otpStore[phone];

    return res.status(200).json({success:true,message:"OTP VERIFIED"})


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
// const { otp } = req.body;
//   try {
//     const response = await axios.get(
//       `https://2factor.in/API/V1/${process.env.TWO_FACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
//     );

//     if (response.data.Details === "OTP Matched") {
//       res.status(200).json({ message: "OTP Verified" });
//     } else {
//       res.status(400).json({ message: "OTP Invalid" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "OTP verification failed" });
//   }

} 
 

const registerCustomer = async(req,res)=>{
  try {
    const {name,password,phone} = req.body
  const customer = await Customer.findOne({phone:phone})
  if(customer){
    return res.status(400).json({success:false,message:"Customer Already Exists"})
  }
  const hashedPassword = await argon2.hash(password);
  const newOne= new Customer({
    name,
    phone,
    password:hashedPassword
  })
  await newOne.save()
  res.status(201).json({success:true,message:"Customer Registration SuccessFull"})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
}

const loginCustomer = async (req,res)=>{
const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '5h' });

    res.status(201).json({
      success:true,
      token,
      user: { id: user._id, email: user.email,address:user.address,zipCode : user.zipCode },
      refreshToken
    });
  } catch (err) {
    res.status(500).json({success:false, error: err.message });
  }
}

const getCart = async (req,res)=>{
try {
    const userId = req.user.id;
    
    const cartItems = await Cart.find({ userId: userId });

    res.status(200).json({
      success: true,
      cart: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching cart",
      error: error.message,
    });
  }
}

const addCart = async(req,res)=>{
try {
    const { productId,quantity,shopId } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: "Product ID and Qunatity required" });
    }

 const fish = await Fish.findById(productId);
    if (!fish) {
      return res.status(404).json({ msg: 'Fish product not found' });
    }


let cart = await Cart.findOne({ userId });
  
    if (!cart) {
     
      const newItem = {
        productId,
        name: fish.name,
        image: fish.image || '',
        fishPrice: fish.pricePerKg,
        price:fish.pricePerKg*quantity,
        quantity,
        type:fish.type,
        shopId
      };

      const totalPrice = quantity * fish.pricePerKg;

      cart = new Cart({
        userId,
        items: [newItem],
        totalQuantity: quantity,
        totalPrice: totalPrice,
      });

      await cart.save();
      return res.status(201).json({success:true,cart});
    }

   const itemExists = cart.items.some(item => item.productId.toString() === productId);

if (itemExists) {
  return res.status(400).json({
    success: false,
    message: 'Product already exists in cart',
  });
}

cart.items.push({
  productId,
  name: fish.name,
  image: fish.image || '',
   fishPrice: fish.pricePerKg,
  price:fish.pricePerKg*quantity,
  quantity,
      type:fish.type,
  shopId,
});

    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    res.status(200).json({success:true,cart});
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
  }
}


const addCartIfNotadded = async (req,res)=>{
 try {
    const { productId, price ,name} = req.body;
    const userId = req.user.id;

    if (!productId || !price ) {
      return res.status(400).json({ success: false, message: "Product ID and price required" });
    }


    let cartItem = await Cart.findOne({ user: userId, productId });

    if (cartItem) {
    
      return res.status(200).json({ success: false, message: "Allready In Cart"});
    }

  
    const newCart = new Cart({
      user: userId,
      productId,
      price,
      quantity: 0.5,
      name
    });

    await newCart.save();
    res.status(201).json({ success: true, message: "Added to cart", cart: newCart });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
  }
}


const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.params;

    console.log("USER:", userId);
    console.log("PRODUCT TO DELETE:", productId);

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log("Cart not found");
      return res.status(404).json({ success: false, msg: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      console.log("Item not found in cart");
      return res.status(404).json({ success: false, msg: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);

    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    await cart.save();

    res.status(200).json({ success: true, msg: 'Item removed from cart', cart });
  } catch (error) {
    console.error("DELETE CART ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message,
    });
  }
};


const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOneAndUpdate(
      {
        userId,
        'items.productId': productId
      },
      {
        $set: {
          'items.$.quantity': quantity,
          'items.$.price': price * quantity
        }
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }
    
const updatedCart = await Cart.findOne({ userId });

if (updatedCart) {
  const newTotalPrice = updatedCart.items.reduce((sum, item) => sum + item.price, 0);
  const newTotalQuantity = updatedCart.items.reduce((sum, item) => sum + item.quantity, 0);

  updatedCart.totalPrice = newTotalPrice;
  updatedCart.totalQuantity = newTotalQuantity;
  await updatedCart.save();
}


    res.status(200).json({ success: true, cartItem: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error: error.message });
  }
};


const getProfile = async (req,res)=>{
 try {
    const userId = req.user.id;

   const user = await User.findById(userId).select('-password');

    if(!user){
      return res.status(400).json({success:false,message:"No such Users"})
    }

    res.status(200).json({success:true,user})
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}

const updateProfile = async (req,res)=>{
     try {
        const userId = req.user.id;
        const { name, email, alternativeNumber } = req.body;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(400).json({ success: false, message: "No user found" });
        }
    
        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.alternativeNumber = alternativeNumber || user.alternativeNumber;
    
        await user.save();
    
        res.status(200).json({ success: true, message: "Profile updated", user });
      } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
      }
}

const getAddress = async (req,res)=>{
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("address");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, addresses: user.address });
  } catch (error) {
    console.error("Error fetching addresses:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

const addAddress =async (req,res)=>{
     try {
        const userId = req.user.id;
    
        const {
          firstName,
          secondName,
          zipCode,
          state,
          addressLine1,
          addressLine2,
          landmark,
          city
        } = req.body;
    
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
    
        // Create the new address object
        const newAddress = {
          firstName,
          secondName,
          zipCode,
          state,
          addressLine1,
          addressLine2,
          landmark,
          city,
          default:true
        };
    
        // Add to the address array
        user.address.push(newAddress);
        await user.save();
    
        res.status(200).json({
          success: true,
          message: "Address added successfully",
          addresses: user.address,
        });
      } catch (error) {
        console.error("Add Address Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
      }
}

const editAddress = async (req,res)=>{
      try {
        const userId = req.user.id;
        const { addressLine1,
      addressLine2,
      city,
      zipCode,
      landmark } = req.body;
    
        const user = await User.findById(userId);
    
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
       
        // Update the specific address
        user.address[0] = {addressLine1,
      addressLine2,
      city,
      zipCode,
      landmark};
    
        await user.save();
    
        res.status(200).json({ success: true, message: "Address updated", addresses: user.address });
      } catch (error) {
        console.error("Edit address error:", error.message);
        res.status(500).json({ success: false, error: error.message });
      }
}

const deleteAddress = async (req,res)=>{
      try {
    const userId = req.user.id;
   

    const user = await User.findById(userId);
    if (!user || user.address.length == 0) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    
    user.address.splice(0, 1);
    await user.save();

    res.status(200).json({ success: true, addresses: user.address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const listShopByPincode = async (req,res)=>{
  try {
    const {zipCode} = req.params
   
     const limit = parseInt(req.query.limit) || 3;
    const skip = parseInt(req.query.skip) || 0;

    const shops = await Owner.find({zipCode:zipCode}).select("-password")
                              .skip(skip)
                             .limit(limit);

    if(shops.length == 0){
      return res.status(200).json({success:false,message:"No Shops Under This Pincode"})
    }

    return res.status(200).json({success:true,shops})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
}
const getFishWithHighRating = async (req,res)=>{
  try {
    const {zipCode} = req.params
    const limit = 5; 
    const skip = parseInt(req.query.skip) || 0;

    const shops = await Owner.find({zipCode:zipCode})

    if(shops.length == 0){
return res.status(200).json({success:false,message:"No shops In This Pincode"})
    }

const shopsId = shops.map(shop=>shop._id)

const fishes = await Fish.find({owner:{$in:shopsId}}).sort({rating:-1}).skip(skip)
                                                                      

 if (fishes.length === 0) {
      return res.status(200).json({ success: false, message: "No fishes found in these shops" });
    }


const uniqueFishMap = new Map();
fishes.forEach(fish => {
  if (!uniqueFishMap.has(fish.name)) {
    uniqueFishMap.set(fish.name, fish);
  }
});

const uniqueFishes = Array.from(uniqueFishMap.values());
   console.log(shops)
    return res.status(200).json({ success: true, fishes,uniqueFishes });
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
}

const getShopByShopId = async (req,res)=>{
  try {
    const {ownerId} = req.params
    const owner = await Owner.findById(ownerId).select("-password")
    if(!owner){
      return res.status(201).json({success:false,message:"Shop Not Found"})
    }
    const fishes = await Fish.find({owner:ownerId})
   
    res.status(201).json({success:true,owner,fishes})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
}

const getClosingTime = async (req,res)=>{
  try {
    const shop = await Owner.findById(req.params.shopId);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    const now = moment().tz("Asia/Kolkata");


    const [closeHour, closeMinute] = shop.shopCloseTime.split(":").map(Number);
    const closeTime = moment().tz("Asia/Kolkata").set({ hour: closeHour, minute: closeMinute, second: 0 });
    const isClosed = now.isAfter(closeTime);


    const isBlocked = isClosed || isInEditWindow();

    res.json({ isBlocked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = {getClosingTime,getShopByShopId,getFishWithHighRating,registerCustomer,verifyCustomer,otpSending,loginCustomer,getCart,addCart,addCartIfNotadded,deleteCartItem,updateQuantity,getProfile,updateProfile,getAddress,addAddress,editAddress,deleteAddress,listShopByPincode}


