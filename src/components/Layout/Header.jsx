import React from 'react'
import { NavLink } from 'react-router-dom'
import {PiShoppingCartDuotone} from "react-icons/pi"
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import {useCart} from "../../context/cart"

const Header = () => {
  const [auth,setAuth]=useAuth()
  const [cart]=useCart()
  // const navigate=useNavigate()
  function LogoutClickHandler(){
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    toast.success("SuccessFully Logged Out")
    localStorage.removeItem("auth")
    window.location.href="/login"
    
  }
  return (
    <nav className="navbar  navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">&nbsp;<PiShoppingCartDuotone size={26}/> Shop.io</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        { auth && auth.user?
        <>
        <li className="nav-item">
          <NavLink className="nav-link" style={{borderBottom:"none"}} onClick={LogoutClickHandler}>LogOut</NavLink>
        </li>
        </>:
         <>
         <li className="nav-item">
           <NavLink className="nav-link" to="/register">Register</NavLink>
         </li>
         <li className="nav-item">
           <NavLink className="nav-link" to="/login">Login</NavLink>
         </li>
         </>
        }
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard/cart">Cart({cart?cart.length:0})</NavLink>
        </li>

      </ul>
    </div>
  </div>
</nav>
  )
}

export default Header