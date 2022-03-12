const bcrypt = require("bcrypt");
const { v4: uuid4 } = require("uuid");
const users = [];

const register = (user) => {
  users.push({
    id: uuid4(),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  })
}

const getUserByEmail = (email) => {
  const user = users.find(user => user.email === email);
  return user;
}

const loginUser = (email, password) => {
  const user = getUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}


module.exports = {
  users,
  getUserByEmail,
  register,
  loginUser
}