const dotenv = require('dotenv').config({ path: '../../.env'});
const { neon } = require('@neondatabase/serverless');

module.exports = new neon(process.env.DATABASE_URL);