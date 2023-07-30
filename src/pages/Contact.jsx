import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiMailSend} from "react-icons/bi"
import {BsTelephone} from "react-icons/bs"
import {FaRegAddressCard} from "react-icons/fa"
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className='contactContainer'>
           <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0b54pX1ag9HJpe-_uVAkfnjJ5J5TI1KhwRg&usqp=CAU" alt="contact" width={700} height={500}/>
           </div>
           <div className='contact_right-container'>
              <h3>Please Contact us over mail,sms or talk to our customer care</h3>
              <br />
                <p><BiMailSend /> &nbsp;<strong>Phone: &nbsp;</strong>0123-3425435362,&nbsp;0321-4534234</p>
                <p><BsTelephone /> &nbsp;<strong>Email: &nbsp;</strong>support@shop.io</p>
                <p><FaRegAddressCard /> &nbsp;<strong>Address: &nbsp;</strong>New City CyberPark pune,plot-101</p>
                <br />
                <button className='contact-btn'>Contact Now</button>
           </div>
      </div>
    </Layout>
  )
}

export default Contact