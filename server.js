const express = require('express')
const cors = require('cors')
require('dotenv').config()

const client = require('./db')

const buildingsRoutes = require('./src/buildings/routes')
const occupationsRoutes = require('./src/occupations/routes')
const usersRoutes = require('./src/users/routes')

const app = express()

const corsOptions = { methods: ['GET', 'POST', 'PUT', 'PATCH'] }
  
app.use(cors(corsOptions))

app.use(express.static(`${__dirname}/static`))
app.use(express.json())

app.use('/buildings', buildingsRoutes)
app.use('/occupations', occupationsRoutes)
app.use('/users', usersRoutes)

const PORT = process.env.SERVER_PORT

app.listen(PORT, async() => {
    console.log(`Listen on port ${PORT}`)
    await client.connect()
    console.log('Connected to PostgreSQL database')
})