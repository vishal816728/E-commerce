const mongoose=require('mongoose')
const { isEmail }=require('validator')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate:[isEmail,"Invalid Email."],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required."]
    },
    Address1:{
        type:String,
        default:'NA'
    },
    Phone:{
        type:Number,
        default:123456789
    },
    role:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Users',UserSchema)