
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://gauravk:MyfzZzBs88ApcbCP@cluster0.rbfwtnn.mongodb.net/shriffleTask?retryWrites=true');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to database"));
db.once('open',function(){
    console.log("Connection with mongodb is successfull");
})
module.exports=db;