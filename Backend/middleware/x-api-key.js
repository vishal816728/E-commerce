const bcrypt=require('bcrypt')

function x_api_key(req,res,next){
    try{
        if(req.headers 
            && req.headers.x_api_key!=="" 
            || req.headers.x_api_key!==undefined
            || req.headers.x_api_key!==null){
            var x="secret-api-key"
            var enckey=bcrypt.hashSync(x,10)
            console.log(enckey)
            const decrypt= bcrypt.compareSync(req.headers.x_api_key,enckey)
            console.log(decrypt) 
                   if(decrypt){
                    next()
                   }
        }else{
            return res.send('Not Authorized to Access this Api')
        }
    }catch(err){
        console.log("Something Went Wrong in X_api_key")
        return res.send({result:false,msg:'Not Authorized. Might be Api key is missing'})
    }


}

module.exports=x_api_key