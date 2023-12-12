const client = require('../../db')

async function getUser(userId) {
    const user = await client.query(`
        SELECT user_id, first_name, last_name, image_url, occupations.name AS occupation, users.occupation_id,
            created_at, in_building_since, building_id
        FROM users
        INNER JOIN occupations
            ON users.occupation_id = occupations.occupation_id
        WHERE user_id = $1;
    `, [userId])
    return user.rows[0]
}

async function changeBuildingPresence(userId, { buildingId }) {
    await client.query(`
        UPDATE users
        SET building_id = $2, in_building_since = CURRENT_TIMESTAMP
        WHERE user_id = $1;    
    `, [userId, buildingId])
}

async function updateUser(userId, { firstName, lastName, occupationId }) {
    await client.query(`
        UPDATE users
        SET first_name = $2, last_name = $3, occupation_id = $4
        WHERE user_id = $1;    
    `, [userId, firstName, lastName, occupationId])

    const updatedUser = await client.query(`
        SELECT user_id, first_name, last_name, image_url, occupations.name AS occupation, users.occupation_id,
            created_at, in_building_since, building_id
        FROM users
        INNER JOIN occupations
            ON users.occupation_id = occupations.occupation_id
        WHERE user_id = $1;
    `, [userId])
    return updatedUser.rows[0]
}

module.exports = { getUser, changeBuildingPresence, updateUser }