const mongoose = require("mongoose");


const ownerSchema = new mongoose.Schema({

  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  phone: { type: String, required: true ,unique:true},
  shopName: { type: String, required: true },
  zipCode: { type: String, required: true },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
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
  },

  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  isActive: { type: Boolean, default: true },
  shopOpenTime: String,
  shopCloseTime: String,
  deliveryRadiusInKm: Number,
  shopImage:{type:String},
  ownerImage:{type:String},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Owner", ownerSchema);
