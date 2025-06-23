// routes/auth.js
const express = require('express');
const argon2 = require('argon2'); // ✅ use argon2
const jwt = require('jsonwebtoken');
const User = require('../Models/Customer');
const Cart = require("../Models/Cart")
const {CustomerAuthentication} = require("../MiddleWare/Middleware")
const {getAuthentication} = require("../MiddleWare/getAuth")
const router = express.Router();


// REGISTER
router.post('/register', async (req, res) => {
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
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cart", getAuthentication, async (req, res) => {
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
});

router.post("/cart", CustomerAuthentication, async (req, res) => {
  try {
    const { productId, price, quantity,name } = req.body;
    const userId = req.body.userId;

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
});


router.post("/quantityCart", CustomerAuthentication, async (req, res) => {
  try {
    const { productId, price ,name} = req.body;
    const userId = req.body.userId;

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
});


router.delete("/cart/:id", getAuthentication, async (req, res) => {
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
});

router.put("/cart", getAuthentication, async (req, res) => {
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
});



module.exports = router;
