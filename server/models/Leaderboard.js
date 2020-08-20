const db = require('../config/mongo')
const LeaderboardColls = db.collection('Leaderboards')

class LeaderboardModel {
  static getAll(){
    return LeaderboardColls.find().toArray()
  }

  static addOne(newOne){
    return LeaderboardColls.insertOne(newOne)
  }
}

module.exports = LeaderboardModel