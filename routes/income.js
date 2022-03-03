const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  res.send("Income created succesfully");
})


router.route('/:id').get((req, res) => {
  res.send(`Getting users by their id:  ${req.params.id}`);
}).put((req, res) => {
  res.send("Updating user's income or admin's income")
}).delete((req, res) => {
  res.send("Deleting user's income or admin's income");
})

module.exports = router;