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
    pool.query('SELECT * FROM your_table', (error, _) => {
		if (error) {
			throw error
		}
  })
}

async function updateUser(userId, { firstName, lastName, occupation }) {
    pool.query('SELECT * FROM your_table', (error, updatedUser) => {
        if (error) {
          	throw error
        }
        return updatedUser
    })
}

module.exports = { getUser, changeBuildingPresence, updateUser }