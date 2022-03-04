const { response } = require("express");
const express = require("express");
const router = express.Router();
const Account = require('../Constructors/Accounts');
router.post('/add', (req, res) => {
  Account.saveAccount();
  res.send("Account added succesfully");
})


router.get('/', (req, res) => {
  const acc = Account.getAllAccounts();
  res.send(acc);
})


router.put('/edit/:id', (req, res) => {
  res.send("Updated succesfully")
})

router.delete('/delete/:id', (req, res) => {
  res.send("Deleted succesfully");
})

module.exports = router;