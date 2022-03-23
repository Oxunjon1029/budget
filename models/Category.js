const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  Type:[
    {
      expenseId:mongoose.SchemaTypes.ObjectId,
      ref:'Expenses'
    },
    {
      incomeId:mongoose.SchemaTypes.ObjectId,
      ref:'Incomes'
    }
  ]
});

module.exports = mongoose.model('Category',Category);