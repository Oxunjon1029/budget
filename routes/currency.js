const express = require("express");
const router = express.Router();
const Currency = require('../models/Currency');
router.post('/add', async (req, res) => {
  const { name, symbol } = req.body;
  const currency = await new Currency({ name: name, symbol: symbol });
  currency.save();
  return res.send(currency)
})


router.get('/', async (req, res) => {
  const allcurrencyObject = await Currency.find({});
  allcurrencyObject.forEach((currency) => {
    allcurrencyObject[currency._id] = currency;
  })
  return res.send(allcurrencyObject);
})


router.put('/edit/:id', (req, res) => {
  res.send("Updated succesfully")
})

router.post('/delete/:id', (req, res) => {
  res.send("Deleted succesfully");
})

module.exports = router;