const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  Type:[
    {
      category_id:mongoose.SchemaTypes.ObjectId,
      ref:'Expenses'
    },
    {
      category_id:mongoose.SchemaTypes.ObjectId,
      ref:'Incomes'
    }
  ]
});

module.exports = mongoose.model('Category',Category);