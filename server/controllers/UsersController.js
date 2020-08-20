const UserModel = require('../models/User')

class UserController {
  static async get( req, res){
    try {
      const User = await UserModel.getAll()
      return res.status(200).json({ users: User })
    } catch (error) {
      return res.status(500).json({ "message" : error })
    }
  }

  static async add ( req, res ){
    try {
      if( !req.body.username || req.body.username == ""){
        return res.status(400).json({ "message": "username cannot empty" })
      }

      const newUser = {
        username: req.body.username
      }

      const CurrentUser = await UserModel.getAll()
      const searchUser = CurrentUser.filter( user => user.username === newUser.username)
      
      if( searchUser.length === 0 ){
        const User = await UserModel.addOne(newUser)
        return res.status(201).json(User.ops[0])
      } else {
        return res.status(400).json({"message": "this username has been registered"})
      }

    } catch (error) {
      return res.status(500).json({ "message" : error })
    }
  }
}

module.exports = UserController