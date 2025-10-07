const express = require("express")
const { isInEditWindow } = require('../utils/timeWindow');
const Owner = require("../Models/Owner")
const Fish = require("../Models/Fish")
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require("dotenv").config() 

const registerOwner = async (req,res)=>{
    const {ownerName,email,password,phone,shopName,zipCode, addressLine1, addressLine2, city, state, shopOpenTime,shopCloseTime,deliveryRadiusInKm} = req.body
        try {
            const existingOwner = await Owner.findOne({email:email}) 
            if(existingOwner){
                return res.status(400).json({success:false,message:"Email Already Registerd"})
            }     
             const hashedPassword = await argon2.hash(password);  
            const newUser = new Owner({
                ownerName,
                email,
                password:hashedPassword,
                phone,
                shopName,
                zipCode,
                addressLine1,
                 addressLine2,
                  city,
                   state,
                    shopOpenTime,
                    shopCloseTime,
                    deliveryRadiusInKm,
                    shopImage:"https://res.cloudinary.com/dysh5anaw/image/upload/v1756375177/ShopImage_o8rhli.png"
            })
    await newUser.save()
    
    res.status(201).json({success:true,message:"Owner Register SuccessFull"})
    
        } catch (error) {
            res.status(500).json({success:false,message:error.message})
        }
}
const loginOwner = async (req,res)=>{
        const {phone,password} = req.body
        try {
            const owner = await Owner.findOne({phone:phone})
            if(!owner){
               return res.status(400).json({success:false,msg:"Owner Doesn't Exist"})
            }
    
              const isMatch = await argon2.verify(owner.password, password);
                if (!isMatch){
                  return res.status(400).json({success:false, msg: 'Invalid credentials' });
                }
                const token = jwt.sign({ id: owner._id }, "Hello!123", { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: owner._id }, "Hello!123", { expiresIn: '5h' });
                res.status(201).json({success:true,message:"Owner Login SuccessFull",token,refreshToken})
        } catch (error) {
             res.status(500).json({success:false, error: error.message });
        }
}

const getOwnerData = async (req,res)=>{
       try {
        const ownerId = req.user.id
        const owner = await Owner.findById(ownerId).select("-password")
        if(!owner){
            return res.status(200).json({success:false,message:"Owner Not Found"})
        }
        res.status(201).json({success:true,owner})
    } catch (error) {
      console.log(error.message)
        res.status(500).json({success:false,message:error.message})
    }
}

const editTime = async (req,res)=>{
    try {
            const isBlocked = isInEditWindow();
            
    res.json({ isBlocked });
    } catch (err) {
        console.error(err);
    res.status(500).json({ message: "Server error" });
    }
}


const updateQuantity  = async (req, res) => {
  try {
    const { fishId } = req.params;
    const { quantity } = req.body;
const ownerId = req.user.id

const owner = await Owner.findById(ownerId)
if(!owner){
  return res.status(200).json({success:false,message:"Owner Not Found"})
}
if(!owner.verified){
  return res.status(200).json({success:false,message:"Account Disabled"})
}

    const fish = await Fish.findById(fishId);

    if (!fish) {
      return res.status(404).json({ message: "Fish not found" });
    }

   console.log(fishId,quantity)
    const newQuantity = fish.availableQuantityKg + Number(quantity);


    fish.availableQuantityKg = newQuantity;
    await fish.save();

    res.status(200).json({ 
      message: "Quantity updated successfully", 
      newQuantity 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {registerOwner,loginOwner,getOwnerData,editTime,updateQuantity}