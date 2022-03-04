const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  res.send("expense created succesfully");
})


router.get('/',(req, res) => {
  res.send("Getting expense");
})


router.put('/edit/:id',(req,res)=>{
  res.send("Updated succesfully")
})

router.delete('/delete/:id',(req,res)=>{
  res.send("Deleted succesfully");
})

module.exports = router;