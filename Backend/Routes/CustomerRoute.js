// routes/auth.js
const express = require('express');
const {getAuthentication} = require("../MiddleWare/getAuth");
const {  loginCustomer,getClosingTime, getCart, addCart, addCartIfNotadded, deleteCartItem, updateQuantity, getProfile, updateProfile, getAddress, addAddress, editAddress, deleteAddress, verifyCustomer, otpSending, registerCustomer, listShopByPincode, getFishWithHighRating, getShopByShopId } = require('../Contollers/CustomerController');

const router = express.Router();


//OTP Sending
router.post("/sentOtp",otpSending)

//OTP Verify
router.post('/verify',verifyCustomer)

//Register
router.post("/register",registerCustomer)

// LOGIN
router.post('/login', loginCustomer)

//Get Cart Details
router.get("/cart", getAuthentication, getCart)

//Add Cart
router.post("/cart", getAuthentication,addCart)

//Add Cart If the product is not Added (On Card Side)
router.post("/quantityCart", getAuthentication,addCartIfNotadded)

//Delete Cart Item
router.delete("/cart/:productId", getAuthentication, deleteCartItem)

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

//Get Shops By Pincode
router.get("/listShopByPincode/:zipCode",listShopByPincode)

//Get Fishes With High Rating
router.get("/getFishesWithRating/:zipCode" , getFishWithHighRating)

//Get ShopDetails By ShopId 
router.get("/getShopByShopId/:ownerId",getShopByShopId)

router.get("/shop-status/:shopId",getClosingTime)
module.exports = router;
