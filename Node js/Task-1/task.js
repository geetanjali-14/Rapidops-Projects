const express=require('express');
const app=express();
app.get('/form',function(req,res)
{
    res.sendFile(__dirname+"/task.html");
});
app.get('/form-submit',function(req,res)
{
    res.send(req.query)
});
app.listen(8000);