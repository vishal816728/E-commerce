const express=require('express')
const UsersRouter=express.Router()
const userController=require('../Controllers/Users/users.controller')
const {protect,isAdmin}=require('../middleware/auth')

// UsersRouter.get('/getuser/:id',)

UsersRouter.post('/new/user/registration',userController.registerUser)
UsersRouter.post('/existing/user/login',userController.LoginUser)
UsersRouter.get("/get/all/users",protect,isAdmin,userController.getAllUser)
UsersRouter.delete("/user/delete/:id",protect,isAdmin,userController.DeleteUser)

module.exports=UsersRouter