const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  age: Number,
  place: String,
  salary: Number,
  married: Boolean,
});

module.exports = mongoose.model("teachers", schema);
