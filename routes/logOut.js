const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  res.send("Logged out succesfully");
})


module.exports = router;