const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    phoneNumber:{type:String,required:true},
    password:{type:String,required:true},
percentage:{type:Number}
})
module.exports = mongoose.model('Admin', adminSchema );