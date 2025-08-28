const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  firstName: { type: String },
  secondName: { type: String },
  zipCode: { type: String },
  state: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  landmark: { type: String },
  city: { type: String }
}, { _id: false });

const orderedItemSchema = new mongoose.Schema({
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
    min: [.5, 'Quantity cannot be less than 0.5'],
    default: .5
  },
  type: String,
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  fishPrice: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderedItemSchema],
  totalQuantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'RAZORPAY'],
    required: true
  },
 deliveryLocation: {
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
  phone:{type:String},
  alternativeNumber:{type:String},
  googleMapLink:{type:String},
  deliveryAddress: addressSchema,   
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
 
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'delivered', 'cancelled',"out for delivery","preparing"],
    default: 'placed'
  },
  shopsNotified: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
