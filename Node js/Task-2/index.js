const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const parser = require("body-parser");
const fs = require("fs");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
app.use(express.static(path.join(__dirname,'static')))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("form");
});

// app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
      { id: 'name', title: 'Name' },
      { id: 'dob', title: 'Date_of_Birth' }
    ],
    append: true,
  });

  const data = [{
    "name": req.body.name,
    "dob":req.body.dob
  }];
  csvWriter.writeRecords(data)
    .then(() => {
      res.send('Form data saved to CSV file!');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('An error occurred while saving form data to CSV file!');
    });
  });

app.get('/Displaydata',(req,res)=>
{
    fs.readFile('data.csv', 'utf8', (err,data) => {
        if (err) {
          console.error(err);
          return;
        } 
        res.render('Displaydata',{'data':data});
      });
})
app.get('/download',function(req,res)
{
  // const file=`${__dirname}/data.txt`;
  // res.download(file);
  const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
      { id: 'name', title: 'Name' },
      { id: 'dob', title: 'Date_of_Birth' }
    ]
  });
 
      const file = `${__dirname}/data.csv`;
      const filename = 'data.csv';

      res.setHeader('Content-disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-type', 'text/csv');

      const filestream = fs.createReadStream(file);
      filestream.pipe(res);

})
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
