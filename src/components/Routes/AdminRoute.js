import {useState,useEffect} from "react"
import { useAuth } from "../../context/auth"
import { Outlet } from "react-router-dom"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function AdminRoute(){
      const [ok,setOk]=useState(false)
      const [auth,setAuth]=useAuth()
      const navigate=useNavigate()
      let [count,setCount]=useState(0)
      useEffect(()=>{
        if(ok==false){
        setTimeout(()=>{
            setCount(count+1)
        },1000)
      }
        count===5 && navigate("/login")
      },[count,navigate])
      
      useEffect(()=>{
          async function checkAuth(){
            const res=await axios.get('http://localhost:7001/admin-auth',{
                headers:{
                    'authorization':`Bearer ${auth?.token}`,
                    'role':'1'
                }
            })

            if(res.data.ok && auth.user.role===1){
                setOk(true)
            }else{
                setOk(false)
            }
          }
          if(auth?.token){
            checkAuth()
          }
      },[auth?.token])

      return ok ? <Outlet /> :<div class="spinner-border text-primary d-flex text-align-center" role="status">
      <span class="sr-only"></span>
    </div>
}