const express = require("express");
const passport = require("passport");
const Accounts = require("../models/Accounts");
const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });
router.post('/add', auth, async (req, res) => {
  const { title, currency, description } = req.body;
  const account = await new Accounts({ title: title, currency: currency, description: description, user_id: req.user._id });
  await account.save();
  res.status(200).json(account);
  res.send("Account added succesfully");
})


router.get('/', auth, async (req, res) => {
  const allaccounts = await Accounts.find({ user_id: req.user._id });
  allaccounts.forEach((account) => {
    allaccounts[account._id] = account;
  })
  res.send(allaccounts)
  res.send("Getting all accounts");
})


router.post('/edit/:id', async (req, res) => {
  const account = await Accounts.findOneAndUpdate(req.body._id, { new: true });
  account.save()
  res.send(account)
  res.send("Updated succesfully");
})

router.post('/delete/:id', (req, res) => {
  res.send("Deleted succesfully");
})

module.exports = router;