const { calculateHours, calculateYears } = require('../../dates.tools')

const usersServices = require('./services')

async function getUser(req, res) {
    try {
        const userId = req.params.userId
        const user = await usersServices.getUser(userId)
        console.log(user)
        const building_user_is_in = {}

        const hours = calculateHours(user.in_building_since)
        delete user.in_building_since
        building_user_is_in.in_building_since = hours

        const buildingName = user.building_name
        delete user.building_name
        building_user_is_in.building_name = buildingName

        building_user_is_in.building_id = user.building_id
        delete user.building_id

        const years = calculateYears(user.created_at)
        user.created_at = years

        user.building_user_is_in = building_user_is_in

        res.status(200).send(user)
    } catch(err) {
        console.log(err.message)
        res.send('An error occurred')
    }
}

async function changeBuildingPresence(req, res) {
    try {
        const userId = req.params.userId
        let { buildingId } = req.body
        if (buildingId === -1) buildingId = null
        const buildingName = await usersServices.changeBuildingPresence(userId, { buildingId })

        res.status(200).send(buildingName)
    } catch(err) {
        res.send('An error occurred')
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.userId
        const { firstName, lastName, occupationId } = req.body
        const updatedUser = await usersServices.updateUser(userId, { firstName, lastName, occupationId })

        const building_user_is_in = {}

        const hours = calculateHours(updatedUser.in_building_since)
        delete updatedUser.in_building_since
        building_user_is_in.in_building_since = hours

        const years = calculateYears(updatedUser.created_at)
        delete updatedUser.created_at
        building_user_is_in.created_at = years

        const buildingName = updatedUser.building_name
        delete updatedUser.buildingName
        building_user_is_in.building_name = buildingName

        updatedUser.building_user_is_in = building_user_is_in

        res.status(200).send(updatedUser)
    } catch(err) {
        res.send('An error occurred')
    }
}

module.exports = { getUser, changeBuildingPresence, updateUser }