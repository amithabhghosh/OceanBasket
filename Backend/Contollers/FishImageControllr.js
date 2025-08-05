const express = require("express")
const FishImage = require("../Models/FIshImage")
const Fish = require("../Models/Fish")
const addImage = async (req,res)=>{
    try {
        const {FishName,image,type} = req.body
        const existing = await FishImage.findOne({FishName})
        if(existing){
            return res.status(200).json({success:false,message:"Fish Already In Db"})
        }
        const newFishImage = new FishImage({
            FishName,
            image,
            type
        })
await newFishImage.save()
    res.status(200).json({success:true,newFishImage})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const getFishList = async (req,res)=>{
    try {
       const owner = req.user.id
const fishes = await Fish.find({owner:owner})

        const fishesList = await FishImage.find()
        if(fishesList.length == 0){
            return res.status(200).json({success:false,message:"No Fish Image Added"})
        }

        const addedFishNames = fishes.map(fish => fish.name);

        const filteredFishes = fishesList.filter(fish =>
      !addedFishNames.includes(fish.FishName)
    );



        res.status(200).json({success:true,fishesList:filteredFishes})
    } catch (error) {
         res.status(500).json({success:false,message:error.message})
    }
}

module.exports = {addImage,getFishList}