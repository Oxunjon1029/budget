const express = require("express");
const router = express.Router();
const db = require("../database");
const jwt = require('jsonwebtoken');
router.post("/", async (req, res) => {

  const user = await db.loginUser(req.body.email, req.body.password);
  if (user) {
    const payload = {
      id: user._id,
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
      Authorization: `${token}`,
      expiresIn: 6 * 10 * 60 * 100
    })
  } else {
    res.status(401).json({ message: "Invalid credentials" })
  }
})

module.exports = router;