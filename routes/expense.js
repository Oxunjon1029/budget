const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  res.send("expense created succesfully");
})


router.route('/:id').get((req, res) => {
  res.send("Getting one user's expense or admin's expense");
}).put((req, res) => {
  res.send("Updating user's expense or admin's expense")
}).delete((req, res) => {
  res.send("Deleting user's expense or admin's expense");
})

module.exports = router;