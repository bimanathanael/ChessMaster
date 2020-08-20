const router = require('express').Router()
const user = require('./user')
const leaderboard = require('./leaderboard')

router.use('/users', user)
router.use('/leaderboards', leaderboard)
router.get('/', (req, res) => {
  res.send("welcome, /users , /leaderboards")
})

module.exports = router