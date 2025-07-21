const mongoose = require('mongoose');

const fishImageSchema = new mongoose.Schema({
    image:{type:String,required:true},
    FishName:{type:String,required:true}
})
module.exports = mongoose.model('FishImage', fishImageSchema );