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
        const owner = req.user.id
        const { fishId } = req.params;
await Fish.deleteOne({_id:fishId,owner})
res.status(201).json({success:true,message:"Fish Deleted SuccessFull"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const editFish = async (req,res)=>{
        try {
        const {availableQuantityKg} = req.body
        const owner = req.user.id
        const {fishId} = req.params
       
       
        const updatedFish = await Fish.findByIdAndUpdate({_id:fishId},{
            availableQuantityKg},{new:true})
            if(!updatedFish){
              return  res.status(400).json({success:false,message:"Fish Not Found"})
            }
            return res.status(201).json({success:true,message:"Fish Quantity Updated"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}




const getFishByPincode = async (req,res)=>{
   
}

module.exports = {addFish,getFish,deleteFish,editFish,getFishByPincode}