import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [RegisterData,setRegisterData]=useState({
        username:"",
        email:"",
        password:"",
        phone:"",
        Address1:""
    })
    const navigate=useNavigate()
    async function SubmitHandler(e){
        e.preventDefault()
        try{
            const res=await axios.post(`http://localhost:7001/api/v1/new/user/registration`,RegisterData)
            if(res){
                toast.success("Successfully Registered",{
                    duration:5000
                })
                setTimeout(()=>{
                    navigate("/login")
                },0)
            }
        }catch(e){
            toast.error("something went wrong.")
            console.log(e)
        }
    }
  return (
    <Layout title={"Register"}>
        <div className='RegisterContainer'>
            <h3>Register</h3>
            <br />
            <form onSubmit={SubmitHandler} style={{padding:"0.5rem 2rem"}}>
                <div className="mb-4">
                    <input type="text" 
                        value={RegisterData.username} 
                        onChange={(e)=>setRegisterData({...RegisterData,username:e.target.value})}
                        className="form-control" 
                        id="exampleInputEmail1"  
                        placeholder='Enter Your UserName'
                        required
                        />
                </div>
                <div className="mb-4">
                    <input type="email" 
                        value={RegisterData.email}
                        onChange={(e)=>setRegisterData({...RegisterData,email:e.target.value})}
                        className="form-control"
                        id="exampleInputEmail2" 
                        placeholder='Enter Your Email'  required/>
                </div>
                <div className="mb-4">
                    <input type="password" 
                        value={RegisterData.password}
                        onChange={(e)=>setRegisterData({...RegisterData,password:e.target.value})}
                        className="form-control" 
                        id="exampleInputPassword3" 
                        placeholder='Enter Your Password'  required/>
                </div>
                <div className="mb-4">
                    <input type="Number" 
                        value={RegisterData.phone}
                        onChange={(e)=>setRegisterData({...RegisterData,phone:e.target.value})}
                        className="form-control" 
                        id="exampleInputPassword4" 
                        placeholder='Enter Your Number' required/>
                </div>
                <div className="mb-4">
                    <input type="text" 
                        value={RegisterData.Address1}
                        onChange={(e)=>setRegisterData({...RegisterData,Address1:e.target.value})}
                        className="form-control" 
                        id="exampleInputPassword5" 
                        placeholder='Enter Your Address' required/>
                </div>
                <button type="submit" className="registerBtn">Submit</button>
            </form>
        </div>
    </Layout>
  )
}

export default Register