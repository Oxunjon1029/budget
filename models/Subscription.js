const mongoose = require("mongoose");


const SubscriptionSchema = new mongoose.Schema({
  account_id: {
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
  Category: {
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Category',
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

module.exports = mongoose.model('Subscrition',SubscriptionSchema);