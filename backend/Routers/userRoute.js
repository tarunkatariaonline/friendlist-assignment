const express = require('express')
const { createUser, loginUser, aboutme, updatePassword, logout } = require('../Controller/userController')
const { userAuth } = require('../Middleware/userAuth')
const router = express.Router()
router.post('/api/v1/user/register',createUser)
router.post('/api/v1/user/login',loginUser)
router.get('/api/v1/user/aboutme',userAuth,aboutme)
router.post('/api/v1/user/updatepassword',userAuth,updatePassword)
router.get('/api/v1/user/logout',userAuth,logout)


module.exports = router