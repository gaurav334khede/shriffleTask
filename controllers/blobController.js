
module.exports.blob=function(req,res){
    
    console.log(req.file);
    console.log(url1," accessed via controller")
    // const url=URL.createObjectURL(req.file);
    // console.log(url,"is the url of file");

    return res.redirect('back');
}
module.exports.blobForm=function(req,res){
    return res.render('blobExample');
}