require('dotenv').config();
const mongoUrl = `${process.env.MONGODB_URL}${process.env.DB_NAME}`;
const bcrypt = require("bcrypt");
const User = require("./models/Users");
mongoose.connect(mongoUrl);
userCreateAdmin();
async function userCreateAdmin() {
  const user = await new User({ email: "ab@ab.com", password: `${bcrypt.hashSync("123", 10)}`, role: "ADMIN", firstName: "Oxunjon", lastName: "Abdusalomov" });
  user.save();
  console.log(user);
}
async function userCreateUser() {
  const user = await new User({ email: "sdsd@dsds.com", password: `${bcrypt.hashSync("234", 10)}`, role: "USER", firstName: "Avaz", lastName: "Sotvoldiyev" });
  user.save();
  console.log(user);
}
userCreateUser();


