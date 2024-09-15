const express = require('express')
const app = express()
const dotenv = require('dotenv')
const userSchema = require('./Routers/userRoute')
const port = 3000
dotenv.config({path:'./config.env'})
require('./Database/Connection')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(userSchema)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})