const express=require('express');
const fs=require('fs');
const multer=require('multer');

const router=express.Router();

router.get('/',function(req,res){
    // console.log('File',req.body);
    return res.render('home',{
        filePath:'',
        base64str:''
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
    var base64str = base64_encode(req.file.path);
    console.log(base64str);
    
    function base64_encode(file) {
        return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
    }
    return res.render('home',{
        base64str,
        filePath:''
    });
})
router.use('/busboy',require('./busboy'));
module.exports=router;