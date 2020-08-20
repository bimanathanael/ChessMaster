const bcrypt = require("bcrypt");
const saltRounds = 10;
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const decodePassword = (password, passwordFromDB) => {
  return bcrypt.compareSync(password, passwordFromDB);
};

module.exports = { hashPassword, decodePassword };
