// // console.log("data access index.js")
// const makeUserDbMethods = require('./user')
// const makeFolderDbMethods = require('./folder')

// const mysql= require('mysql2');
// let connection = mysql.createConnection({
//     host:"localhost",
//     user:"geetanjali@localhost",
//     password:"Geetanjali-14",
//     database:"migration_db"
// })

// connection.connect((err)=>{
//     if(err)
//     {
//         console.log('Error connecting to MySQL database: '+err)
//     }
//     else
//     {
//         console.log('Connected to MySQL database')
//     }
// });
// connection = connection.promise();

// const users = makeUserDbMethods({connection});
// const folders = makeFolderDbMethods({connection});
// const dbMethods = {
//     users,
//     folders,
// }
// module.exports = dbMethods;

// console.log("data access index.js")
const makeUserDbMethods = require('./user')
const makeFolderDbMethods = require('./folder')

// const mysql= require('mysql2');
const { Client } = require('pg');
const fs = require('fs');

const sslOptions = {
  rejectUnauthorized: false,
};

const connection = new Client({
  user: 'geetu',
  host: '127.0.0.1',
  database: 'email_client',
  password: 'geetu',
  port: 26257,
  ssl: sslOptions,
});

connection.connect()
  .then(() => {
    console.log('Connected to CockroachDB database');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const users = makeUserDbMethods({connection});
const folders = makeFolderDbMethods({connection});
const dbMethods = {
    users,
    folders,
}
module.exports = dbMethods;
