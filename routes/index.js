const express=require('express');
const fs=require('fs');
const multer=require('multer');
const Image=require('../models/imageSchema');
const router=express.Router();

router.get('/',function(req,res){
    // console.log('File',req.body);
    return res.render('home',{
        filePath:'',
        base64str:'',
        newImage:''
    });
})
const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads");
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".jpg");
        }
    })
}).single("user_file");
router.post('/uploadFile',upload,async function(req,res){
    // let fileBase64=new Promise((resolve,reject)=>{
    //     const fileReader=new FileReader();
    //     fileReader.readAsDataURL(req.body.file);
    //     fileReader.onload=()=>{
    //         resolve(fileReader.result);
    //     }
    //     fileReader.onerror=(error)=>{
    //         reject(error);
    //     }
    // })
    
    console.log("req files",req.file);
    let data=req.file;
    var base64str = await base64_encode(req.file.path);
    let newImage=await Image.create({
        image:base64str
    })
    console.log(newImage," is the newImage");
    
    function base64_encode(file) {
        return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
    }
    return res.render('home',{
        base64str,
        filePath:'',
        newImage
    });
})
router.use('/busboy',require('./busboy'));
router.use('/base64Input',require('./base64Input'));
module.exports=router;