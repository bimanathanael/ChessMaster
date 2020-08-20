const router = require("express").Router();
const UsersController = require("../controllers/UsersController");

router.post("/login", UsersController.login);
router.post("/register", UsersController.register);
router.get("/users", UsersController.getUser);
router.put("/users", UsersController.updateScoreUser);

router.get("/", (req, res) => {
  res.send("welcome, /users , /leaderboards");
});

module.exports = router;
