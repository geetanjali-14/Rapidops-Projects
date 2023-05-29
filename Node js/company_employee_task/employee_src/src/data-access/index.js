const makeEmployeeDbMethods = require('./employee_db')
const mysql= require('mysql2');
const config = require('../../config/backend-config/config.json');

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
const dbMethods = {
    employeeDB,
}
module.exports = dbMethods;