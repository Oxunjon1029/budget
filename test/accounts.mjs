require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Account = require('../models/Accounts.js');
const app  = express();
app.use(express.json());
const mongoUrl = (`${process.env.MONGODB_URL}${process.env.DB_NAME}`);
mongoose.connect(mongoUrl);


app.post('/add', (req, res) => {
  try {
    const account = new Account({ title: req.body.title, description: req.body.description });
    account.save();

    res.status(200).json(account);
  } catch (err) {
    res.status(400).json(err.message);
  }
})


app.get('/', async (req, res) => {
  const account = await Account.find({});
  res.json(account).send({message:"Getting all the accounts successfully"});
})


app.put('/edit', async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.body._id, req.body, { new: true })
    res.status(200).json(account).send({message:"Successfully updated"});
  } catch (err) {
    res.status(400).json(err.message);
  }
})

app.post('/delete', async (req, res) => {
  try {
    await Account.deleteOne({ _id: req.body._id })
    res.status(200).send({message:"Deleted successfully"})
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = {
  app
}