
const User = require('../Schema/userSchema')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//create user api -

const createUser = async (req, res) => {

    try {
        const { username, name, email, password, phoneno, hobbies } = req.body

        if (!username || !name || !email || !password || !phoneno || !hobbies) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const isUserNameExist = await User.findOne({ username })

        if (isUserNameExist) {
            return res.status(400).json({ message: "Username already exist" })
        }

        const isUserEmailExist = await User.findOne({ email })

        if (isUserEmailExist) {
            return res.status(400).json({ message: "Email already exist" })
        }

        const encryptedPassoword = await bcrypt.hash(password, 12);
        console.log(encryptedPassoword)
        const user = await User.create({ username, name, email, password: encryptedPassoword, phoneno, hobbies })
        res.status(201).json({
            message: "User Created Successfully.",
            user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//login api 

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: "Invalid username !" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password !" })
        }
        var token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
        // console.log(token)

        res.cookie('friendbooktoken', token, {
            expires: new Date(Date.now() + 2555555555555),
        })
        res.status(200).json({ message: "Login Successfull !", user })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const aboutme = async(req,res)=>{
try{
res.status(200).json({
    message:"Got Details Successfully",
    user:req.user
})
}catch(error){
    res.status(500).json({message:error.message})
    }
}

const updatePassword = async(req,res)=>{
  const {oldpassword,newpassword} = req.body;
  try{
    const user = await User.findOne({username:req.user.username})
    const isMatch = await bcrypt.compare(oldpassword,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid Old Password!"})
        }
        const hashedPassword = await bcrypt.hash(newpassword,12)
        user.password = hashedPassword
        await user.save()
        res.status(200).json({message:"Password Updated Successfully!"})
}catch(err){
    res.status(500).json({message:err.message})
}
}

const logout = async(req,res)=>{
    res.clearCookie('friendbooktoken')
    res.status(200).json({message:"Logged Out Successfully!"})

}
module.exports = { createUser, loginUser ,aboutme,updatePassword,logout}