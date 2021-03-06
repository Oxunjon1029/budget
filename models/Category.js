const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  Type: {
    type:String,
    required:true,
    enum:{
      values:['income','expense']
    }
  }
});

module.exports = mongoose.model('Category', Category);