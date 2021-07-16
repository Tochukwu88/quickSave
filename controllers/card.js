
const { Card, User, Wallet, Transaction } = require('../models/index')


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

            const user = await User.findOne({ where: { uuid } })

            const card = await Card.findOne({ where: { authorization_code } })

            if (card) {
                return res.status(409).json({
                    message: "card already exist"
                })
            }
            const addedCard = await Card.create({
                userId: user.id,
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

                const wallet = await Wallet.findOne({ where: { cardId: c.dataValues.id } })

                if (!wallet) {
                    balance = Number(c.dataValues.amount)
                    const newWallet = await Wallet.create({ cardId: c.dataValues.id, userId: c.dataValues.userId, amount: c.dataValues.amount, balance: balance })
                    await Transaction.create({ userId: newWallet.dataValues.userId, amount_credited: newWallet.dataValues.amount, walletId: newWallet.dataValues.id })
                }
                if (wallet && wallet.dataValues.balance) {
                    balance = Number(c.dataValues.amount)

                    const updatedWallet = await Wallet.increment(
                        { balance: +balance },
                        { where: { id: wallet.dataValues.id } }
                    );

                    await Transaction.create({ userId: wallet.dataValues.userId, amount_credited: balance, walletId: wallet.dataValues.id })
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