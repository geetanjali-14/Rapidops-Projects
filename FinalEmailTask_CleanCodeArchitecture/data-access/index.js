const makeUserDbMethods = require('./user-db-actions')

const mysql2 = require('mysql2');

 let connection = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"cleancode"
})

connection.connect((err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("connected")
    }
});
connection = connection.promise();

const users = makeUserDbMethods({connection});

const dbMethods = {
    users
}

module.exports = dbMethods;
