import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentDate=new Date()
  const currentYear=currentDate.getFullYear()

  return (
    <div className='footer'>
        <h1 className='text-center'>
        All Rights Reserved &copy; {currentYear}</h1>
        <p className='text-center mt-3'>
            <Link to="/about">About</Link>
            |
            <Link to="/contact">Contact</Link>
            |
            <Link to="/policy">Product Policy</Link>
        </p>
        </div>
  )
}

export default Footer