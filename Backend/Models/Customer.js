
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  firstName: { type: String },
  secondName: { type: String },
  zipCode: { type: String },
  state: { type: String },
  addressLine1: { type: String},
  addressLine2: { type: String },
  landmark: { type: String },
  city: { type: String},
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  address: [addressSchema], 
  phone: { type: String,unique:true,required:true},
  alternativeNumber: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
