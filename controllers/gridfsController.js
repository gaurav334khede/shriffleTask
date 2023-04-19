module.exports.gridfsUpload=function(req,res){
    return res.json({
        file:req.file
    })
}