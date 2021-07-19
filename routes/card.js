const express = require('express')

const Cards = require('../controllers/card')
const Auth = require('../controllers/auth')
const {initPaystack} = require('../controllers/paystack')

const router = express.Router()

router.get("/chargecard" ,Cards.chargeCard )
router.post("/pay" , initPaystack)
router.get('/pay/verify',Cards.addCard)



module.exports = router


