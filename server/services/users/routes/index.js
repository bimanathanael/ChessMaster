const router = require("express").Router();
const UsersController = require("../controllers/UsersController");

router.post("/login", UsersController.login);
router.post("/register", UsersController.register);
router.get("/users", UsersController.getUser);
router.get("/users/:username", UsersController.getByUsername);
router.put("/users", UsersController.updateScoreUser);

module.exports = router;
