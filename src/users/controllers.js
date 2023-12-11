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
        await usersServices.changeBuildingPresence(userId, { buildingId, date })

        res.sendStatus(204)
    } catch(err) {
        res.send('An error occurred')
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.userId
        const { firstName, lastName, occupationId } = req.body
        await usersServices.updateUser(userId, { firstName, lastName, occupationId })

        res.sendStatus(204)
    } catch(err) {
        console.log(err.message)
        res.send('An error occurred')
    }
}

module.exports = { getUser, changeBuildingPresence, updateUser }