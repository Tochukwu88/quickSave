const express = require('express')

const Cards = require('../controllers/card')
const Auth = require('../controllers/auth')
const {initPaystack} = require('../controllers/paystack')

const router = express.Router()

router.get("/chargecard" ,Cards.chargeCard )

router.get('/pay/verify',Cards.addCard)
router.post("/pay" ,Auth.verifyToken, initPaystack)
router.put("/card/update" , Cards.updateAmountAndInterval)



module.exports = router


