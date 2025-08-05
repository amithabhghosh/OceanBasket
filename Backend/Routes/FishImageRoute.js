const express = require("express")
const { addImage, getFishList } = require("../Contollers/FishImageControllr")
const { getAuthentication } = require("../MiddleWare/getAuth")
const router= express.Router()

router.post("/addFishImage",addImage)

router.get("/getFishList",getAuthentication,getFishList)

module.exports = router