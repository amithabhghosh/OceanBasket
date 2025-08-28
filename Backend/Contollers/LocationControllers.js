const Customer = require("../Models/Customer");
const Owner = require("../Models/Owner");

const updateLocationOfCustomer = async (req,res)=>{
    try {
        const { lat, lng } = req.body;
  const userId = req.user.id; // assuming JWT middleware


   const user = await Customer.findByIdAndUpdate(userId, {
      location: {
        type: "Point",
        coordinates: [lng, lat] 
      }
    });
if(!user){
    return res.status(200).json({success:false,message:"User Not Found"})
}
    res.status(200).json({ success: true, message: "Location updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
   
}

const updateOwnerLocation = async (req,res)=>{
  try {
    const {lat,lng} = req.body
    const ownerId = req.user.id
    const owner = await Owner.findByIdAndUpdate(ownerId,{location: {
        type: "Point",
        coordinates: [lng, lat] 
      }})

      if(!owner){
        return res.status(200).json({success:false,message:"User Not Found"})
      }
      res.status(200).json({success:true,message:"Location Updated"})
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
}
module.exports = {updateLocationOfCustomer,updateOwnerLocation}