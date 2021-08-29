const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  users: [{
    type: String,
    require: true
  }],
  marketID: {
    type: String,
    require: true
  },
  marketName: {
    type: String,
    require: true
  },
  cmdtyID: {
    type: String,
    require: true
  },
  cmdtyName: {
    type: String,
    require: true
  },
  priceUnit: {
    type: String,
    default: "Kg"
  },
  price: {
    type: Number,
    require: true
  },
  priceSum: {
    type: Number,
    default: 0
  }

});

const Report = mongoose.model("Report", reportSchema);
module.exports = { Report };
