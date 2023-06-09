const makeEmployeeDbMethods = require('./employee_db')
const makeAccessTokenDbMethods=require('./access_token');
const mysql= require('mysql2');
const config = require('../../src/config/service-config/index');

let connection = mysql.createConnection({
    host: config.development.host,
    user: config.development.username,
    password: config.development.password,
    database: config.development.database
})

connection.connect((err)=>{
    if(err)
    {
        console.log('Error connecting to MySQL database: '+err)
    }
    else
    {
        console.log('Connected to employee database')
    }
});
connection = connection.promise();

const employeeDB = makeEmployeeDbMethods({connection});
const accessTokensDB=makeAccessTokenDbMethods({connection})
const dbMethods = {
    employeeDB,
    accessTokensDB
}
module.exports = dbMethods;