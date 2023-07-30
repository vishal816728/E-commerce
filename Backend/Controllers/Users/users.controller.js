const Controller=require("../../Utils/Controller")
const userModel=require('../../Models/user.model')
const {isLength,isEmail}=require('validator')
const CreateToken = require("../../Utils/jwt.create")
const bcrypt=require('bcrypt')
const { INTERNAL_ERROR, SOMETHING_WENT_WRONG, NO_RECORD_FOUND } = require("../../constants/msg")

class Users extends Controller{
    constructor(){
        super()
        this.registerUser=this.registerUser.bind(this)
        this.LoginUser=this.LoginUser.bind(this)
        this.getAllUser=this.getAllUser.bind(this)
        this.DeleteUser=this.DeleteUser.bind(this)
    }
    async registerUser(req,res){
        const {username,email,password,phone,Address1}=req.body
        if(username=="" || username==undefined || username==null){
            return res.send({result:false,message:"Invalid Username"})
        }
        if(email=="" || email==undefined || email==null){
            return res.send({result:false,message:"Invalid Email"})
        }
        if(password=="" || password==undefined || password==null){
            return res.send({result:false,message:"Invalid Password"})
        }
        if(phone=="" || phone==undefined || phone==null){
            return res.send({result:false,message:"Invalid Phone"})
        }
        if(Address1=="" || Address1==undefined || Address1==null){
            return res.send({result:false,message:"Invalid Address"})
        }
        if(!isLength(username,{min:3,max:20})){
            return res.send({result:false,message:"Invalid Username Length"})
        }
        if(!isEmail(email)){
            return res.send({result:false,message:"Invalid email."})
        }
        
        // validate the email whether it exist or not
        try{
        const findUser=await userModel.findOne({email})
        if(findUser){
            return res.send({result:false,message:"Invalid email. User Already Exist."})
        }
        const newUser=new userModel({
            username,
            email,
            password:bcrypt.hashSync(password,10),
            phone,
            Address1
        })
        const token=CreateToken({email:newUser.email,id:newUser._id})
        if(newUser){
            await newUser.save()
            return this.ok(res,{data:{username:newUser.username,email:newUser.email},token})
        }
    }catch(err){
        console.log(INTERNAL_ERROR)
        return this.error(res,err)
    }
    }   

    async LoginUser(req,res){
        const {email,password}=req.body
        if(email=="" || email==undefined || email==null){
            return res.send({result:false,message:"Invalid Email"})
        }
        if(password=="" || password==undefined || password==null){
            return res.send({result:false,message:"Invalid Password"})
        }
        if(!isEmail(email)){
            return res.send({result:false,message:"Invalid email."})
        }
         try{

             const findUser=await userModel.findOne({email:email})
             if(!findUser){
                return res.send({
                    result:false,
                    message:"Invalid Email/password."
                })
             }
             const MatchPassword=bcrypt.compareSync(password,findUser.password)
             if(!MatchPassword){
                return res.send({result:false,message:"Invalid Email/password."})
             }
             const token=CreateToken({email:findUser.email,id:findUser._id})
             return this.ok(res,{result:true,data:findUser,token:token})
            }catch(err){
                console.log(INTERNAL_ERROR)
        return this.error(res,err)
            }
    }

    async getAllUser(req,res){
        try{
            const users=await userModel.find()
            if(users){
                return this.ok(res,users)
            }else{
                return this.send({result:false,message:SOMETHING_WENT_WRONG})
            }
        }catch(err){
            console.log(INTERNAL_ERROR)
            return this.error(res,err)
        }
    }

    async DeleteUser(req,res){
        const {id}=req.params
        try{
            const d=await userModel.findOneAndDelete({_id:id})
            if(d){
                return this.ok(res,d)
            }else{
                return this.error(res,NO_RECORD_FOUND)
            }
        }catch(err){
            console.log(INTERNAL_ERROR)
            return this.error(res,err)
        }
    }
}

module.exports=new Users()