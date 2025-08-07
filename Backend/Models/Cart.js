const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fish',
    required: true
  },
  name: String, 
  image: String,
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [.5, 'Quantity can not be less than .5.'],
    default: .5
  },
  type:{type:String},
  shopId:{
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  fishPrice:{
    type:Number,
    required:true
  }
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true 
    },
    items: [cartItemSchema],
    totalQuantity: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      default: 0.0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Cart', cartSchema);

