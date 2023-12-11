const client = require('../../db')

async function getOccupations() {
    const occupations = await client.query('SELECT occupation_id, name FROM occupations;')
    return occupations.rows
}

module.exports = { getOccupations }