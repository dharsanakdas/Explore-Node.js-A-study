const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  age: Number,
  mark: Number,
});

module.exports = mongoose.model("students", schema);
