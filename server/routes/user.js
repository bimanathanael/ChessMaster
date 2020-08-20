const router = require('express').Router()
const UsersController = require('../controllers/UsersController')

router.get('/', UsersController.get)
router.post('/', UsersController.add)

module.exports = router