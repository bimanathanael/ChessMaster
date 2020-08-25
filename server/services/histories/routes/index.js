const router = require("express").Router();
const HistoryController = require("../controllers/HistoryController");

router.get("/histories/:player", HistoryController.getByUsername);
router.post("/histories", HistoryController.add);

router.get("/", (req, res) => {
  res.send("welcome, /historys");
});

module.exports = router;
