const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  res.send("Category created succesfully");
})


router.route('/:id').get((req, res) => {
  res.send("Getting a category ");
}).put((req, res) => {
  res.send("Updating a category")
}).delete((req, res) => {
  res.send("Deleting category");
})

module.exports = router;