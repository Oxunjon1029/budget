const express = require("express");
const router = express.Router();
const Account = require("../models/Accounts");
router.post('/add', (req, res) => {
  try {
    const account = new Account({ title: req.body.title, description: req.body.description });
    account.save();

    res.status(200).json(account);
  } catch (err) {
    res.status(400).json(err.message);
  }
})


router.get('/', async (req, res) => {
  const account = await Account.find({});
  res.json(account)
})


router.put('/edit', async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.body._id, req.body, { new: true })
    res.status(200).json(account)
  } catch (err) {
    res.status(400).json(err.message);
  }
})

router.post('/delete', async (req, res) => {
  try {
    await Account.deleteOne({ _id: req.body._id })
    res.status(200).send("Deleted succesfully")
  } catch (err) {
    res.status(400).json(err.message);
  }
})

module.exports = router;