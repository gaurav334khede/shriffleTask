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
        file.pipe(fstream);
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            res.render('home',{
                filePath
            });
        });
    })
})

module.exports=router;