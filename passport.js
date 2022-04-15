const db = require("./database");

const jwtCallback = async (jwt_payload, done) => {
  const user = await db.getUserByEmail(jwt_payload.email);
  console.log('user', user);
  done(null, user || false);
}

module.exports = {
  jwtCallback,
}