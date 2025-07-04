const express = require('express');
const argon2 = require('argon2'); // ✅ use argon2
const jwt = require('jsonwebtoken');
const User = require('../Models/Customer');
const Cart = require("../Models/Cart")
const {CustomerAuthentication} = require("../MiddleWare/Middleware")
const {getAuthentication} = require("../MiddleWare/getAuth")



const registerCustomer = async (req,res)=>{
 const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await argon2.hash(password);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 
 
const loginCustomer = async (req,res)=>{
const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '5h' });
    res.json({
      token,
      user: { id: user._id, email: user.email },
      refreshToken
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getCart = async (req,res)=>{
try {
    const userId = req.user.id;
    
    const cartItems = await Cart.find({ user: userId });

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
    const { productId, price, quantity,name } = req.body;
    const userId = req.user.id;

    if (!productId || !price || !quantity) {
      return res.status(400).json({ success: false, message: "Product ID and price required" });
    }


    let cartItem = await Cart.findOne({ user: userId, productId });

    if (cartItem) {
      
      return res.status(200).json({ success: true, message: "All Ready in cart", cart: cartItem });
    }

    // If not exists, create new cart item
    const newCart = new Cart({
      user: userId,
      productId,
      price,
      quantity,
      name
    });

    await newCart.save();
    res.status(201).json({ success: true, message: "Added to cart", cart: newCart });

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

    // If not exists, create new cart item
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

const deleteCartItem = async (req,res)=>{
     try {
        const userId = req.user.id;
        const { id } = req.params;
    
        const deletedItem = await Cart.findOneAndDelete({ user: userId, _id:id });
    
        if (!deletedItem) {
          return res.status(404).json({ success: false, message: "Item not found in cart" });
        }
    
        res.status(200).json({ success: true, message: "Item removed from cart" });
      } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting item", error: error.message });
      }
}

const updateQuantity =async (req,res)=>{
     try {
        const { productId, quantity, price } = req.body;
        const userId = req.user.id;
    
        const updated = await Cart.findOneAndUpdate(
          { user: userId, productId },
          {
            quantity,
            price: price * quantity * 2
          },
          { new: true }
        );
    
        res.status(200).json({ success: true, cartItem: updated });
      } catch (error) {
        res.status(500).json({ success: false, message: "Update failed", error: error.message });
      }
}

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
        const { name, phone, altPhone } = req.body;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(400).json({ success: false, message: "No user found" });
        }
    
        // Update fields
        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.altPhone = altPhone || user.altPhone;
    
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
          city
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
        const { index, updatedAddress } = req.body;
    
        const user = await User.findById(userId);
    
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
        if (!user.address || index >= user.address.length)
          return res.status(400).json({ success: false, message: "Invalid address index" });
    
        // Update the specific address
        user.address[index] = updatedAddress;
    
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
    const { index } = req.body;

    // Validate index
    if (index === undefined || isNaN(index)) {
      return res.status(400).json({ success: false, message: "Invalid address index" });
    }

    const user = await User.findById(userId);
    if (!user || !user.address || index >= user.address.length) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    // Remove address from array
    user.address.splice(index, 1);
    await user.save();

    res.status(200).json({ success: true, addresses: user.address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
module.exports = {registerCustomer,loginCustomer,getCart,addCart,addCartIfNotadded,deleteCartItem,updateQuantity,getProfile,updateProfile,getAddress,addAddress,editAddress,deleteAddress}


