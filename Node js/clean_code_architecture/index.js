// console.log("Main Index.js")
const express = require('express');
const app = express();
const router = require('./rest-service')
const port=8000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/', router);

app.listen(port,(err)=>
{
  console.log(`App listening at http://localhost:${port}/users`)
})