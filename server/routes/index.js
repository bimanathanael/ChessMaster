const router = require("express").Router();
const leaderboard = require("./leaderboard");
const UsersController = require("../controllers/UsersController");

router.post("/login", UsersController.login);
router.post("/register", UsersController.register);

router.use("/leaderboards", leaderboard);
router.get("/", (req, res) => {
  res.send("welcome, /users , /leaderboards");
});

module.exports = router;
