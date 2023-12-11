const pool = require('../../db')

async function getOccupations() {
    const occupations = await pool.query('SELECT occupation_id, name FROM occupations;')
    return occupations.rows
}

module.exports = { getOccupations }