const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({

  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  phone: { type: String, required: true },
  shopName: { type: String, required: true },
  shopAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
    location: {
      type: {
        type: String, 
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], 
        default: [0, 0]
      }
    }
  },




  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],


  isActive: { type: Boolean, default: true },
  shopOpenTime: String,
  shopCloseTime: String,
  deliveryRadiusInKm: Number,

  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Owner", ownerSchema);
