import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
    const [auth,setAuth]=useAuth()
    console.log(auth)
    const navigate=useNavigate()
    function RedirectHandler(){
       if(auth?.user.role===1){
            navigate("/admin/dashboard")
       }else if(auth?.user.role===0){
        navigate("/dashboard/user")
       }
    }
  return (
    <Layout>
        <div className='HomePageContainer'>
            <h1>Shop.io</h1>
            <h3>Welcome to India's First Best Online Store.</h3>
            <p>We Deliver the Quality with Affordibility</p>
            {
              auth.token?
            <button type="button" className="btn btn-primary my-1 px-3 py-1" onClick={RedirectHandler}>DashBoard</button>
            :
            <p>Register/Login to Explore The DashBoard</p>
            }

        </div>
        </Layout>
  )
}

export default HomePage