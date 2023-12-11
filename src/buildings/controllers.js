const buildingsServices = require('./services')

const { calculateHours } = require('../../dates.tools')

async function getBuildings(_, res) {
    try {
        const buildings = await buildingsServices.getBuildings()
        for(const building of buildings) {
            const longitude = parseFloat(building.longitude)
            const latitude = parseFloat(building.latitude)
            building.longitude = longitude
            building.latitude = latitude
        }

        res.status(200).send(buildings)
    } catch(err) {
        res.send('An error occurred')
    }
}

async function getPeopleInBuilding(req, res) {
    try {
        const buildingId = req.params.buildingId
        const people = await buildingsServices.getPeopleInBuilding(buildingId)

        for(user of people) {
            const hours = calculateHours(user.in_building_since)
            user.in_building_since = hours
        }

        res.status(200).send(people)
    } catch(err) {
        res.send('An error occurred')
    }
}

module.exports = { getBuildings, getPeopleInBuilding }