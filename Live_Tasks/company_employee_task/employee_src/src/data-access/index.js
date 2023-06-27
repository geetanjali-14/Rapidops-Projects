const makeEmployeeDbMethods = require('./employee')
const makeAccessTokenDbMethods=require('./access-token');
const makeRolesDbMethods=require('./roles')
const makeEmployeeRolesDbMethods=require('./employee-role')
const { Client } = require('pg');

const config = require('../config/service-config/index');
const exceptions=require('../exceptions')

let connection =new Client({
    host: config.serviceConfig.development.host,
    user: config.serviceConfig.development.username,
    password: config.serviceConfig.development.password,
    database: config.serviceConfig.development.database,
    port: config.serviceConfig.development.port,
    ssl:config.serviceConfig.development.dialectOptions.ssl,
})

connection.connect()
    .then(() => {
      console.log('Connected to CockroachDB database');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

const DatabaseError=exceptions.DatabaseError;

const employeeDB = makeEmployeeDbMethods({connection,DatabaseError});
const accessTokensDB=makeAccessTokenDbMethods({connection,DatabaseError})
const rolesDB=makeRolesDbMethods({connection,DatabaseError})
const employeeRolesDB=makeEmployeeRolesDbMethods({connection,DatabaseError})
const dbMethods = {
    employeeDB,
    accessTokensDB,
    rolesDB,
    employeeRolesDB
}
module.exports = dbMethods;