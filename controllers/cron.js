

const { Card } = require('../models')
const Cards = require('../controllers/card')

var CronJob = require('cron').CronJob;



const job = new CronJob(' * * * * *', async function () {

    const cards = await Card.findAll()
    if (cards) {
        cards.forEach(card => {
            if (card.dataValues.interval === "every minute") {
                var d = new Date()
                Cards.chargeCard(card)
                console.log(d.getMinutes())


            }







        });
    }


}, null, true);
const everyFive = new CronJob(' */5 * * * *', async function () {

    const cards = await Card.findAll()
    if (cards) {
        cards.forEach(card => {
            if (card.dataValues.interval === "every five minute") {
                var d = new Date()
                Cards.chargeCard(card)
                console.log(d.getMinutes())


            }







        });

    }


}, null, true);
const everyThree = new CronJob(' */3 * * * *', async function () {

    const cards = await Card.findAll()
    if (cards) {
        cards.forEach(card => {
            if (card.dataValues.interval === "every three minute") {
                var d = new Date()
                Cards.chargeCard(card)
                console.log(d.getMinutes())


            }







        });


    }

}, null, true);
const startJob = () => {
    job.start()
    everyFive.start()
    everyThree.start
}



module.exports = {
    startJob
}


