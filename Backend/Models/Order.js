const mongoose = require('mongoose');

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
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'delivered', 'cancelled'],
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
