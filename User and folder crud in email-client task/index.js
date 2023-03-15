const express = require('express');
const ejs=require('ejs');
const app=express();
const port=6030;
// const parser = require("body-parser");
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs");
const mysql = require('mysql2');


//Connecting database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'geetanjali@localhost',
  password: 'Geetanjali-14',
  database: 'crudOnFolders'
});

connection.connect((error,rows) => {
    if (error) {
      console.error('Error connecting to MySQL database: ' + error.stack);
      return;
    }
    console.log('Connected to MySQL database with connection ID ' + connection.threadId);
  });

  const userId = 1; //User_id of newly added user
  const Folders = [
    { name: 'Inbox', userId},
    { name: 'Sent', userId  },
    { name: 'Archived', userId},
    { name: 'Outbox', userId },
    { name: 'Trash', userId},
  ];
  const folderValues = Folders.map((folder) => [folder.userId, folder.name]);
console.log(folderValues)
app.get('/',(req,res)=>
{
    connection.query(`INSERT INTO folders (user_Id, folder_name) VALUES ?`, [folderValues],(err,rows)=>
    {
    if (err) {
          console.error('Error in inserting folders ' + err.stack);
          return res.send('Error');
        }
    else{
        res.render('usersFolder',{folders:rows});
        }
    })

    connection.query(`INSERT INTO folders (user_Id, folder_name)
    VALUES ('${userId}','${folderName}')`,(err,rows)=>
    {
    if (err) {
          console.error('Error in inserting new folder' + err.stack);
          return res.send('Error');
        }
    else{
        res.render('usersFolder',{folders});
        }
    })
});

//Updating 
app.get("/edit/:folder_id",(req,res)=>{
  let id=req.params.folder_id;
  connection.query(
      `select * from folders where folder_id=${id};`,
      (err,rows)=>{
          if(err)
          throw(err);
          else{
              res.render('updateFolder',{folders:rows});
          }
      }
  )
})

app.post('/update/:folder_id',(req,res)=>{
  let folder_new_name=req.body.folder_name;
  let id=req.params.folder_id;
  console.log(id);
  connection.query(
      `update folders set folder_name ='${folder_new_name}' where folder_id=${id}` ,
      (err)=>{
          if(err)
          throw(err);
      }
  )

  connection.query(`select * from folders`,(err,rows)=>{
      if(err)
      throw(err);
      else{
          res.render('usersFolder', { folders:rows });
          console.log(req.params.id);
      }
    });
})
//Deletion of Folder
app.get("/delete/:folder_id",(req,res)=>{

    let Folder_ID=req.params.folder_id;
    console.log(req.params.folder_id);
    connection.query(
    `DELETE FROM folders where folder_id=${Folder_ID};`,
    function(err,result,field){
        console.log(err);
      })
       res.send(`${folders[`${Folder_ID-1}`].name} Folder deleted`);
  })

app.listen(port,(err)=>
{
  console.log(`Listening at http://localhost:${port}/usersFolder`)
})