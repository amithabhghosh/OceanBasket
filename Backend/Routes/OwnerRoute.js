const express = require("express")
const router= express.Router()
const Owner = require("../Models/Owner")

const {getAuthentication} = require("../MiddleWare/getAuth");
const { registerOwner, getOwnerData, loginOwner, editTime, updateQuantity } = require("../Contollers/OwnerController");
require("dotenv").config() 

//Register Owner/Shop
router.post("/register",registerOwner)

//Login Owner/Shop
router.post("/login",loginOwner)

//Get Owner/Shop Data
router.get("/getOwnerData",getAuthentication,getOwnerData)


router.get("/getTime",editTime)


router.put("/updateQuantity/:fishId",getAuthentication, updateQuantity)
module.exports = router