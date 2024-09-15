const mongoose = require('mongoose');
const DB =process.env.DATABASE_URL
mongoose.connect(DB).then(()=>{
    console.log("Connected to MongoDB");
}).catch(()=>{
    console.log("Connection Is Not Eteblished.");
});