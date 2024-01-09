const { calculateHours, calculateYears } = require('../../dates.tools')

const usersServices = require('./services')

async function getUser(req, res) {
    try {
        const userId = req.params.userId
        console.log('redirected!' + ' ' + userId)
        const user = await usersServices.getUser(userId)

        if (user.building_id == null) {
            return res.status(200).send(user)
        }

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

async function addUser(req, res) {
    try {
        const { firstName, lastName, image, occupationId } = req.body
        const imageUrl = `https://swift-api.nexford.fr/images/${image}` 
        const newId = await usersServices.addUser(firstName, lastName, imageUrl, occupationId)

        const newUser = await usersServices.getUser(newId)
        res.status(201).send(newUser)
    } catch(err) {
        console.log(err.message)
        res.send('An error occurred')
    }
}

async function changeBuildingPresence(req, res) {
    try {
        const userId = req.params.userId
        let { buildingId } = req.body
        const buildingUserIsIn = await usersServices.changeBuildingPresence(userId, { buildingId })
        
        if (buildingUserIsIn != null) buildingUserIsIn.in_building_since = 'Now'

        res.status(200).send(buildingUserIsIn)
    } catch(err) {
        console.log(err.message)
        res.send('An error occurred')
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.userId
        const { firstName, lastName, occupationId } = req.body
        const updatedUser = await usersServices.updateUser(userId, { firstName, lastName, occupationId })

        if (updatedUser.building_id == null) {
            return res.status(200).send(updatedUser)
        }

        const building_user_is_in = {}

        const hours = calculateHours(updatedUser.in_building_since)
        delete updatedUser.in_building_since
        building_user_is_in.in_building_since = hours

        const buildingName = updatedUser.building_name
        delete updatedUser.building_name
        building_user_is_in.building_name = buildingName

        building_user_is_in.building_id = updatedUser.building_id
        delete updatedUser.building_id

        const years = calculateYears(updatedUser.created_at)
        updatedUser.created_at = years

        updatedUser.building_user_is_in = building_user_is_in

        res.status(200).send(updatedUser)
    } catch(err) {
        console.log(err.message)
        res.send('An error occurred')
    }
}

module.exports = { getUser, addUser, changeBuildingPresence, updateUser }