const express = require("express")
const router= express.Router()

const {getAuthentication} = require("../MiddleWare/getAuth");
const { addFish, getFish, deleteFish, editFish,getFishByShop, getFishByPincode, getFishByFishId, getShopsByFishId,getFishByName } = require("../Contollers/ProductController");
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
router.get("/getFishByPincode",getFishByPincode)

//Get Fish By FishId
router.get("/getFishByFishId/:fishId",getFishByFishId)

//Get Shops By FishId
router.get("/getShopByFishId/:fishId",getShopsByFishId)


router.get("/getFishByName/:fishName",getFishByName)


module.exports = router