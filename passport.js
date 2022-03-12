const db = require("./database");

const jwtCallback = (jwt_payload, done) => {
  const user = db.getUserByEmail(jwt_payload.email);
  if (user) {
    done(null, user);
  }
  done(null, false);
}

module.exports = {
  jwtCallback,
}