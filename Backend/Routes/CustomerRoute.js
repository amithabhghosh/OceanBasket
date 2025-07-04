// routes/auth.js
const express = require('express');
const {getAuthentication} = require("../MiddleWare/getAuth");
const { registerCustomer, loginCustomer, getCart, addCart, addCartIfNotadded, deleteCartItem, updateQuantity, getProfile, updateProfile, getAddress, addAddress, editAddress, deleteAddress } = require('../Contollers/CustomerController');
const router = express.Router();


// REGISTER
router.post('/register',registerCustomer)

// LOGIN
router.post('/login', loginCustomer)

//Get Cart Details
router.get("/cart", getAuthentication, getCart)

//Add Cart
router.post("/cart", getAuthentication,addCart)

//Add Cart If the product is not Added (On Card Side)
router.post("/quantityCart", getAuthentication,addCartIfNotadded)

//Delete Cart Item
router.delete("/cart/:id", getAuthentication, deleteCartItem)

//Update Quantity
router.put("/cart", getAuthentication, updateQuantity)

//Get Customer Profile
router.get("/getprofile",getAuthentication, getProfile)

//Update Profile
router.put("/updateProfile", getAuthentication, updateProfile);

//Get Address
router.get("/getaddress", getAuthentication, getAddress)

//Add Address
router.post("/addAddress", getAuthentication, addAddress)

//Edit Address
router.put("/editAddress", getAuthentication, editAddress)

//Delete Address
router.delete("/deleteAddress", getAuthentication,deleteAddress)


module.exports = router;
