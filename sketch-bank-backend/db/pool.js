const { Pool } = require('pg');
const dotenv = require('dotenv').config({ path: '../../.env'});

module.exports = new Pool({
    host: process.env.DB_URL,
    user: process.env.ROLE_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    post: process.env.DB_PORT,
});