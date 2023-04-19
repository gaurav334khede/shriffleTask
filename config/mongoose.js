
const mongoose=require('mongoose');
const Grid=require('gridfs-stream');
mongoose.connect('mongodb+srv://gauravk:MyfzZzBs88ApcbCP@cluster0.rbfwtnn.mongodb.net/shriffleTask?retryWrites=true');
 let gridBucket;
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to database"));
db.once('open',()=>{
    var gfs=Grid(db,mongoose.mongo);
    gfs.collection('uploads');
    
    console.log("Connection with mongodb is successfull");
})

module.exports=db;