const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class Auth {
    static async register(req, res) {

        try {
            const { firstName, lastName, email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (user) {
                return res.status(409).json({
                    error: "user with that email already exist"
                })
            }
            const newUser = await User.create({ firstName, lastName, email, password })
            return res.status(201).json({
                message: "User  created"
            })
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }




    }
    static async login(req, res) {

        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (user === null) {
                return res.status(404).json({
                    error: "user with that email does not exist"
                })
            }
            const comparedPassword = await bcrypt.compare(password, user.dataValues.password);
            if (!comparedPassword) {
                return res.status(401).json({
                    error: "email and password do not match"
                })
            }
            const token = jwt.sign({ id: user.dataValues.id }, process.env.JWTSECRET, { expiresIn: process.env.TOKENVALIDITY })
            const { uuid, firstName } = user.dataValues
            const _email = user.dataValues.email
            return res.json({
                token,
                user: {
                    uuid, firstName, _email
                }
            })
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }




    }
    static async verifyToken(req, res, next) {

        const authorizationHeaader = req.headers
        try {
            if (authorizationHeaader) {
                const token = authorizationHeaader.authorization.split(' ')[1]



                let decoded = await jwt.verify(token, process.env.JWTSECRET, { expiresIn: process.env.TOKENVALIDITY })
                req.user = decoded


            }
            next()



        } catch (err) {
            return res.status(403).json({
                error: 'please login'
            })
        }


    }
}
module.exports = Auth