const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id:{type: String, required: true},
  retailer: { type: String, required: true },
  name: { type: String, required: true },
  modelNumber: { type: String, required: true },
  url: { type: String, required: true },
  cartUrl: { type: String, required: false },
  mobileUrl: { type: String, required: false },
  thumbnail: { type: String, required: false },
  price: { type: String, required: true },
  availability: { type: String, required: true },
}, {timestamps: true} );

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;