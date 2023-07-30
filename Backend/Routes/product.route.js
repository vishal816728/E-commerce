const express=require('express')
const ProductsRouter=express.Router()
const ProductController=require("../Controllers/Product/products.controller")
const { protect, isAdmin } = require('../middleware/auth')

ProductsRouter.get('/all/products',ProductController.getProducts)
ProductsRouter.post('/new/admin/product',protect,isAdmin,ProductController.postProducts)
ProductsRouter.delete("/delete/product/:id",protect,isAdmin,ProductController.DeleteProduct)

module.exports=ProductsRouter