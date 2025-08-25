const Admin = require("../Models/Admin")
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Customer = require("../Models/Customer");
const Owner = require("../Models/Owner");
const Fish = require("../Models/Fish");
const Order = require("../Models/Order");
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

const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find()
        if(orders.length == 0){
            return res.status(201).json({success:false,message:"No Orders"})
        } 
        res.status(200).json({success:true,orders})
    } catch (error) {
        res.status(500).json({success:false,message:error.message}) 
    }
}

const updateOrderDelivered = async (req,res)=>{
    try {
      const {status} = req.body
         const {orderId} = req.params
          const order = await Order.findByIdAndUpdate(orderId,{orderStatus:status},{new:true})
             if(!order){
               return res.status(200).json({success:false,message:"Order Not Found"})
             }
             res.status(201).json({success:true,order})

    } catch (error) {
        res.status(500).json({success:false,message:error.message}) 
    }
}

const updateCustomerVerify = async (req,res)=>{
    try {
        const {verified} = req.body
       const {userId} = req.params
       const user = await Customer.findByIdAndUpdate(userId,{verified:!verified},{new:true}) 
       if(!user){
        return res.status(200).json({success:false,message:"User Not Found"})
       }
       res.status(200).json({success:true,user})
    } catch (error) {
        res.status(500).json({success:false,message:error.message}) 
    }
}

const updateOwnerverify = async (req,res)=>{
    try {
        const {verified} = req.body
        const {ownerId}  = req.params
        const owner = await Owner.findByIdAndUpdate(ownerId,{verified:!verified},{new:true})
        if(!owner){
            return res.status(200).json({success:false,message:"No Owner Found"})
        }
        res.status(200).json({success:true,owner})
    } catch (error) {
              res.status(500).json({success:false,message:error.message}) 
    }
}
module.exports = {registerAdmin,loginAdmin,getAllCustomers,getAllOwners,getAllFishes,getAllOrders,updateOrderDelivered,updateCustomerVerify,updateOwnerverify}