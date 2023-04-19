const express=require('express');
const cors=require('cors');

const router=express.Router();
router.use(cors());
const busboy = require('connect-busboy');
const fs=require('fs-extra');
const path=require('path');



router.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));
const uploadPath = path.join(__dirname, 'fu/');
fs.ensureDir(uploadPath);
router.post('/upload',function(req,res){
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);
        const fstream = fs.createWriteStream(path.join(uploadPath, String(fieldname)+"-"+Date.now()+".jpg"));
        let filePath=path.join(uploadPath, String(fieldname)+"-"+Date.now()+".jpg");
        filePath=filePath.split(":8000");
        console.log(filePath," is the filePath");
        file.pipe(fstream);
        fstream.on('close', () => {
            console.log(Object.keys(file)+" : ",Object.values(file));
            console.log(`Upload of '${file}' finished`);
            res.render('home',{
                filePath,
                newImage:'',
                base64str:''
            });
        });
    })
})

module.exports=router;