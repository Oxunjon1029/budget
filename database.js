const bcrypt = require("bcrypt");
const { v4: uuid4 } = require("uuid");
const users = [];
const Users = require('./models/Users')
const register = (user) => {
  users.push({
    id: uuid4(),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  })
}

async function getUserByEmail(email) {
  const user = await Users.findOne({ email: email });
  return user;
}

async function loginUser(email, password) {
  const user = await getUserByEmail(email);
  console.log(user);
  if (user &&  bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}


module.exports = {
  getUserByEmail,
  register,
  loginUser
}