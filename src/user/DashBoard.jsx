import React, { useEffect, useState,useCallback } from 'react'
import Layout from '../components/Layout/Layout'
import CardContainer from '../components/UsableComponent/CardContainer'
import axios from "axios"

const DashBoard = () => {
  const [products,setAllProducts]=useState(null)
  const [active,setActive]=useState("all")
  const [searchItem,setSearchItem]=useState("")

  async function LoadProducts(){
     let products_res=await axios.get('http://localhost:7001/api/v1/all/products')
     if(products_res){
      setAllProducts(products_res.data.data)
     }
  }
  useEffect(()=>{
     LoadProducts()
  },[])

  
  function SearchHandler(e){
      setSearchItem(e.target.value.toLowerCase())
  }
  const filteredData = products?.filter((el) => {
    //if no input the return the original
    if (searchItem === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.productName.toLowerCase().includes(searchItem)
    }
})

  let classNameActive="list-group-item active"
  let classNameNormal="list-group-item"

  return (
    <Layout>
        <div className='userDashBoardContainer'>
            <div className='userDashBoardLeftSideContainer'>
            <ul className="list-group">
              <label className='my-3'>Filter By Category</label>
            <li className={ active==="all"?classNameActive:classNameNormal} onClick={()=>setActive("all")} aria-current="true">All</li>
            <li className={ active==="Shirts"?classNameActive:classNameNormal} onClick={()=>setActive("Shirts")}>Shirts </li>
            <li className={ active==="T-Shirts"?classNameActive:classNameNormal} onClick={()=>setActive("T-Shirts")}>T-Shirts</li>
            <li className={ active==="Pants"?classNameActive:classNameNormal} onClick={()=>setActive("Pants")}>Pants</li>
            <li className={ active==="Watches"?classNameActive:classNameNormal} onClick={()=>setActive("Watches")}>Watches</li>
            <li className={ active==="Others"?classNameActive:classNameNormal} onClick={()=>setActive("Others")}>Others</li>
          </ul>
            </div>
            <div className="userDashBoardRightSideContainer">
                <div className='userDashBoardRightSideContainer_1'>
                      <h1 className='m-4'>Latest Arrivals</h1>
                      <input class="m-4 form-control mr-sm-2" type="search" placeholder="Search" onChange={(e)=>SearchHandler(e)} aria-label="Search"></input>
                </div>
                <div className='userDashBoardRightSideContainer_2 m-3'>
                  {
                    filteredData && filteredData.length>0 && active==="all"? 
                    filteredData.map(product=><CardContainer image={product.ImageUrl} productName={product.productName} productRating={product.Rating} productPrice={product.price} item={product} /> 
                    ):
                    filteredData && filteredData.length>0 && active==="Pants"?
                    filteredData.filter(item=>item.category==="Pants").map(product=><CardContainer image={product.ImageUrl} productName={product.productName} productRating={product.Rating} productPrice={product.price} item={product} /> 
                    )
                    :
                    filteredData && filteredData.length>0 && active==="Shirts"?
                    filteredData.filter(item=>item.category==="Shirts").map(product=><CardContainer image={product.ImageUrl} productName={product.productName} productRating={product.Rating} productPrice={product.price} item={product} /> 
                    ):
                    filteredData && filteredData.length>0 && active==="T-Shirts"?
                    filteredData.filter(item=>item.category==="T-Shirts").map(product=><CardContainer image={product.ImageUrl} productName={product.productName} productRating={product.Rating} productPrice={product.price} item={product} /> 
                    ):
                    filteredData && filteredData.length>0 && active==="Watches"?
                    filteredData.filter(item=>item.category==="Watches").map(product=><CardContainer image={product.ImageUrl} productName={product.productName} productRating={product.Rating} productPrice={product.price} item={product} /> 
                    ):
                    filteredData && filteredData.length>0 && active==="Others"?
                    filteredData.filter(item=>item.category==="Others").map(product=><CardContainer image={product.ImageUrl} productName={product.productName} productRating={product.Rating} productPrice={product.price} item={product} /> 
                    ):
                    "No Item Found"
                  }
              
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default DashBoard