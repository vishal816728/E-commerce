const mongoose=require('mongoose')

async function Init(uri){
    try{
        if(uri){
             let connection=await mongoose.connect(uri)
             if(connection){
                console.log('DataBase is connected')
             }else {
                console.log("Unable to connect to DataBase");
              }
        }else{
            console.log("please pass a uri to connect to DB")
        }
    }catch(e){
        console.log("Internal Error - Database is not connected")
        console.log(e)
    }
}

module.exports=Init