// console.log("use case index.js")
const users = require('./users');
const folders = require('./folders');
const emails=require('./emails')
const attachments=require('./attachments')
const junction=require('./junction')
module.exports = Object.freeze({
    users,
    folders,
    emails,
    attachments,
    junction,
})