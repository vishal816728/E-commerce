import React, { useEffect } from "react"
import {createContext,useState,useContext} from "react"

const cartContext=createContext()

const CartProvider=({children})=>{
    const [cart,setCart]=useState([])
    const  [totalPrice,setTotalPrice]=useState(null)

    useEffect(()=>{
       const ExistingCartItem=localStorage.getItem('cart')
       if(ExistingCartItem){
        setCart(JSON.parse(ExistingCartItem))
       }
    },[])

    useEffect(()=>{
         let total=0
         cart.forEach(item=>{
            total=total+item.price
         })
         setTotalPrice(total)
    },[cart])

    return (
        <cartContext.Provider value={[cart,setCart,totalPrice]}>
            {children}
        </cartContext.Provider>
    )
}

const useCart=()=>useContext(cartContext);

export {useCart,CartProvider}

// let myCart=[...cart]
// let index=mycart.findIndex(item=>item._id===pid)
// myCart.splice(index,1)
// setCart(myCart)
// localStorage.setItem('cart',JSON.stringify(myCart))

