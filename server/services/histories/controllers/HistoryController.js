const { History } = require("../models");
class HistoryController {
  static async getByUsername(req, res) {
    try {
      const params = req.params.player;
      const data = await History.findAll({ where: { player: params } });
      if (data.length === 0) {
        return res.status(400).json({ message: "player not found" });
      } else {
        return res.status(200).json(data);
      }
    } catch (err) {
      console.log(err, "eror");
      return res.status(500).json({ message: "internal error server" });
    }
  }

  static async add(req, res) {
    try {
      const { player, opponent, status, score } = req.body;
      const newData = {
        player,
        opponent,
        status,
        score,
      };
      const result = await History.create(newData);
      return res.status(201).json(result);
    } catch (err) {
      if (err.name === `SequelizeValidationError`) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      return res.status(500).json({ message: "internal error server" });
    }
  }
}

module.exports = HistoryController;
