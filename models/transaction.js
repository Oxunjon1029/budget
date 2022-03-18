const mongoose = require("mongoose");

const Transaction = new mongoose.Schema({
  Type: {

  },
  account_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Accounts'
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  dateOfOperattion: {
    type: Date,
    default: () => Date.now()
  },
  Category: {},
  amount: Number,
  linkToFile: String,
  dateOfCreation: {
    type: Date,
    default: () => Date.now()
  },
  dateofUpdate: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongoose.model('Transaction',Transaction);