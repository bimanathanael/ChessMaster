const router = require("express").Router();
const HistoryController = require("../controllers/HistoryController");

router.get("/histories/:player", HistoryController.getByUsername);
router.post("/histories", HistoryController.add);

module.exports = router;
