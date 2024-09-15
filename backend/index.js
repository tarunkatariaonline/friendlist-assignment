const express = require('express')
const app = express()
const dotenv = require('dotenv')
var cookieParser = require('cookie-parser')
const userSchema = require('./Routers/userRoute')
var bodyParser = require('body-parser')
const port = 3000
dotenv.config({path:'./config.env'})
require('./Database/Connection')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(userSchema)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})