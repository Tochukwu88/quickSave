const express = require('express')

const Auth = require('../controllers/auth')

const router = express.Router()
router.post("/createuser", Auth.create )




module.exports = router


