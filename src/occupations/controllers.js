const occupationsServices = require('./services')

async function getOccupations(_, res) {
    try {
        const occupations = await occupationsServices.getOccupations()

        res.status(200).send(occupations)
    } catch(err) {
        res.send('An error occurred')
    }
}

module.exports = { getOccupations }