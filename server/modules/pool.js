const pg = require('pg');
const Pool = pg.Pool;

const url = require('url');
if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
}

const pool = new Pool({
    database: params.pathname.split('/')[1],
    host: params.hostname,
    port: params.port,
    max: 10,
    idleTimeoutMillis: 30000,
    ssl: true
} || {
    database: process.env.DATABASE_NAME || 'react-calculator',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
})

pool.on('connect', () => {
    console.log('pool connected to database');
})
pool.on('error', () => {
    console.log('error connecting pool to database');
    process.exit(-1);
})

module.exports = pool;