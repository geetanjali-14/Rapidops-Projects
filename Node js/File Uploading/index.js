const express=require('express');
const app=express()
const multer =require("multer");
const path=require('path')
const fs=require('fs')
const mime=require('mime')
const port=8000;
app.set('view engine','ejs')

const data=multer.diskStorage({
    destination:(req,file,callback)=>{
    callback(null,'static')
    },
    filename:(req,file,callback)=>{
        callback(null,Date.now()+ path.extname(file.originalname))
    }
})

const upload=multer({storage:data})

app.get('/',(req,res)=>{
       res.render('uploadFile')
})
const filepath=path.join(__dirname,'static')
const Image_Files=fs.readdirSync(filepath)

app.post('/Images',upload.single('image'),(req,res)=>{
    res.render('view_image',{Image_Files})

})
app.get('/view/:id',(req,res)=>{
    let file=path.join(__dirname,'static',req.params.id);
    let filename=path.basename(file);
    let mimetype=mime.getType(file);
    res.setHeader('Content-disposition','inline; filename='+filename);
    res.setHeader('Content-type',mimetype);
    let filestream=fs.createReadStream(file);
    filestream.pipe(res)
});

app.get('/download/:id',(req,res)=>{
    let file=path.join(__dirname,'static',req.params.id);
    let filename=path.basename(file);
    let mimetype=mime.getType(file);
    res.setHeader('Content-disposition','attachment; filename='+filename);
    res.setHeader('Content-type',mimetype);
    let filestream=fs.createReadStream(file);
    filestream.pipe(res)
})
app.listen(port,()=>{
    console.log(`App listening at http://localhost/${port}`);
})
