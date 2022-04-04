require('dotenv').config();
const express = require("express");
const app = express();
const authenticationRoute = require('./routes/authentication');
const authorizationRoute = require('./routes/authorization');
const logOutRoute = require('./routes/logOut');
const accountRoute = require('./routes/account');
const incomeRoute = require('./routes/income');
const expenseRoute = require('./routes/expense');
const sumOfAccountRoute = require('./routes/sumOfAccount');
const categoriesRoute = require('./routes/categories');
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const cors = require("cors");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtCallback } = require("./passport");
const { adminGuard } = require('./guard');
const db = require("./database");
const Users = require('./models/Users');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(passport.initialize());
app.set("view engine", "ejs")
mongoose.connect('mongodb://localhost:27017/test', () => {
  console.log("Connected to mongodb");
});
const PORT = process.env.PORT;


const auth = passport.authenticate('jwt', { session: false });

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}
passport.use(new JwtStrategy(opt, jwtCallback));

app.get('/render', (req, res) => {
  res.render('index', { title: "Hello world" });
})
// user
// authentication
app.use('/authenticate', authenticationRoute);
// authorization
app.use('/authorization', authorizationRoute);
// account
app.use('/accounts', accountRoute);
// logOut
app.use('/logout', logOutRoute);
// income
app.use('/incomes', incomeRoute);
// expense
app.use('/expenses', expenseRoute);
// sumOfAccounts
app.use('/sumOfAccounts', sumOfAccountRoute);
// categories
app.use('/categories', categoriesRoute);

// login
app.use('/login', loginRouter);
// register
app.use('/register', registerRouter);
// get users'infos by admin
app.get('/users', auth, adminGuard, (req, res) => {
  res.json(db.users.filter(user => user.role.toLowerCase() === "user"))
});
// 
app.get('/posts', auth, (req, res) => {
  res.json(db.users.filter(user => user.role.toLowerCase() === "user"));
})


async function userCreate() {
  const user = await new Users({ email: "oxunjon1029@gmail.com", password: bcrypt.hashSync("222", 10), firstName: "Arabboy", lastName: "Ismoilov" });
  await user.save();
  console.log(user);

}
userCreate()
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
})