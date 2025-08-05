const mongoose = require('mongoose');

const fishImageSchema = new mongoose.Schema({
    image:{type:String,required:true},
    FishName:{type:String,required:true},
  type: { type: String, enum: ["Small", "Medium", "Large"] }
})
module.exports = mongoose.model('FishImage', fishImageSchema );