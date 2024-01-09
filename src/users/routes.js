const express = require('express')

const { getUser, addUser, changeBuildingPresence, updateUser } = require('./controllers')

const router = express.Router()

router.get('/:userId', getUser)

router.post('/', addUser)

router.patch('/:userId', changeBuildingPresence)

router.put('/change-building/:userId', changeBuildingPresence)

router.put('/:userId', updateUser)

module.exports = router