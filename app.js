const express = require('express');
const app = express()
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const cardRoutes = require('./routes/card')

const {sequelize} = require('./models/index')

app.use(morgan('dev'))
require('dotenv').config()
app.use(express.json());
app.use('/v1',authRoutes)
app.use('/v1',cardRoutes)


const port = process.env.PORT || 8000
app.listen(port,async()=>{
    try{
        console.log('server started')
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
})