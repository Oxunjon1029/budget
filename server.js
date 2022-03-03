const express = require("express");
const app = express();
const userRoute = require('./routes/users');
const authenticationRoute = require('./routes/authentication');
const authorizationRoute = require('./routes/authorization');
const logOutRoute = require('./routes/logOut');
const accountRoute = require('./routes/account');
const incomeRoute = require('./routes/income');
const expenseRoute = require('./routes/expense');
const sumOfAccountRoute = require('./routes/sumOfAccount');
const categoriesRoute = require('./routes/categories');


app.use(express.json());

app.use(express.static('public'));
app.set("view engine", "ejs")

const users = [
  {
    name: 'Oxunjon',
    email: "abdusalomov2019oxunjon@gmail.com",
    pasword: 111,
  }
]
app.post('/', (req, res) => {
  users.push(req.body);
  res.send('User has been created succesfully')
})



app.get('/render', (req, res) => {
  res.render('index', { title: "Hello world" })
})
// user
app.use('/users', userRoute);
// authentication
app.use('/authenticate', authenticationRoute)
// authorization
app.use('/authorization', authorizationRoute)
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




app.listen(3000)