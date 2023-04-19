
const mongoose=require('mongoose');
const Grid=require('gridfs-stream')
const db=require('../config/mongoose');


module.exports.gridfsUpload=function(req,res){
    return res.json({
        file:req.file
    })
}
module.exports.findFile=async function(req,res){
    console.log(req.params.filename," Is the requested File Name");
    var gfs=Grid(db,mongoose.mongo);
    // let file=await db.fs.files.find({});
    // console.log(file," is file found")
    gridBucket=new mongoose.mongo.GridFSBucket(db,{
        bucketName:"uploads"
    });
    let allFiles=await gridBucket.find({}).toArray((err,result)=>{
        if(err){
            res.send(new ErrResponse(400,error.message));
        }else{
            if(!result || result.length==0){
                return res.send(new ErrResponse(201,"File doenot exists"));
            }else{
                return gridBucket.createReadStream(req.params.filename).pipe(res)
            }
        }
    });
    console.log(allFiles," is all files");
    return;
}