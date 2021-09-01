const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  users: [{
    type: String,
    required: true
  }],
  marketID: {
    type: String,
    required: true
  },
  marketName: {
    type: String,
    required: true
  },
  cmdtyID: {
    type: String,
    required: true
  },
  cmdtyName: {
    type: String,
    required: true
  },
  priceUnit: {
    type: String,
    default: "Kg"
  },
  price: {
    type: Number,
    required: true
  },
  priceSum: {
    type: Number,
    default: 0
  }

});

const Report = mongoose.model("Report", reportSchema);
module.exports = { Report };
