const makeCompanyDbMethods = require('./company-db')
const config = require('../config/service-config/index');
const exceptions=require('../exceptions')
const { Client } = require('pg');
  const connection = new Client({
    host: config.development.host,
    user: config.development.username,
    password: config.development.password,
    database: config.development.database,
    port: config.development.port,
    ssl:config.development.dialectOptions.ssl,
  });
  
  connection.connect()
    .then(() => {
      console.log('Connected to CockroachDB database');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  
const DatabaseError=exceptions.DatabaseError; 

const companyDB = makeCompanyDbMethods({connection,DatabaseError});
const dbMethods = {
    companyDB
}
module.exports = dbMethods;