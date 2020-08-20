const UserModel = require("../models/User");
const { hashPassword, decodePassword } = require("../helpers/bcrypt");
const { jwtSignIn } = require("../helpers/jsonwebtoken");

class UserController {
  static async getUser(req, res) {
    try {
      const usersData = await UserModel.getAll();
      return res.status(200).json(usersData);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async updateScoreUser(req, res) {
    try {
      const username = req.body.username;
      const score = Number(req.body.score);
      if (!username) {
        return res.status(400).json({ message: "username cannot empty" });
      }
      if (!score) {
        return res.status(400).json({ message: "score cannot empty" });
      }

      let dataUser = await UserModel.findOne(username);

      if (!dataUser) {
        return res.status(404).json({ message: "username cannot found" });
      } else {
        dataUser.score += score;
        const updateData = {
          username: dataUser.username,
          password: dataUser.password,
          score: dataUser.score,
        };
        const update = await UserModel.updateOne(username, updateData);
        const result = {
          username: dataUser.username,
          score: dataUser.score,
        };
        return res.status(200).json(result);
      }
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

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
        score: 0,
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

      if (!User) {
        return res.status(404).json({ message: "user not found" });
      } else {
        const checkPassword = decodePassword(password, User.password);
        if (!checkPassword) {
          return res.status(404).json({ message: "wrong password" });
        } else {
          const sendToJWT = {
            username: User.username,
            score: User.score,
          };
          const access_token = jwtSignIn(sendToJWT);
          return res.status(200).json({ access_token });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = UserController;
