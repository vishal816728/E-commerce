const express=require('express');
const app=express()
const helmet=require('helmet')
const morgan=require('morgan')
const cors=require('cors');
const {protect,isAdmin}=require("./middleware/auth")
const UsersRouter = require('./Routes/users.route');
const ProductsRouter = require('./Routes/product.route');


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(helmet())
if(process.env.ENVIRONMENT=="prod"){
app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(morgan('dev'));
}

app.use("/api/v1",UsersRouter)
app.use("/api/v1",ProductsRouter)

app.get("/user-auth",protect,(req,res)=>{
  res.status(200).send({ok:true})
})


app.get("/admin-auth",protect,isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
})

module.exports=app