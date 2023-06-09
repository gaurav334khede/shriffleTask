const express=require('express');
const router=express.Router();
const fs=require('fs-extra');
const zlib=require('zlib'); 
const gzip=zlib.createGzip();
    
const path=require('path');
const multer=require('multer');

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


const uploadPath = path.join(__dirname, 'fu/');
fs.ensureDir(uploadPath);
router.post('/uploadBase64',upload,async function(req,res){
    console.log(req.file," is the file");
    
    var base64str = await base64_encode(req.file.path);
    function base64_encode(file) {
        return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
    }
    
    const inp=fs.createReadStream(base64str);
    const out =fs.createWriteStream(path.join(uploadPath, String(fieldname)+"-"+Date.now()+".gz"));
    return inp.pipe(gzip).pipe(out);
})


module.exports=router;
