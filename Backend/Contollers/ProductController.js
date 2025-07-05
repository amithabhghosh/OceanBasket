const express = require("express")

const Owner = require("../Models/Owner")
const Fish = require("../Models/Fish")

require("dotenv").config() 

const addFish = async (req,res)=>{
     try {
            const owner = req.user.id
    const {name,description,category,pricePerKg,availableQuantityKg} = req.body
    
   const fish = new Fish({
    owner,
    name,
    description,
    category,
    pricePerKg,
    availableQuantityKg
   })

await fish.save()
return res.status(201).json({success:true,message:"Fish Added SuccessFully",fish})   
        } catch (error) {
            res.status(500).json({success:false,message:error.message})
        }
}

const getFish = async (req,res)=>{
    try {
        const owner = req.user.id
       const fishes = await Fish.find({owner:owner})
      if(fishes.length <= 0){
        return res.status(400).json({success:false,message:"No Fishes Added Yet"})
      }

      return res.status(201).json({succes:true,fishes})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const deleteFish = async (req,res)=>{
  try {
        const ownerId = req.user.id
        const { fishId } = req.params;
const updatedOwner = await Owner.findByIdAndUpdate(ownerId,
    {
        $pull:{inventory : {_id : fishId}}
    },
    {new:true}
)
if(!updatedOwner){
    return res.status(400).json({success:false,message:"Owner Not Found"})
}
res.status(201).json({success:true,message:"Fish Deleted SuccessFully",inventory:updatedOwner.inventory})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const editFish = async (req,res)=>{
        try {
        const {fishName,price,quantity} = req.body
        const ownerId = req.user.id
        const {fishId} = req.params
        const updatedOwner = await Owner.findOneAndUpdate(
            {_id:ownerId,"inventory._id":fishId},
            {
$set:{
    "inventory.$.fishName":fishName,
    "inventory.$.price":price,
    "inventory.$.quantity":quantity
}

            },
            {new:true}
        )
if(!updatedOwner){
    return res.status(400).json({success:false,message:"Item Not Found"})
}
res.status(201).json({success:true,message:"Updated SuccessFully",inventory:updatedOwner.inventory})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const getAllFish = async (req, res) => {
  try {
    const allOwners = await Owner.find().select('inventory');

    const allFishes = allOwners.flatMap(owner => owner.inventory);

    res.status(200).json({ success: true, fishes: allFishes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFishByPincode = async (req,res)=>{
   
}

module.exports = {addFish,getFish,deleteFish,editFish,getAllFish,getFishByPincode}