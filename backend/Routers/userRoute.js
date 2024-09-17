const express = require('express')
const multer = require('multer')
const { createUser, loginUser, aboutme, updatePassword, logout } = require('../Controller/userController')
const { userAuth } = require('../Middleware/userAuth')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        console.log(file)
      cb(null, `${Date.now()}-${file.originalname}`);  // Unique file name
    }
  });
  
  const upload = multer({ storage: storage });
  
const router = express.Router()
router.post('/api/v1/user/register',upload.single('image'),createUser)
router.post('/api/v1/user/login',loginUser)
router.get('/api/v1/user/aboutme',userAuth,aboutme)
router.post('/api/v1/user/updatepassword',userAuth,updatePassword)
router.get('/api/v1/user/logout',userAuth,logout)


module.exports = router