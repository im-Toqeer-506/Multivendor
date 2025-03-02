const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Product Name!"],
  },
  discription: {
    type: String,
    require: [true, "Please Enter Your Product discription!"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Your Product category!"],
  },
  tags: {
    type: String,
    required: [true, "Please Enter Your Product Tags!"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter Your Discount Price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Your Product Stock!"],
  },
  images: [
    {
      type: String,
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("product", ProductSchema);
