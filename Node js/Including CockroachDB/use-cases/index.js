// console.log("use case index.js")
const users = require('./users');
const folders = require('./folders');
const emails=require('./emails')
module.exports = Object.freeze({
    users,
    folders,
    emails,
})