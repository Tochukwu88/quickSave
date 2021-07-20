const fetch = require('isomorphic-fetch')


const initPaystack = async (req, res) => {
    try {
        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": req.body.email,
                "amount": "5000"
            })
        })
        const r = await response.json()
        return res.status(200).json(r)

    } catch (err) {
        console.log(err)
    }


}
const recurringCharge = async (data) => {
    try {
        const response = await fetch('https://api.paystack.co/transaction/charge_authorization', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const r = await response.json()
        return r
    } catch (err) {
        console.log(err)
    }

}

const verifyPay = async (ref) => {



    try {




        const response = await fetch(`https://api.paystack.co/transaction/verify/${ref}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
                'Content-Type': 'application/json'
            },

        })
        return await response.json()



    } catch (err) {
        console.log(err)
    }

}
module.exports = {
    initPaystack,
    recurringCharge,
    verifyPay
}