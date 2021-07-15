const { Card ,User} = require('../models/index')

class Cards {
    static async addCard(req, res) {
       
        const {
            uuid,
            email,
            amount,
            authorization_code,
            card_type,
            last4,
            exp_month,
            exp_year,
            bin,
            
            bank,
            channel,
            signature,
            country_code,
            account_name
        } = req.body
        try {
            
            const user = await User.findOne({where:{uuid}})
           
            const card = await Card.findOne({ where: { authorization_code } })
          
            if (card) {
                return res.status(409).json({
                    message: "card already exist"
                })
            }
            const addedCard = await Card.create({
                userId:user.id,
                email,
                amount,
                authorization_code,
                card_type,
                last4,
                exp_month,
                exp_year,
                bin,
                
                bank,
                channel,
                signature,
                country_code,
                account_name
            })
           if(addedCard){
            return res.status(201).json({
                message: "card added successfully"
            })

           }
            
                
            
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }


    }

}
module.exports = Cards