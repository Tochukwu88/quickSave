const express = require('express')

const Cards = require('../controllers/card')
const Auth = require('../controllers/auth')

const router = express.Router()
router.post("/addcard",Auth.verifyToken ,Cards.addCard )




module.exports = router


