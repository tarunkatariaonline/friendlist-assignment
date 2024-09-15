const express = require('express')
const { createUser } = require('../Controller/userController')
const router = express.Router()
router.post('/api/v1/user/create',createUser)


module.exports = router