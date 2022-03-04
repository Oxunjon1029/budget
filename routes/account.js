const { response } = require("express");
const express = require("express");
const router = express.Router();

router.post('/add', (req, res) => {
  res.send("Account created succesfully");
})


router.get('/',(req, res) => {
  res.send("Getting one user's account or admin's account");
})


router.put('/edit',(req,res)=>{
  res.send("Updated succesfully")
})

router.delete('/delete',(req,res)=>{
  res.send("Deleted succesfully");
})

module.exports = router;