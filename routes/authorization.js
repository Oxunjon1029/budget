const express = require("express");
const router = express.Router();

router.post('/',(req,res)=>{
  res.send("Authorized succesfully");
})

module.exports = router;