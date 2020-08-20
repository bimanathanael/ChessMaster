const UserModel = require("../models/User");
const { hashPassword, decodePassword } = require("../helpers/bcrypt");
const { jwtSignIn } = require("../helpers/jsonwebtoken");

class UserController {
  static async register(req, res) {
    try {
      if (!req.body.username || req.body.username == "") {
        return res.status(400).json({ message: "username cannot empty" });
      }
      if (!req.body.password || req.body.password == "") {
        return res.status(400).json({ message: "password cannot empty" });
      }

      const newUser = {
        username: req.body.username,
        password: hashPassword(req.body.password),
      };

      const CurrentUser = await UserModel.getAll();
      const searchUser = CurrentUser.filter(
        (user) => user.username === newUser.username
      );

      if (searchUser.length === 0) {
        const User = await UserModel.addOne(newUser);
        return res.status(201).json({ message: "success register" });
      } else {
        return res
          .status(400)
          .json({ message: "this username has been registered" });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const User = await UserModel.findOne(username);
      console.log(User, "check");
      if (!User) {
        return res.status(404).json({ message: "user not found" });
      } else {
        console.log("apakash sukses sini");
        const checkPassword = decodePassword(password, User.password);
        if (!checkPassword) {
          return res.status(404).json({ message: "wrong password" });
        } else {
          const sendToJWT = {
            username: req.body.username,
          };
          const access_token = jwtSignIn(sendToJWT);
          return res.status(200).json({ access_token });
        }
      }
      return res.status(200).json({ users: User });
    } catch (error) {
      console.log(error, "ini error");
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = UserController;
