const express = require("express")
const { addImage } = require("../Contollers/FishImageControllr")
const router= express.Router()

router.post("/addFishImage",addImage)


module.exports = router