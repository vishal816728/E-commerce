import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiTwotoneStar } from 'react-icons/ai'
import { useCart } from '../../context/cart'

const CardContainer = (props) => {
  const [active,setActive]=useState(null)
  const [cart,setCart]=useCart()
  function cartAddHandler(newItem){
        let newCart=[...cart,newItem]
        setCart([...cart,newItem])
        localStorage.setItem('cart',JSON.stringify(newCart))
  }
  return (
    <div className='cardContainer'>
      <img src={props.image} alt="e1" width="100%" height="73%"/>
          
        <h4 className='text-justify'>&nbsp;{props.productName}&nbsp;<span style={{fontSize:"18px"}}>{props.productRating} <AiTwotoneStar style={{marginBottom:"3px",marginLeft:"0px"}}/></span></h4>
        <p>&nbsp;Price:&nbsp;<strong>{props.productPrice}&nbsp;</strong>Rs</p>
        <button className='w-100 btn-cardContainer' onClick={()=>cartAddHandler(props.item)} onMouseOver={()=>setActive("active")} onMouseLeave={()=>setActive(null)}>{active==="active"?<AiFillHeart />:<AiOutlineHeart />}&nbsp;&nbsp;WhisList</button> 
    </div>
  )
}

export default CardContainer