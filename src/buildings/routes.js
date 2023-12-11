const express = require('express')

const { getBuildings, getPeopleInBuilding } = require('./controllers')

const router = express.Router()

router.get('/', getBuildings)

router.get('/:buildingId', getPeopleInBuilding)

module.exports = router