const mongoose=require('mongoose');
let imageSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
let Image=mongoose.model('Image',imageSchema);
module.exports=Image;