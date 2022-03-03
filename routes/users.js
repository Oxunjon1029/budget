const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  res.send("New user added");
})



router.route('/:id').get((req, res) => {
  res.send("Getting one user");
}).put((req, res) => {
  res.send("Updating user")
}).delete((req, res) => {
  res.send("Deleting user");
})

module.exports = router;