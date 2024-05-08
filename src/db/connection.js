const pg = require('pg');

const pool1 = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testgis',
    password: '306090',
    port: 5432
});

const pool2 = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testgis',
    password: '306090',
    port: 5432
});
module.exports = {
    query1: (text, params) => pool1.query(text, params),
    query2: (text, params) => pool2.query(text, params)
};