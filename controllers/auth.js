const { User } = require('../models/index')

class Auth {
    static async create(req, res) {

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
}
module.exports = Auth