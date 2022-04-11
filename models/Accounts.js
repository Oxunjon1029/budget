const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  currency: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  dateOfCreation: {
    type: Date,
    default: () => Date.now()
  },
  dateofUpdate: {
    type: Date,
    default: () => Date.now()
  },


})

module.exports = mongoose.model('Accounts', AccountSchema);