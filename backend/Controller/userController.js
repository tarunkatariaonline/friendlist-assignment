
//create user api -

const createUser = (req,res)=>{
const {username,name,email,password,phoneno,hobbies} = req.body
console.log(username,name,email,password,phoneno,hobbies)
res.json({
    message:"User Created Successfully."
})
}

module.exports = {createUser}