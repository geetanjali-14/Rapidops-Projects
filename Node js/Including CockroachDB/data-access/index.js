// console.log("data access index.js")
const makeUserDbMethods = require('./user')
const makeFolderDbMethods = require('./folder')
const makeEmailDbMethods=require('./email')
const makeAttachmentsDbMethods=require('./attachments')
const makeEmailFolderJunctionDbMethods=require('./email-folder_junction.js')
const makeRecipientsDbMethods=require('./recipients')
const { Client } = require('pg');
// const fs = require('fs');

const sslOptions = {
  rejectUnauthorized: false,
};

const connection = new Client({
  user: 'gita',
  host: '127.0.0.1',
  database: 'email_client',
  password: 'geeta',
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
const emails=makeEmailDbMethods({connection});
const attachements=makeAttachmentsDbMethods({connection});
const recipients=makeRecipientsDbMethods({connection});
const email_folder_junction=makeEmailFolderJunctionDbMethods({connection});
const dbMethods = {
    users,
    folders,
    emails,
    attachements,
    email_folder_junction,
    recipients,
}
module.exports = dbMethods;
