const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  user_id:{
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  currency_id:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Currency'
  },
  title:{
    type:String,
    required:true
  },
  description:String,
  dateOfCreation:{
    type:Date,
    default:()=>Date.now()
  },
  dateofUpdate:{
    type:Date,
    default:()=>Date.now()
  },


})

module.exports = mongoose.model('Accounts',AccountSchema);