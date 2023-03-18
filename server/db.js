const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "dritoni",
  host: "localhost",
  port: 5432,
  database: "lmao_database",
});

module.exports = pool;
