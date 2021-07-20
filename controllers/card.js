
const { Card, User, Wallet, Transaction } = require('../models/index')
const { recurringCharge, verifyPay } = require('./paystack')
const fetch = require('isomorphic-fetch')


class Cards {


    static async addCard(req, res) {

        const ref = req.query.reference

        try {
            const response = await verifyPay(ref)

            const result = response.data



            const user = await User.findOne({ where: { email: result.customer.email } })

            const card = await Card.findOne({ where: { authorization_code: result.authorization.authorization_code } })

            if (card) {
                return res.status(409).json({
                    message: "card already exist"
                })
            }
            const addedCard = await Card.create({
                userId: user.id,
                email: result.customer.email,

                authorization_code: result.authorization.authorization_code,
                card_type: result.authorization.card_type,
                last4: result.authorization.last4,
                exp_month: result.authorization.exp_month,
                exp_year: result.authorization.exp_year,
                bin: result.authorization.bin,

                bank: result.authorization.bank,
                channel: result.authorization.channel,
                signature: result.authorization.signature,
                country_code: result.authorization.country_code,
                account_name: "test name"
            })
            if (addedCard) {
                const wallet = await Wallet.findOne({ where: { cardId: addedCard.dataValues.id } })

                if (!wallet) {




                    const newWallet = await Wallet.create({ cardId: addedCard.dataValues.id, userId: addedCard.dataValues.userId, balance: 50 })
                    await Transaction.create({ userId: newWallet.dataValues.userId, amount_credited: newWallet.dataValues.balance, walletId: newWallet.dataValues.id })
                }

                return res.status(201).json({
                    message: "card is valid",
                    cardId: addedCard.dataValues.id
                })

            }



        } catch (err) {
            res.status(500).json({
                error: err
            })
        }


    }
    static async updateAmountAndInterval(req, res, next) {

        const { id, amount, interval } = req.body
        try {
            const added = await Card.update({ amount: Number(amount), interval }, {
                where: {
                    id
                }
            })
            if (added) {
                return res.status(204).json({
                    message: "card successfully added"
                })
            }

        } catch (err) {
            res.status(500).json({
                error: err
            })
        }

    }

    static async chargeCard(c) {


        try {






            const data = {
                "authorization_code": c.dataValues.authorization_code,
                "email": c.dataValues.email,
                "amount": c.dataValues.amount
            }

            const wallet = await Wallet.findOne({ where: { cardId: c.dataValues.id } })

            if (!wallet) {

                const result = await recurringCharge(data)



                const newWallet = await Wallet.create({ cardId: c.dataValues.id, userId: c.dataValues.userId, balance: result.data.amount })
                await Transaction.create({ userId: newWallet.dataValues.userId, amount_credited: result.data.amount, walletId: newWallet.dataValues.id })
            }
            if (wallet && wallet.dataValues.balance) {

                const resultData = await recurringCharge(data)





                const updatedWallet = await Wallet.increment(
                    { balance: +resultData.data.amount },
                    { where: { id: wallet.dataValues.id } }
                );

                await Transaction.create({ userId: wallet.dataValues.userId, amount_credited: resultData.data.amount, walletId: wallet.dataValues.id })
            }








        } catch (err) {
            console.log(err)

        }

    }


}
module.exports = Cards