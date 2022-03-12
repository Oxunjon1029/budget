const db = require("./database");
const adminGuard = (req, res, next) => {
  const user = db.getUserByEmail(req.body.email);
  if (user && user.role.toLowerCase() === "admin") {
    next()
  }
  res.status(403).json({ message: "Unathorized" })
  console.log(user);
}

module.exports = {
  adminGuard,
}