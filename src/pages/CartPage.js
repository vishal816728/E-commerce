import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { Link } from 'react-router-dom'
import { AiTwotoneDelete } from 'react-icons/ai'

const CartPage = () => {
    const [cart,setCart,totalPrice]=useCart()
    function RemoveHandler(pid){
       let myCart=[...cart]
        let index=myCart.findIndex(item=>item._id===pid)
        myCart.splice(index,1)
        setCart(myCart)
        localStorage.setItem('cart',JSON.stringify(myCart))
    }
  return (
    <Layout title="cart">
        <div className='cartContainer'>
            <h3>Cart</h3>
            {
                cart && cart.length>0 ?
                cart.map((item,index)=><>
                <div className="cartContainerComponent">
                <div className="border-right"><h3>{index+1}</h3></div>
                <div><img src={item.ImageUrl} alt="" width="50px" height="auto" /></div>
                <div >
                    <h3 >{item.productName}</h3>
                </div>
                <div ><h3>{item.price}</h3></div>
                <div><AiTwotoneDelete style={{cursor:"pointer"}} onClick={()=>RemoveHandler(item._id)}/></div>
            </div></>)
            :
            <>
            "No Items In the Cart"
            <Link to="/dashboard/user"><button className="btn btn-primary">DashBoard</button></Link>
            </>
            }
            <br />
            <h3>Total Price</h3>
              <h4>{totalPrice}</h4> 
        </div>
    </Layout>
  )
}

export default CartPage