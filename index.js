const express=require('express');
const cors=require('cors');
const app=express();
const db=require('./config/mongoose');
const port=8000;
app.use(cors());
app.use(express.urlencoded());
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(){
    console.log("Server is up and running on port",port);
})