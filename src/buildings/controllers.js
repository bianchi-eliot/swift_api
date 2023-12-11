const buildingsServices = require('./services')

async function getBuildings(_, res) {
    try {
        const buildings = await buildingsServices.getBuildings()
        for(const building of buildings) {
            const longitude = parseFloat(building.longitude)
            const latitude = parseFloat(building.latitude)
            building.longitude = longitude
            building.latitude = latitude
        }
        const status = buildings.length === 0 ? 204 : 200

        res.status(status).send(buildings)
    } catch(err) {
        console.log(err.message)
        res.send('An error occurred')
    }
}

async function getPeopleInBuilding(req, res) {
    try {
        const buildingId = req.params.buildingId
        const people = await buildingsServices.getPeopleInBuilding(buildingId)

        const status = people.length === 0 ? 204 : 200

        res.status(status).send(people)
    } catch(err) {
        console.log(err.message)
        res.send('An error occurred')
    }
}

module.exports = { getBuildings, getPeopleInBuilding }