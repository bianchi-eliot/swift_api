const usersServices = require('./services')

async function getUser(req, res) {
    try {
        const userId = req.params.userId
        const user = await usersServices.getUser(userId)

        const status = user === null ? 204 : 200

        res.status(status).send(user)
    } catch(err) {
        res.send('An error occurred')
    }
}

async function changeBuildingPresence(req, res) {
    try {
        const userId = req.params.userId
        const { buildingId, date } = req.body
        usersServices.changeBuildingPresence(userId, { buildingId, date })

        res.status(204).send(user)
    } catch(err) {
        res.send('An error occurred')
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.userId
        const { firstName, lastName, occupation } = req.body
        const updatedUser = usersServices.updateUser(userId, { firstName, lastName, occupation })

        const status = updatedUser === null ? 204 : 200

        res.status(status).send(updatedUser)
    } catch(err) {
        res.send('An error occurred')
    }
}

module.exports = { getUser, changeBuildingPresence, updateUser }