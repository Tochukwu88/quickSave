
const { Card, User, Wallet, Transaction } = require('../models/index')
const {recurringCharge } = require('./paystack')
const fetch = require('isomorphic-fetch')


class Cards {
   
   
    static async addCard(req,res) {
       
     
        
        try {
            const ref = req.query.reference
            const response = await  fetch (`https://api.paystack.co/transaction/verify/${ref}`,{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
                    'Content-Type':'application/json'
                },
             
            })
            const r = await response.json()
            const result = r.data
           
           

            const user = await User.findOne({ where: { email:result.customer.email } })

            const card = await Card.findOne({ where: { authorization_code:result.authorization.authorization_code } })

            if (card) {
                return res.status(409).json({
                    message: "card already exist"
                })
            }
            const addedCard = await Card.create({
                userId: user.id,
                email:result.customer.email,
                amount:Number(5000),
                authorization_code:result.authorization.authorization_code,
                card_type:result.authorization.card_type,
                last4:result.authorization.last4,
                exp_month:result.authorization.exp_month,
                exp_year:result.authorization.exp_year,
                bin:result.authorization.bin,

                bank:result.authorization.bank,
                channel:result.authorization.channel,
                signature:result.authorization.signature,
                country_code:result.authorization.country_code,
                account_name:"test name"
            })
            if (addedCard) {


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
  
    static async chargeCard(req, res, next) {
       

        try {
            let balance;
            const card = await Card.findAll()



            card.map(async (c) => {
                const data ={
                    "authorization_code" : c.dataValues.authorization_code,
                    "email" : c.dataValues.email,
                    "amount" : c.dataValues.amount
                }

                const wallet = await Wallet.findOne({ where: { cardId: c.dataValues.id } })

                if (!wallet) {
                    balance = Number(c.dataValues.amount)
                  const result = await recurringCharge(data)
                   console.log(result)
               
                  
                    const newWallet = await Wallet.create({ cardId: c.dataValues.id, userId: c.dataValues.userId, amount: c.dataValues.amount, balance: result.data.amount })
                    await Transaction.create({ userId: newWallet.dataValues.userId, amount_credited: newWallet.dataValues.amount, walletId: newWallet.dataValues.id })
                }
                if (wallet && wallet.dataValues.balance) {
                  
                  const resultData =  await recurringCharge(data)
                  
                  
                
                  

                    const updatedWallet = await Wallet.increment(
                        { balance: +resultData.data.amount },
                        { where: { id: wallet.dataValues.id } }
                    );

                    await Transaction.create({ userId: wallet.dataValues.userId, amount_credited: resultData.data.amount, walletId: wallet.dataValues.id })
                 }


            })


            next()


        } catch (err) {
            res.status(500).json({
                error: err
            })

        }

    }


}
module.exports = Cards