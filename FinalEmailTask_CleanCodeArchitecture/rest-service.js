const express = require('express')
const controllers = require('./controllers')
// const app = express()
const router = express.Router();
function init(){
    initUserRoutes();
    initEmailFolderRoutes();
}

function initUserRoutes() {
    router.post('/users',controllers.userControllers.createCreateuserController);
    // router.get('/users',);
    // router.get('/users/:id',);
    // router.put('/users/:id',);
    // router.delete('/users/:id',);
}

function initEmailFolderRoutes(){}

init();

module.exports = router;