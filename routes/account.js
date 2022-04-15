const express = require("express");
const passport = require("passport");
const Accounts = require("../models/Accounts");
const Currency = require("../models/Currency");
const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });
router.post('/add', auth, async (req, res) => {
  const { title, currency, description } = req.body;
  const symbol = await Currency.find({})
  const account = await new Accounts({ title: title, currency: currency, description: description, user_id: req.user._id, symbol: symbol.symbol });
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

router.get('/:id', auth, async (req, res) => {
  const account = await Accounts.find({ _id: req.params.id });
  res.status(200).send(account);
})
router.post('/edit/:id', auth, async (req, res) => {
  const { title, description, currency } = req.body
  const account = await Accounts.findOneAndUpdate(req.params.id, { title: title, description: description, currency: currency }, { new: true });
  account.save()
  res.send(account)
  res.send("Updated succesfully");
})

router.delete('/deleteAccount/:id', auth, async (req, res) => {
  await Accounts.findOneAndDelete({ _id: req.params.id }, function (err, res) {
    response.setHeader("Content-Type", "text/html");
    console.log("Deleting Product " + req.params.id);
    res.render('deleted')
    res.status(200).json({ message: "Deleted successfully" })
  });
})

module.exports = router;