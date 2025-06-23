const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type:Number, required: true },
  quantity: { type: Number, default: 0.5 },
  price : {type:Number},
  name: { type: String }
});

module.exports = mongoose.model("Cart", cartSchema);
