// console.log("controllers index.js")
const userControllers = require('./users');
const folderControllers = require('./folders');

module.exports = Object.freeze({
    userControllers,
    folderControllers,
});