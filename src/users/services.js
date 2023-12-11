const pool = require('../../db')

async function getUser(userId) {
    const user = await pool.query(`
        SELECT user_id, first_name, last_name, image_url, occupations.name AS occupation, created_at, in_building_since
        FROM users
        INNER JOIN occupations
            ON users.occupation_id = occupations.occupation_id
        WHERE user_id = $1;
    `, [userId])
    return user.rows[0]
}

async function changeBuildingPresence(userId, { buildingId, date }) {
    await pool.query(`
        UPDATE users
        SET building_id = $2, in_building_since = $3
        WHERE user_id = $1;    
    `, [userId, buildingId, date])
}

async function updateUser(userId, { firstName, lastName, occupationId }) {
    await pool.query(`
        UPDATE users
        SET first_name = $2, last_name = $3, occupation_id = $4
        WHERE user_id = $1;    
    `, [userId, firstName, lastName, occupationId])
}

module.exports = { getUser, changeBuildingPresence, updateUser }