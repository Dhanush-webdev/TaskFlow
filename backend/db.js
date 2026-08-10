const Pool = require("pg").Pool
const pool = new Pool({
    user: 'postgres',
    password: 'Shadow17',
    database: 'taskflow',
    host: 'localhost',
    port: 5432
});
module.exports = pool;