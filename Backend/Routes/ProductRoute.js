const express = require("express")
const router= express.Router()

const {getAuthentication} = require("../MiddleWare/getAuth");
const { addFish, getFish, deleteFish, editFish,getFishByShop } = require("../Contollers/ProductController");
require("dotenv").config() 

//Add Fish By the Owner
router.post("/addFish",getAuthentication,addFish)

//Get Fish Posted By Particular Owner
router.get("/getFish",getAuthentication,getFish)

//Delete A Paticular Fish
router.delete("/deleteFish/:fishId",getAuthentication,deleteFish)

//Edit the Fish
router.put("/editFish/:fishId",getAuthentication,editFish)

//Get Fishes By Shop
router.get("/getFishByShop/:ownerId",getFishByShop)

//Get Fish By Pincode to show The 10 Fishes In the Customer Dashboard
router.get("/getFishByPincode/:zipCode",getFishByPincode)
module.exports = router