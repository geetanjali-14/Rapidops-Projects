// console.log("data access index.js")
const makeUserDbMethods = require('./user')
const makeFolderDbMethods = require('./folder')

const mysql= require('mysql2');
let connection = mysql.createConnection({
    host:"localhost",
    user:"geetanjali@localhost",
    password:"Geetanjali-14",
    database:"migration_db"
})

connection.connect((err)=>{
    if(err)
    {
        console.log('Error connecting to MySQL database: '+err)
    }
    else
    {
        console.log('Connected to MySQL database')
    }
});
connection = connection.promise();

const users = makeUserDbMethods({connection});
const folders = makeFolderDbMethods({connection});
const dbMethods = {
    users,
    folders,
}
module.exports = dbMethods;
