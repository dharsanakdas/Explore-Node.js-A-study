const mongoose = require("mongoose");

const schema = mongoose.Schema({
  type: String,
  price: Number,
  state: String,
  quantity: Number,
}, { collection: 'cakeSales' });

module.exports = mongoose.model("cakeSales", schema);
