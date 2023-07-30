const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"Product is a Mandatory."]
    },
    price:{
        type:Number,
        required:[true,"Price is a Mandatory."]
    },
    category:{
        type:String,
        default:"All"
    },
    Rating:{
        type:Number,
        default:4
    },
    ImageUrl:{
        type:String,
        required:[true,"Image is a Mandatory."]
    }

},{
    timestamps:true
})

module.exports=mongoose.model("Products",productSchema)