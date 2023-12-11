const client = require('./db')

async function deleteTables() {
    await client.query('DROP TABLE IF EXISTS users;')
    await client.query('DROP TABLE IF EXISTS occupations;')
    await client.query('DROP TABLE IF EXISTS buildings;')
}

async function createTables() {
    await client.query(`
        CREATE TABLE IF NOT EXISTS buildings (
            building_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            longitude DECIMAL NOT NULL,
            latitude DECIMAL NOT NULL,
            type VARCHAR(50) NOT NULL
        );
    `)

    await client.query(`
        CREATE TABLE IF NOT EXISTS occupations (
            occupation_id SERIAL PRIMARY KEY,
            name VARCHAR(50)
        );
    `)

    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            occupation VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            in_building_since TIMESTAMP,
            building_id INTEGER REFERENCES buildings(building_id)
        );
    `)
}

async function populateTables() {
    await client.query(`
        INSERT INTO buildings (name, longitude, latitude, type)
        VALUES 
            ('L''ABC Belfort', -74.0059, 40.7128, 'bar'),
            ('Beautiful', -73.9851, 40.7488, 'restaurant'),
            ('The paradise', -73.122, 40.32, 'bar');
    `)

    await client.query(`
        INSERT INTO occupations (name)
        VALUES 
            ('barmaid'),
            ('developer'),
            ('designer'),
            ('manager'),
            ('engineer'),
            ('chef'),
            ('teacher'),
            ('doctor'),
            ('artist');
    `)

    await client.query(`
        INSERT INTO users (first_name, last_name, image_url, occupation, created_at, in_building_since, building_id)
        VALUES
            ('Alice', 'DEFAME', 'http://localhost:3000/images/alice.jpeg', 1, '2023-01-01 12:00:00', NULL, 1),
            ('Bob', 'SMITH', 'http://localhost:3000/images/bob.jpeg', 2, '2023-02-15 08:30:00', '2023-02-15 09:00:00', 2),
            ('Charlie', 'JOHNSON', 'http://localhost:3000/images/charlie.png', 3, '2023-03-20 10:45:00', '2023-03-20 11:30:00', 3),
            ('David', 'WILLIAMS', 'http://localhost:3000/images/david.jpeg', 4, '2023-04-10 14:20:00', NULL, NULL),
            ('Eva', 'MILLER', 'http://localhost:3000/images/eva.jpeg', 5, '2023-05-05 16:00:00', '2023-05-05 17:30:00', 1),
            ('Frank', 'BROWN', 'http://localhost:3000/images/frank.png', 6, '2023-06-12 09:30:00', NULL, NULL),
            ('Grace', 'DAVIS', 'http://localhost:3000/images/grace.jpeg', 7, '2023-07-08 13:45:00', '2023-07-08 14:15:00', 2),
            ('Henry', 'ANDERSON', 'http://localhost:3000/images/henry.png', 8, '2023-08-25 11:00:00', NULL, NULL),
            ('Ivy', 'THOMAS', 'http://localhost:3000/images/ivy.png', 9, '2023-09-18 18:00:00', '2023-09-18 18:45:00', 3),
            ('Eliot', 'BIANCHI', 'http://localhost:3000/images/eliot.jpg', 2, '2023-09-18 18:00:00', NULL, NULL);
    `)
}

async function main() {
    try {
        await client.connect()
        await deleteTables()
        await createTables()
        await populateTables()
        console.log('Database instantiation successful')
    } catch (err) {
        console.error(`Database instantiation unsuccessful | ${err.message}`)
    } finally {
        await client.end()
    }
}
main()