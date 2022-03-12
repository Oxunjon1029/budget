const express = require("express");
const router = express.Router();
const db = require("../database");
const jwt = require('jsonwebtoken');
router.post("/", (req, res) => {
  const user = db.loginUser(req.body.email, req.body.password);

  if (user) {
    const payload = {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      Authorization: `${token}`
    })
  } else {
    res.status(401).json({ message: "Invalid credentials" })
  }
})

module.exports = router;