const jwt = require("jsonwebtoken");
const TOKEN_KEY = "chessMaster";

const jwtSignIn = (data) => {
  let token = jwt.sign(data, TOKEN_KEY);
  return token;
};

module.exports = { jwtSignIn };
