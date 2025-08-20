const Admin = require("../Models/Admin")
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Customer = require("../Models/Customer");
const Owner = require("../Models/Owner");
const Fish = require("../Models/Fish");
const registerAdmin = async (req,res)=>{
try {
    const {phoneNumber,password} = req.body
    const existingAdmin = await Admin.find({phoneNumber})
    if(existingAdmin.length > 0){
        return res.status(200).json({success:false,message:"Admin Already Exist"})
    }
     const hashedPassword = await argon2.hash(password);
    const newAdmin = new Admin({
        phoneNumber,
password:hashedPassword
    })

    await newAdmin.save()

    res.status(201).json({success:true,message:"Registration SuccessFull"})
} catch (error) {
    res.status(500).json({success:false,message:error.message})
}
}

const loginAdmin = async (req,res)=>{
try {
    const {phoneNumber,password} = req.body
    const admin = await Admin.findOne({phoneNumber})
    if(!admin){
        return res.status(200).json({success:false,message:"Admin Doesn't Exist"})
    }
     const isMatch = await argon2.verify(admin.password, password);
                    if (!isMatch){
                      return res.status(200).json({success:false, msg: 'Invalid credentials' });
                    }
                    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        const refreshToken = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, { expiresIn: '5d' });
                    res.status(201).json({success:true,message:"Admin Login SuccessFull",token,refreshToken})
} catch (error) {
    res.status(500).json({success:false,message:error.message})
}
}

const getAllCustomers = async (req,res)=>{
    try {
        const customers = await Customer.find().select("-password")
        if(customers.length == 0){
            res.status(201).json({success:false,message:"No Customers"})
        }
        res.status(200).json({success:true,customers})
    } catch (error) {
           res.status(500).json({success:false,message:error.message}) 
    }
}

const getAllOwners = async (req,res)=>{
    try {
        const owners = await Owner.find().select("-password")
        if(owners.length == 0){
            return res.status(201).json({success:false,message:"No Owners Found"})
        }
        res.status(200).json({success:true,owners})
    } catch (error) {
           res.status(500).json({success:false,message:error.message}) 
    }
}

const getAllFishes = async (req,res)=>{
    try {
        const fishes = await Fish.find().populate("owner", "ownerName shopName");
        if(fishes.length==0){
            return res.status(201).json({success:false,message:"No Fishes Found"})
        }
        res.status(200).json({success:true,fishes})
    } catch (error) {
         res.status(500).json({success:false,message:error.message}) 
    }
}
module.exports = {registerAdmin,loginAdmin,getAllCustomers,getAllOwners,getAllFishes}