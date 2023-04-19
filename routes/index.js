const express=require('express');
const bodyParser=require('body-parser');
const fs=require('fs');
const multer=require('multer');
const Image=require('../models/imageSchema');
const gridfsController=require('../controllers/gridfsController');
const blobController=require('../controllers/blobController');
const GridFsStorage=require('multer-gridfs-storage').GridFsStorage;
const Grid=require('gridfs-stream');
const path=require('path');
const crypto=require('crypto');
const methodOverride=require('method-override');

const router=express.Router();
router.use(bodyParser.json());
router.get('/',function(req,res){
    // console.log('File',req.body);
    return res.render('home',{
        filePath:'',
        base64str:'',
        newImage:'',
        object:''
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
    const base64Decode = Buffer.from(newImage.image, "base64");
    console.log(base64Decode," is the newImage");
    
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
router.get('/blobForm',blobController.blobForm);
router.post('/blob',upload,blobController.blob);

const storage = new GridFsStorage({
    url: 'mongodb+srv://gauravk:MyfzZzBs88ApcbCP@cluster0.rbfwtnn.mongodb.net/shriffleTask?retryWrites=true',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const uploadFile = multer({ storage });
router.post('/gridfsUpload',uploadFile.single('user_file'),gridfsController.gridfsUpload);
router.get('/image/:filename',gridfsController.findFile);
module.exports=router;