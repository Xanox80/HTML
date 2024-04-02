const mongoose = require("mongoose");

const appeal = new mongoose.Schema({
  name: String,
  surname: String,
  price: Number,
  residence: String,
  city: String,
  photoBase64: String,
});

const Appeal = mongoose.model("Villa", appeal);

module.exports = Appeal;
