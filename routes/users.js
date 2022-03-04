const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  res.send("New user added");
})



router.get('/', (req, res) => {
  res.send("Getting  a user");
})


router.put('/edit', (req, res) => {
  res.send("Updated succesfully")
})

router.delete('/delete', (req, res) => {
  res.send("Deleted succesfully");
})

module.exports = router;