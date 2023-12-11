const express = require('express')

const { getOccupations } = require('./controllers')

const router = express.Router()

router.get('/', getOccupations)

module.exports = router