const express = require('express');
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))
require('dotenv').config()
app.use(express.json());


const port = process.env.PORT || 8000
app.listen(port,async()=>{
    try{
        console.log('server started')
    }catch(err){}
})