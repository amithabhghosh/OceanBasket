const express = require("express")
const FishImage = require("../Models/FIshImage")
const addImage = async (req,res)=>{
    try {
        const {FishName,image} = req.body
        const existing = await FishImage.findOne({FishName})
        if(existing){
            return res.status(200).json({success:false,message:"Fish Already In Db"})
        }
        const newFishImage = new FishImage({
            FishName,
            image
        })
await newFishImage.save()
    res.status(200).json({success:true,newFishImage})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports = {addImage}