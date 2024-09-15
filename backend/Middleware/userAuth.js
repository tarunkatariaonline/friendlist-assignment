const jwt = require('jsonwebtoken');
const User = require('../Schema/userSchema')
const userAuth = async(req,res,next)=>{

    const token = req.cookies.friendbooktoken
    if(!token){
         return res.status(401).json({success:false,
        message:"User not authanticated"})
    }

    const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
   const user = await User.findOne({username:verifyToken.username}).select('-password')
//    console.log(user)
   if(!user){
    return res.status(401).json({success:false,
        message:"User is not found!"})
        }
        req.user = user
 
    next();
}


module.exports = {userAuth}