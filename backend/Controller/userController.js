
const User = require('../Schema/userSchema')
const bcrypt = require('bcrypt');
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

       const encryptedPassoword = await bcrypt.hash(password,12);
       console.log(encryptedPassoword)
        const user = await User.create({username,name,email,password:encryptedPassoword,phoneno,hobbies})
        res.json({
            message: "User Created Successfully.",
            user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createUser }