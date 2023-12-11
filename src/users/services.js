const pool = require('../../db')

async function getUser(userId) {
    const user = await pool.query(`
        SELECT user_id, first_name, last_name, image_url, occupation, created_at, in_building_since
        FROM users
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

async function updateUser(userId, { firstName, lastName, occupation }) {
    await pool.query(`
        UPDATE users
        SET first_name = $2, last_name = $3, occupation = $4
        WHERE user_id = $1;    
    `, [userId, firstName, lastName, occupation])
}

module.exports = { getUser, changeBuildingPresence, updateUser }