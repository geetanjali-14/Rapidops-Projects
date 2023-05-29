const makeCompanyDbMethods = require('./company_db')
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
        console.log('Connected to company database')
    }
});
connection = connection.promise();

const companyDB = makeCompanyDbMethods({connection});
const dbMethods = {
    companyDB
}
module.exports = dbMethods;