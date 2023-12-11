const occupationsServices = require('./services')

async function getOccupations(_, res) {
    try {
        const occupations = await occupationsServices.getOccupations()

        const status = occupations.length === 0 ? 204 : 200

        res.status(status).send(occupations)
    } catch(err) {
        res.send('An error occurred')
    }
}

module.exports = { getOccupations }