const { calculateHours, calculateYears } = require('../../dates.tools')

const usersServices = require('./services')

async function getUser(req, res) {
    try {
        const userId = req.params.userId
        const user = await usersServices.getUser(userId)

        const hours = calculateHours(user.in_building_since)
        user.in_building_since = hours

        const years = calculateYears(user.created_at)
        user.created_at = years

        res.status(200).send(user)
    } catch(err) {
        res.send('An error occurred')
    }
}

async function changeBuildingPresence(req, res) {
    try {
        const userId = req.params.userId
        const { buildingId } = req.body
        await usersServices.changeBuildingPresence(userId, { buildingId })

        res.status(200).send('Done')
    } catch(err) {
        res.send('An error occurred')
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.userId
        const { firstName, lastName, occupationId } = req.body
        const updatedUser = await usersServices.updateUser(userId, { firstName, lastName, occupationId })

        const hours = calculateHours(updatedUser.in_building_since)
        updatedUser.in_building_since = hours

        const years = calculateYears(updatedUser.created_at)
        updatedUser.created_at = years

        res.status(200).send(updatedUser)
    } catch(err) {
        res.send('An error occurred')
    }
}

module.exports = { getUser, changeBuildingPresence, updateUser }