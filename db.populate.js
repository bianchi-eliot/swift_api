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
            latitude NUMERIC(16,14) NOT NULL,
            longitude NUMERIC(16,14) NOT NULL,
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
            occupation_id INTEGER NOT NULL REFERENCES occupations(occupation_id),
            created_at TIMESTAMP NOT NULL,
            in_building_since TIMESTAMP,
            building_id INTEGER REFERENCES buildings(building_id)
        );
    `)
}

async function populateTables() {
    await client.query(`
        INSERT INTO buildings (name, latitude, longitude, type)
        VALUES
            ('L''Abc', 47.63507547448226, 6.853445240250185, 'Bar'),
            ('Chamas Tacos', 47.63379647109642, 6.857076770452414, 'Fast food'),
            ('Le Lien', 47.634946290395945, 6.857412873141383, 'Restaurant'),
            ('La Marina', 47.63426020760253, 6.853959013323584, 'Restaurant & Pizzeria'),
            ('Starbucks', 47.637704303177586, 6.857407946019157, 'Coffee shop'),
            ('Brasserie l''Expo', 47.62940691514327, 6.856663081537777, 'Brewery'),
            ('Kebab du Lion', 47.63678444069653, 6.855141830862427, 'Fast food'),
            ('La Cantina by Culture Food', 47.63889569921011, 6.857639023277858, 'Restaurant'),
            ('La Belle Farinière', 47.6382242709274, 6.854514384785376, 'Restaurant'),
            ('Central Sushi', 47.63149774153292, 6.856458127321503, 'Restaurant');      
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
        INSERT INTO users (first_name, last_name, image_url, occupation_id, created_at, in_building_since, building_id)
        VALUES
            ('Alice', 'DEFAME', 'https://swift-api.nexford.fr/images/alice.jpeg', 1, '2021-01-01 12:00:00', CURRENT_TIMESTAMP, 1),
            ('Bob', 'SMITH', 'https://swift-api.nexford.fr/images/bob.jpeg', 2, '2022-02-15 08:30:00', CURRENT_TIMESTAMP - INTERVAL '2 HOUR', 2),
            ('Charlie', 'JOHNSON', 'https://swift-api.nexford.fr/images/charlie.png', 3, '2019-03-20 10:45:00', CURRENT_TIMESTAMP - INTERVAL '3 HOUR', 3),
            ('David', 'WILLIAMS', 'https://swift-api.nexford.fr/images/david.jpeg', 4, '2022-04-10 14:20:00', NULL, NULL),
            ('Eva', 'MILLER', 'https://swift-api.nexford.fr/images/eva.jpeg', 5, '2018-05-05 16:00:00', CURRENT_TIMESTAMP - INTERVAL '1 HOUR', 1),
            ('Frank', 'BROWN', 'https://swift-api.nexford.fr/images/frank.png', 6, '2019-06-12 09:30:00', NULL, NULL),
            ('Grace', 'DAVIS', 'https://swift-api.nexford.fr/images/grace.jpeg', 7, '2020-07-08 13:45:00', CURRENT_TIMESTAMP, 2),
            ('Henry', 'ANDERSON', 'https://swift-api.nexford.fr/images/henry.png', 8, '2023-08-25 11:00:00', CURRENT_TIMESTAMP - INTERVAL '1 HOUR', 5),
            ('Ivy', 'THOMAS', 'https://swift-api.nexford.fr/images/ivy.png', 9, '2021-09-18 18:00:00', CURRENT_TIMESTAMP, 3),
            ('Eliot', 'BIANCHI', 'https://swift-api.nexford.fr/images/eliot.jpg', 2, '2023-09-18 18:00:00', NULL, NULL);
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