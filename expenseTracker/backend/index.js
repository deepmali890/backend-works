const express = require("express")
const cors = require('cors')
require('dotenv').config()
require('./src/database/config')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 1200

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})