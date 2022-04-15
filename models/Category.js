const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  Type: [
    {
      expenseId: false
    },
    {
      incomeId: true
    }
  ]
});

module.exports = mongoose.model('Category', Category);