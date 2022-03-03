const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  res.send("Account created succesfully");
})


router.route('/:id').get((req, res) => {
  res.send("Getting one user's account or admin's account");
}).put((req, res) => {
  res.send("Updating user's account or admin's account")
}).delete((req, res) => {
  res.send("Deleting user's account or admin's account");
})

module.exports = router;