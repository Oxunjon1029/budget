const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: () => {

    }
  },
  password: {
    type: String,
    required: true
  },
  role: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: Date,
  countrOfResidence: String,
})

module.exports = mongoose.model("User", userSchema);