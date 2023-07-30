import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from '../../context/auth'

const Login = () => {
    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    })
    const [auth,setAuth]=useAuth()
    let navigate=useNavigate()
    useEffect(()=>{
       if(auth.token){
          navigate("/")
       }
    },[auth.token])
    async function SubmitHandler(e){
        e.preventDefault()
        try{
            const res=await axios.post(`http://localhost:7001/api/v1/existing/user/login`,loginData)
            if(res){
                toast.success("Successfully Logged In",{
                    duration:5000
                })
                setAuth({
                    ...auth,
                    user:res.data.data.data,
                    token:res.data.data.token
                })
                localStorage.setItem("auth",JSON.stringify({user:res.data.data.data,token:res.data.data.token}))
                setTimeout(()=>{
                    navigate("/")
                },0)
                
            }
        }catch(e){
            toast.error("something went wrong.")
            console.log(e)
        }
    }
  return (
    <Layout title={"Login"}>
        <div className='RegisterContainer'>
            <h3>Login</h3>
            <br />
            <form onSubmit={SubmitHandler} style={{padding:"0.5rem 2rem"}}>
    
                <div className="mb-4">
                    <input type="email" 
                        value={loginData.email}
                        onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
                        className="form-control"
                        id="exampleInputEmail2" 
                        placeholder='Enter Your Email'  required/>
                </div>
                <div className="mb-4">
                    <input type="password" 
                        value={loginData.password}
                        onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
                        className="form-control" 
                        id="exampleInputPassword3" 
                        placeholder='Enter Your Password'  required/>
                </div>
                <button type="submit" className="registerBtn">Submit</button>
            </form>
            </div>
    </Layout>
  )
}

export default Login