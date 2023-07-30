const jwt =require("jsonwebtoken");
const userModel=require("../Models/user.model")
const asyncHandler =require("express-async-handler");
// const employerModel = require("../Models/employer.model");

const protect = asyncHandler(async  (req, res, next) => {
  let token;
  console.log(req.headers)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") 
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; 
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if(req.headers.role=="0" || req.headers.role=="1"){
         req.user = await userModel.findById(decoded.id).select("-password");
       }
       else{
          res.status(401)
         throw new Error("Role is Not defined within the given values employer or user")
       }

      next();
    } catch (error) {
      res.status(401).json({result:false,msg:"Not Authorized,Token Failed"});
    }
  }

  if (!token) {
    res.status(401).json({result:false,msg:"Not Authorized,Token Failed"});
  }

});

const isAdmin=async (req,res,next)=>{
  if (
    req.user && 
    req.user.role===1
  ) {
      next()
  }else{
    res.status(401).json({result:false,msg:"Role is Not Authorized"});
  }
}

module.exports= { protect,isAdmin };
