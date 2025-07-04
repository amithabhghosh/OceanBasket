const express = require("express")
const router= express.Router()

const {getAuthentication} = require("../MiddleWare/getAuth");
const { addFish, getFish, deleteFish, editFish, getAllFish, getFishByPincode } = require("../Contollers/ProductController");
require("dotenv").config() 

//Add Fish By the Owner
router.post("/addFish",getAuthentication,addFish)

//Get Fish Posted By Particular Owner
router.get("/getFish",getAuthentication,getFish)

//Delete A Paticular Fish
router.delete("/deleteFish/:fishId",getAuthentication,deleteFish)

//Edit the Fish
router.put("/editFish/:fishId",getAuthentication,editFish)

//Get All Fishes
router.get("/getAllFish",getAllFish)

//Get Fishes By Pincode
router.get("/getFishByPincode",getAuthentication,getFishByPincode)
module.exports = router