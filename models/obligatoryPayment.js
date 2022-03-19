const mongoose = require("mongoose");

const ObligatoryPaymentSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Accounts'
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  firstDayOfPayment: {
    type: Date,
    default: () => Date.now()
  },
  lastDayOfPayment: {
    type: Date,
    default: () => Date.now()
  },
  dayOfPayment: {
    type: Date,
    default: () => Date.now()
  },
  CategoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
  },
  amount: Number,
  dateOfCreation: {
    type: Date,
    default: () => Date.now()
  },
  dateofUpdate: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongoose.model("ObligatoryPayment",ObligatoryPaymentSchema);