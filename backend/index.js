const express = require('express')
var cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const path = require('path');
var cookieParser = require('cookie-parser')
const userRouter = require('./Routers/userRoute')
const friendBookRouter = require('./Routers/friendBookRoute')

var bodyParser = require('body-parser')
const port = 3000
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
dotenv.config({path:'./config.env'})
require('./Database/Connection')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  
  origin:"http://localhost:5173",
  credentials:true,
}))
// parse application/json
app.use(bodyParser.json())

app.use(userRouter)
app.use(friendBookRouter)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})