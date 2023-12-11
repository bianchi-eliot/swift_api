const pool = require('../../db')

async function getBuildings() {
    const buildings = await pool.query(`
        SELECT building_id, name, longitude, latitude, type
        FROM buildings;
    `)
    return buildings.rows
}

async function getPeopleInBuilding(buildingId) {
    const peopleInBuilding = await pool.query(`
        SELECT user_id, first_name, last_name, in_building_since
        FROM users
        WHERE building_id = $1;
    `, [buildingId])
    return peopleInBuilding.rows
}

module.exports = { getBuildings, getPeopleInBuilding }