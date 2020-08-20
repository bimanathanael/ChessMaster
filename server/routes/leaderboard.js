const router = require('express').Router()
const LeaderboardController = require('../controllers/LeaderboardController')

router.get('/', LeaderboardController.get)
router.post('/', LeaderboardController.add)

module.exports = router
