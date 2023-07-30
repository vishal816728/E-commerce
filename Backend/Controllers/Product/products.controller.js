const productModel = require("../../Models/product.model")
const Controller =require("../../Utils/Controller")
const { INTERNAL_ERROR, SOMETHING_WENT_WRONG } =require("../../constants/msg")

class Product extends Controller{
    constructor(){
        super()
        this.getProducts=this.getProducts.bind(this)
        this.postProducts=this.postProducts.bind(this)
        this.DeleteProduct=this.DeleteProduct.bind(this)
    }
   async getProducts(req,res){
      try{
        const getAllProducts=await productModel.find()
        if(getAllProducts){
            return this.ok(res,getAllProducts)
        }else{
            return res.send({message:SOMETHING_WENT_WRONG})
        }
      }catch(err){
        console.log(INTERNAL_ERROR)
        return this.error(res,err)
      }
   }
   async postProducts(req,res){
      const {productName,ImageUrl,price,Rating,category}=req.body
      if(productName=="" || productName==undefined || productName==null){
        return res.send({message:"Invalid productName"})
      }
      if(ImageUrl=="" || ImageUrl==undefined || ImageUrl==null){
        return res.send({message:"Invalid ImageUrl"})
      }
      if(price=="" || price==undefined || price==null){
        return res.send({message:"Invalid price"})
      }
      if(Rating=="" || Rating==undefined || Rating==null){
        return res.send({message:"Invalid Rating"})
      }
      if(category=="" || category==undefined || category==null){
        return res.send({message:"Invalid Category."})
      }
      try{
         const post_product=new productModel({
            productName,
            Rating,
            price,
            ImageUrl,
            category
         })
         if(post_product){
            await post_product.save()
            return this.ok(res,post_product)
         }else{
            return res.send({message:SOMETHING_WENT_WRONG})
         }
      }catch(err){
        console.log(INTERNAL_ERROR)
        return this.error(res,err)
      }
   }

   async DeleteProduct(req,res){
       let {id}=req.params
      try{
        const FindAndDel=await productModel.findOneAndDelete({_id:id})
        if(FindAndDel){
          return this.ok(res,FindAndDel)
        }else{
          return res.send({result:false,message:"Product Not Found"})
        }

      }catch(err){
        console.log(INTERNAL_ERROR)
        return this.error(res,err)
      }
   }

}

module.exports=new Product()