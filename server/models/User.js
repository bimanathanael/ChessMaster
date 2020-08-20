const db = require("../config/mongo");
const UserColls = db.collection("Users");

class UserModel {
  static getAll() {
    return UserColls.find().toArray();
  }

  static addOne(newOne) {
    return UserColls.insertOne(newOne);
  }

  static findOne(username) {
    return UserColls.findOne({ username });
  }

  static updateOne(username, userUpdate) {
    return UserColls.findOneAndUpdate({ username }, { $set: userUpdate });
  }
}

module.exports = UserModel;
