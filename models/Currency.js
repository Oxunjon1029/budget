const mongoose = require("mongoose");

const Currency = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  symbol:String
});

module.exports = mongoose.model('Currency',Currency);