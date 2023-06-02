// console.log("controllers index.js")
const userControllers = require('./users');
const folderControllers = require('./folders');
const authControllers = require('./oauth');
module.exports = Object.freeze({
    userControllers,
    folderControllers,
    authControllers,
});