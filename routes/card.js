const express = require('express')

const Cards = require('../controllers/card')

const router = express.Router()
router.post("/addcard", Cards.addCard )




module.exports = router


// "authorization_code":"AUTH_8dfhjjdt",
// "card_type":"visa",
// "last4":"1381",
// "exp_month":"08",
// "exp_year":"2018",
// "bin":"412345",
// "bank":"TEST BANK",
// "channel":"card",
// "signature": "SIG_idyuhgd87dUYSHO92D",
// "reusable":true,
// "country_code":"NG",
// "account_name": "BoJack Horseman"