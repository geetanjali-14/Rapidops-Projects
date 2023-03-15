const express = require('express');
const ejs=require('ejs');
const app=express();
const port=6040;
// const parser = require("body-parser");
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs");
const mysql = require('mysql2');


//Connecting database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'geetanjali@localhost',
  password: 'Geetanjali-14',
  database: 'migration_db'
});

function connectToMySQL(connection) {
    return new Promise((resolve, reject) => {
      connection.connect((error, rows) => {
        if (error) {
          reject(new Error('Error connecting to MySQL database: ' + error.stack));
          return;
        }
        resolve('Connected to MySQL database with connection ID ' + connection.threadId);
      });
    });
  }
connectToMySQL(connection);
  
app.get("/addUser",(req,res)=>
{
    res.render("add_new_user");
})
app.post("/addUser",(req,res)=>{ 
    Name=req.body.name;
    Email=req.body.email;
    password=req.body.password;
    if(!Name|| !Email|| !password)
    {
        res.send("Enter required details.")
        return;
    }
    connection.query(`INSERT INTO Users (name,email,password) VALUES (?,?,?)`, [Name,Email,password],(err,rows)=>
    {
    if (err) {
        return res.send('Error:Entered E-mail already exists.'); }
    else{
        createFolder(rows.insertId);
        res.redirect("/showUser");
        }
    })
});

function createFolder(id)
{
    const Folders = [{ name: 'inbox', id},{ name: 'sent', id  },{ name: 'archived', id},{ name: 'outbox', id },{ name: 'trash', id}];
    const folderValues = Folders.map((folder) => [folder.name, folder.id]);
    connection.query(`INSERT INTO Folder (name,user_id) VALUES ?`, [folderValues],(err,rows)=>
    {
    if (err) {
        //   console.error('Error in inserting folders ' + err.stack);
          return res.status(201).send('Error:cannot Create folder.');
        }
    else{
        console.log('Data Inserted');
        //res.redirect('/usersFolders');
        }
    })
}

//Displaying Users
app.get("/showUser",(req,res)=>
{
    connection.query(
        `select * from Users;`,
        (err,rows)=>{
            if(err)
            throw(err);
            else{
                res.render('show_User',{Users:rows});}
        })
})

//Adding new Folder
app.get("/add_new_folder",(req,res)=>
{
    res.render("add_new_folder");
})
app.post("/add_new_folder",(req,res)=>{
    folderName=req.body.new_folder;
    let  id=9;
    folderName=folderName.toLowerCase()
    let i=0;
    connection.query(`select * from Folder`,(err,rows)=>
    {
    if (err) {
        throw(err);
        }
    else{
        for(i=0;i<rows.length;i++)
        {
            if(rows[i].name==folderName)
            {
                res.send("Folder name exists already");
                return;
            }
        }}
        // console.log(i);
    connection.query(`insert into Folder (name,user_id) values ('${folderName}','${id}');`,(err,rows)=>
        {
        if (err) {
            console.error('Error in inserting new folder' + err.stack);
            return res.status(404).send('Error in inserting new folder');;
            }
            else
            {
                res.redirect('/usersFolders');
            }
        })
        return;
    })
});

//Displaying Folders
app.get("/usersFolders",(req,res)=>{
    connection.query(`select * from Folder`,(err,rows)=>
    {
    if (err) {
          throw(err);
        }
    else{
        res.render('usersFolders',{Folder:rows});
        }
    })
});

//Updating 
app.get("/editFolder/:folder_id",(req,res)=>{
  let id=req.params.folder_id;
  connection.query(
      `select * from Folder where folder_id=${id};`,
      (err,rows)=>{
          if(err)
          throw(err);
          else{
              res.render('updateFolder',{Folder:rows});
          }
      }
  )
})

app.post('/updateFolder/:folder_id',(req,res)=>{
  let folder_new_name=req.body.folder_name;
  folder_new_name=folder_new_name.toLowerCase()
  let id=req.params.folder_id;
  console.log(id);
  connection.query(`select * from Folder`,(err,rows)=>
    {
    if (err) {
        throw(err);
        }
    else{
        for(i=0;i<rows.length;i++)
        {
            if(rows[i].name==folder_new_name)
            {
                res.status(201).send("Folder name exists already");
                return;
            }
        }}
        console.log(i);
    connection.query(
      `update Folder set name ='${folder_new_name}' where folder_id=${id}` ,
      (err)=>{
          if(err)
          throw(err);
          else{
            res.redirect('/usersFolders')
            }
      })
      return;
    })
})


//Deletion of Folder
app.get("/deleteFolder/:folder_id",(req,res)=>{

    let Folder_ID=req.params.folder_id;
    console.log(req.params.folder_id);
    connection.query(
    `DELETE FROM Folder where folder_id=${Folder_ID};`,
    function(err,result,field){
        if(err)
        throw(err);
        else
        res.redirect('/usersFolders')
      })
    })

//Deleting User
app.get("/deleteUser/:user_id",(req,res)=>{
   let User_ID=req.params.user_id;
   connection.query(
   `DELETE FROM Users where user_id=${User_ID};`,
   function(err,result,field){
       if(err)
       console.log(err);
       else
       res.redirect('/showUser')
     })
   })
  

//Updating User   
   app.get("/editUser/:user_id",(req,res)=>{
    let id=req.params.user_id;
    connection.query(
        `select * from Users where user_id=${id};`,
        (err,rows)=>{
            if(err)
            throw(err);
            else{
                res.render('update_user',{Users:rows});
            }
        }
    )
  })
  app.post('/updateUser/:user_id',(req,res)=>{
    let new_name=req.body.name;
    let id=req.params.user_id;
    // console.log(id);
    connection.query(
        `update Users set name ='${new_name}' where user_id=${id}` ,
        (err)=>{
            if(err)
            throw(err);
            else{
                res.redirect('/showUser')
              }
        })
        return;
      })

app.listen(port,(err)=>
{
  console.log(`Listening at http://localhost:${port}/showUser`)
})