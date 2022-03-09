const express = require("express");
const router = express.Router();

router.post('/add', (req, res) => {
  res.send("Income created succesfully");
})


router.get('/',(req, res) => {
  res.send("Getting income");
})


router.put('/edit/:id',(req,res)=>{
  res.send("Updated succesfully")
})

router.post('/delete/:id',(req,res)=>{
  res.send("Deleted succesfully");
})

module.exports = router;