const express = require("express")

const Owner = require("../Models/Owner")
const Fish = require("../Models/Fish")
const FIshImage = require("../Models/FIshImage")


require("dotenv").config() 

const addFish = async (req,res)=>{
     try {
            const owner = req.user.id

const shop = await Owner.findById(owner)
if(!shop){
  return res.status(400).json({success:false,message:"Owner Not Found"})
}
if(!shop.verified){
  return res.status(400).json({success:false,message:"Account Disabled"})
}

    const {name,description,category,pricePerKg,availableQuantityKg,type} = req.body
    
console.log(availableQuantityKg,pricePerKg)

const fishImage = await FIshImage.findOne({FishName:name})

console.log(fishImage)

const uniqueFish = await Fish.findOne({name,owner})

if(uniqueFish){
  return res.status(200).json({success:false,message:"Fish is Already Added"})
}
   const fish = new Fish({
    owner,
    name,
    description,
    category,
    pricePerKg,
    availableQuantityKg,
    image:fishImage.image,
    type
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
      if(fishes.length == 0){
        return res.status(200).json({success:false,message:"No Fishes Added Yet"})
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

const shop = await Owner.findById(owner)
if(!shop){
  return res.status(200).json({success:false,message:"Owner Not Found"})
}
if(!shop.verified){
  return res.status(200).json({success:false,message:"Account Disabled"})
}



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




const getFishByShop = async (req,res)=>{
   try {
    const {ownerId} = req.params
    const fishes = await Fish.find({owner:ownerId})

    if(fishes.length == 0){
        return res.status(400).json({success:false,messsage:"No Fishes In the Shop"})
    }
    return res.status(201).json({success:true,fishes})
   } catch (error) {
    res.status(500).json({success:false,message:error.message})
   }
}
                                                                                                                     
const getFishByPincode = async (req,res)=>{
    try {
        const { lat, lng } = req.query; 
           
       
             if (!lat || !lng) {
                 return res.status(400).json({ success: false, message: "Location Required" });
               }
           
                const shops = await Owner.aggregate([
                 {
                   $geoNear: {
                     near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                     distanceField: "distance", // distance in meters
                     spherical: true,
                   },
                 },
                 {
                   $match: {
                     $expr: { $lte: ["$distance", { $multiply: ["$deliveryRadiusInKm", 1000] }] },
                   },
                 },
                 
                 { $project: { password: 0 } } 
               ]);
       
           if(shops.length == 0){
       return res.status(200).json({success:false,message:"No shops In This Pincode"})
           }
       
       const shopsId = shops.map(shop=>shop._id)
       
       const fishes = await Fish.find({owner:{$in:shopsId}}).sort({rating:-1}).limit(10);
       
        if (fishes.length === 0) {
             return res.status(200).json({ success: false, message: "No fishes found in these shops" });
           }
           res.status(200).json({success:true,fishes})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const getFishByFishId = async (req,res)=>{
    try {
        const {fishId} = req.params
        const fishDetails = await Fish.findById(fishId)
        if(!fishDetails){
            return res.status(200).json({success:false,message:"Fish Not Found"})
        }
        const ownerDetails = await Owner.findById(fishDetails.owner)
        res.status(201).json({success:true,fishDetails,ownerDetails})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const getShopsByFishId = async (req, res) => {
  try {
    const { fishId } = req.params;
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: "Location Required" });
    }

    // 1. Find the fish by ID
    const fish = await Fish.findById(fishId);
    if (!fish) {
      return res.status(200).json({ success: false, message: "Fish Not Found" });
    }

    const fishName = fish.name;

    // 2. Find all fishes with same name
    const fishes = await Fish.find({ name: fishName });
    if (fishes.length === 0) {
      return res.status(200).json({ success: false, message: "No fish Found" });
    }

    // 3. Exclude the current fishId
    const fishExcept = fishes.filter(item => item._id.toString() !== fishId);
    if (fishExcept.length === 0) {
      return res.status(200).json({ success: false, message: "This Fish is not in any Other Shop" });
    }

    // 4. Collect unique ownerIds of other shops selling the same fish
    const ownerIds = [...new Set(fishExcept.map(item => item.owner.toString()))];
    if (ownerIds.length === 0) {
      return res.status(200).json({ success: false, message: "This Fish is not in any Other Shop" });
    }

    // 5. Find nearby shops from those ownerIds using geo query
    const matchingShops = await Owner.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          distanceField: "distance",
          spherical: true,
        },
      },
      {
        $match: {
          _id: { $in: ownerIds.map(id => new mongoose.Types.ObjectId(id)) },
          $expr: { $lte: ["$distance", { $multiply: ["$deliveryRadiusInKm", 1000] }] },
        },
      },
      { $project: { password: 0 } }
    ]);

    if (matchingShops.length === 0) {
      return res.status(200).json({ success: false, message: "This fish not available in shops near your location" });
    }

    // 6. Get fishes in those shops (same name)
    const matchingShopIds = matchingShops.map(shop => shop._id.toString());
    const fishesWithOwner = await Fish.find({
      owner: { $in: matchingShopIds },
      name: fishName
    });

    return res.status(200).json({
      success: true,
      matchingShops,
      fishesWithOwner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getFishByName = async (req,res)=>{
  try {
             const { lat, lng } = req.query;
           const {fishName} = req.params
       
             const shops = await Owner.aggregate([
                 {
                   $geoNear: {
                     near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                     distanceField: "distance", // distance in meters
                     spherical: true,
                   },
                 },
                 {
                   $match: {
                     $expr: { $lte: ["$distance", { $multiply: ["$deliveryRadiusInKm", 1000] }] },
                   },
                 },
                 { $skip: skip },
                 { $limit: limit },
                 { $project: { password: 0 } } 
               ]);
       
           if(shops.length == 0){
       return res.status(200).json({success:false,message:"No shops In This Pincode"})
           }
       
       const shopsId = shops.map(shop=>shop._id)
       
       const fishes = await Fish.find({
  owner: { $in: shopsId },
  name: { $regex: `/${fishName}$`, $options: 'i' } 
}).sort({ rating: -1 });

       
        if (fishes.length === 0) {
             return res.status(200).json({ success: false, message: "No fishes found" });
           }


           res.status(200).json({success:true,fishes})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}
module.exports = {getFishByName,getShopsByFishId,addFish,getFish,deleteFish,editFish,getFishByShop,getFishByPincode,getFishByFishId}