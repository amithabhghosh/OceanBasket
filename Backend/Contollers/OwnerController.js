const express = require("express")

const Owner = require("../Models/Owner")
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require("dotenv").config() 

const registerOwner = async (req,res)=>{
    const {ownerName,email,password,phone,shopName} = req.body
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
                shopName
            })
    await newUser.save()
    
    res.status(201).json({success:true,message:"Owner Register SuccessFull"})
    
        } catch (error) {
            res.status(500).json({success:false,message:error.message})
        }
}


const loginOwner = async (req,res)=>{
        const {email,password} = req.body
        try {
            const owner = await Owner.findOne({email:email})
            if(!owner){
                res.status(400).json({success:false,message:"Owner Doesn't Exist"})
            }
    
              const isMatch = await argon2.verify(owner.password, password);
                if (!isMatch)
                  return res.status(400).json({success:false, msg: 'Invalid credentials' });
            
                const token = jwt.sign({ id: owner._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: owner._id }, process.env.SECRET_KEY, { expiresIn: '5h' });
                res.status(201).json({success:true,message:"Owner Login SuccessFull",token,refreshToken})
        } catch (error) {
            res.status(500).json({success:false,messsage:error.message})
        }
}

const getOwnerData = async (req,res)=>{
       try {
        const ownerId = req.user.id
        const owner = await Owner.findById(ownerId).select("-password")
        if(!owner){
            return res.status(400).json({success:false,message:"Owner Not Found"})
        }
        res.status(201).json({success:true,owner})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}
module.exports = {registerOwner,loginOwner,getOwnerData}