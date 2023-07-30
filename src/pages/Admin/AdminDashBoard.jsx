import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import { AiTwotoneDelete } from 'react-icons/ai'
import CardContainer from '../../components/UsableComponent/CardContainer'
import {RxCross1} from "react-icons/rx"

// &#9734; this is called entity in html

const AdminDashBoard = () => {
  const [active,setActive]=useState("createProduct")
  const [file,setFile]=useState("")
  const [users,setUsers]=useState([])
  const [auth,setAuth]=useAuth()
  const [render,setRender]=useState(null)
  const [products,setAllProducts]=useState([])
  const [createProductFormData,setCreateProductFormData]=useState({
       productName:"",
       ImageUrl:"",
       price:null,
       Rating:null,
       category:""       
  })
  let classNameActive="list-group-item active"
  let classNameNormal="list-group-item"

  async function LoadUsers(){
    try{
     const getAllUsers=await axios.get('http://localhost:7001/api/v1/get/all/users',{
      headers:{
         "authorization":`Bearer ${auth?.token}`,
        "role":1
      }
     })
     if(getAllUsers){
        setUsers(getAllUsers.data.data)
     }
    }catch(err){
        toast.error(err.message)
    }
  }
  async function LoadProducts(){
    try{
        let products_res=await axios.get('http://localhost:7001/api/v1/all/products')
        if(products_res){
         setAllProducts(products_res.data.data)
        }
    }catch(err){
      toast.error(err.message)
    }
  }
  useEffect(()=>{
      LoadUsers()
      LoadProducts()
  },[render])
  async function CreateProductformSubmitHandler(e){
    e.preventDefault()
      const formData=new FormData()
      formData.append("file",file)
      formData.append("upload_preset","vkleaz7q")
      let uploadedFile=await axios.post('https://api.cloudinary.com/v1_1/dzdljvv1t/image/upload',formData)
      setCreateProductFormData({...createProductFormData,ImageUrl:uploadedFile.data.secure_url})
      const productUpdate=await axios.post('http://localhost:7001/api/v1/new/admin/product',createProductFormData,{
            headers:{
              "authorization":`Bearer ${auth?.token}`,
              "role":1
            }
      })
  }
  async function HandleCloudinaryUpload(e){
      setFile(e.target.files[0])

  }

  async function DeleteUserHandler(id){
    try{
     const deleteUser=await axios.delete(`http://localhost:7001/api/v1/user/delete/${id}`,{
      headers:{
        "authorization":`Bearer ${auth?.token}`,
        "role":1
      }
     })
     if(deleteUser){
      setRender(Math.random()*10)
      toast.success("SuccessFully Deleted the User.")
     }
    }catch(err){
      toast.error(err.message)
    }
  }
  async function ProductDeleteHandler(id){
      try{
          const deleteProduct=await axios.delete(`http://localhost:7001/api/v1/delete/product/${id}`,{
            headers:{
              "authorization":`Bearer ${auth?.token}`,
              "role":1
            }
          })
          if(deleteProduct){
            setRender(Math.random()*10)
            toast.success("SuccessFully Removed Product")
          }
      }catch(err){
        toast.error(err.message)
      }
  }
  return (
    <Layout>
        <div className='userDashBoardContainer'>
            <div className='userDashBoardLeftSideContainer'>
            <ul className="list-group">
            <li className={ active==="createProduct"?classNameActive:classNameNormal} onClick={()=>setActive('createProduct')} style={{marginTop:"2px"}}>Create Product</li>
            <li className={ active==="users"?classNameActive:classNameNormal} onClick={()=>setActive('users')}>Users</li>
            <li className={ active==="products"?classNameActive:classNameNormal} onClick={()=>setActive('products')}>Products</li>
          </ul>
            </div>
            <div className="userDashBoardRightSideContainer">
                {active==="createProduct"
                ?
                <div className='userDashBoardRightSideContainer_1'>
                      <h1 className='m-4'>Create Product</h1>
                      <div className='adminDashBoardRightSideContainer_2 m-3'>
                        
                        <form onSubmit={CreateProductformSubmitHandler} className='formContainerStyles'>
                              <label htmlFor='product name'>Product Name</label>
                              <input 
                                className="createProductInputStyle my-1" 
                                type="text" 
                                id="product name"
                                placeholder='Product Name' 
                                value={createProductFormData.productName}
                                onChange={(e)=>setCreateProductFormData({...createProductFormData,productName:e.target.value})}
                                required
                               />
                               <label htmlFor='Price'>Price</label>
                                <input 
                                className="createProductInputStyle my-1" 
                                type="number" 
                                id="Price"
                                placeholder='Price' 
                                value={createProductFormData.price}
                                onChange={(e)=>setCreateProductFormData({...createProductFormData,price:Number(e.target.value)})}
                                required
                               />
                              <label htmlFor='Rating' >Rating</label>
                              <select name="select Rating" id="Rating" className='createProductInputStyle my-1'
                               onChange={(e)=>setCreateProductFormData({...createProductFormData,Rating:Number(e.target.value)})}
                               required>
                              <option value="" selected disabled hidden>Choose here</option>
                                <option value="1">1 &nbsp;&#9734;</option> 
                                <option value="2">2 &nbsp;&#9734;&#9734;</option> 
                                <option value="3">3 &nbsp;&#9734;&#9734;&#9734;</option> 
                                <option value="4">4 &nbsp;&#9734;&#9734;&#9734;&#9734;</option> 
                                <option value="5">5 &nbsp;&#9734;&#9734;&#9734;&#9734;&#9734;</option> 
                              </select>
                              <label htmlFor='category' >Category</label>
                              <select name="select category" id="category" className='createProductInputStyle my-1'
                                onChange={(e)=>setCreateProductFormData({...createProductFormData,category:e.target.value})}
                              required>
                              <option value="" selected disabled hidden>Choose here</option>
                                <option value="Shirts">Shirts</option> 
                                <option value="T-Shirts">T-Shirts</option> 
                                <option value="Pants">Pants</option> 
                                <option value="Watches">Watches</option> 
                                <option value="Others">Others</option> 
                              </select>
                              <label htmlFor='File'>Image</label>
                              <input 
                                type="file"
                                className="createProductInputStyle my-1" 
                                id="File"
                                onChange={HandleCloudinaryUpload}
                                required
                              />
                               <button type="submit" className='my-2 btn btn-primary'>Submit</button>
                        </form>
                      </div>
                </div>
                : active==="users" ?
                <div className='userDashBoardRightSideContainer_1'>
                      <h1 className='m-4'>Users List</h1>
                      <div className='adminDashBoardRightSideContainer_2 m-3'>
                      <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sr.No.</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Address</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                       {
                        users && users.length>0 ?
                        users.map((user,index)=>

                        <tbody key={user._id}>
                        <tr>
                          <th scope="row">{index+1}</th>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.Phone}</td>
                          <td>{user.Address1}</td>
                          <td ><AiTwotoneDelete title='Delete user' onClick={()=>DeleteUserHandler(user._id)} style={{'cursor':'pointer'}}/></td>
                        </tr>
                        </tbody>
                        )
                        :"No Records Found"
                       }
                    </table>
                        </div>
                </div>
                :active==="products"?
                <div className='userDashBoardRightSideContainer_1'>
                <h1 className='m-4'>Products</h1>
                <div className='adminDashBoardRightSideContainer_2 m-3'>
                {
                    products && products.length>0 ? 
                    products.map(product=><div ><RxCross1 style={{borderRadius:'10px',cursor:"pointer",border:"1px solid rgba(0,0,0,0.1)"}} onClick={()=>ProductDeleteHandler(product._id)}/><CardContainer image={product.ImageUrl} productName={product.productName} productRating={product.Rating} productPrice={product.price} /></div>
                    ):
                    ""
                  }
                  </div>
          </div>:""
                }
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashBoard