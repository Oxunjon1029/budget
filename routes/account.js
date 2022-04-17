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
  return res.status(200).json(account);
})


router.get('/', auth, async (req, res) => {
  const allaccounts = await Accounts.find({ user_id: req.user._id });
  allaccounts.forEach((account) => {
    allaccounts[account._id] = account;
  })
  return res.send(allaccounts)
})

router.get('/:id', auth, async (req, res) => {
  const account = await Accounts.find({ _id: req.params.id });
  if (account) {
    return res.status(200).send(account);
  }
  return res.status(401).json({ message: "Unathorized" })
})
router.post('/edit/:id', auth, async (req, res) => {

  const account = await Accounts.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description, currency: req.body.currency }, { new: true });
  if (account) {
    return res.status(200).json(account)
  }
  return res.status(401).json({ message: "Unathorized" })
})

router.delete('/deleteAccount/:id', auth, async (req, res) => {
  try {
    const account = await Accounts.findById(req.params.id);
    await account.remove();
    return res.status(200).json({ message: "Account has been deleted successfully" })
  } catch {
    return res.status(401).json({ message: "Unathorized" })
  }
})

module.exports = router;