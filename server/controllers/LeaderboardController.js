const LeaderboardModel = require("../models/Leaderboard");

class LeaderboardController {
  static async get(req, res) {
    try {
      const Leaderboard = await LeaderboardModel.getAll();
      return res.status(200).json({ leaderboard: Leaderboard });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async add(req, res) {
    try {
      if (!req.body.username || req.body.username == "") {
        return res.status(400).json({ message: "username cannot empty" });
      }
      if (!req.body.time || req.body.time == "") {
        return res.status(400).json({ message: "time cannot empty" });
      }

      const newLeaderboard = {
        username: req.body.username,
        time: req.body.time,
      };

      const Leaderboard = await LeaderboardModel.addOne(newLeaderboard);
      return res.status(201).json(Leaderboard.ops[0]);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = LeaderboardController;
