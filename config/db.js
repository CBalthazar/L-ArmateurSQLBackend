import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.HOST,
  database: process.env.DB,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

export default pool;
