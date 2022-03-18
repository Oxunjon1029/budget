const bcrypt = require("bcrypt");
const { v4: uuid4 } = require("uuid");
const users = [];
const User = require('./models/Users');
const register = (user) => {
  users.push({
    id: uuid4(),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  })
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email: email });
  return user;
}
async function loginUser  (email, password){
  const user = await getUserByEmail(email);

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