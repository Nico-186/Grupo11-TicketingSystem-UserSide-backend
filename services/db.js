const mysql = require('mysql2');
const config = require('../config');

function createPool() {
  try{
    const pool = mysql.createPool(config.db);
    const promisePool = pool.promise();
    return promisePool;
  } catch (err) {
    return console.log("Error al conectar\n",err)
  }
}

const pool = createPool();

module.exports = {
  connection: async () => pool.getConnection(),
  execute: (...params) => pool.execute(...params)
}