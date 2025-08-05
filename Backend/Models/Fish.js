const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      
    },
    category: {
      type: String,
      enum: ['Bony Fish', 'Cartilaginous Fish', 'Freshwater Fish', 'Saltwater Fish', 'Oily Fish'],
    
    },
 
    pricePerKg: {
      type: Number,
      required: true
    },
    availableQuantityKg: {
      type: Number,
      required: true,
      min: 0
    },
    image:{type:String} ,
   type: { type: String, enum: ["Small", "Medium", "Large"] },
    isAvailable: {
      type: Boolean,
      default: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: true
    },
    ratings: {
     type:Number,
     default:0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fish', fishSchema);
