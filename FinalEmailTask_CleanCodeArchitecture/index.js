const express = require('express');
const app = express();
const router = require('./rest-service')
// const controllers = require('./controllers')
// const usecases = require('./use-cases')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/', router);

app.listen(8000, ()=>{
    
})