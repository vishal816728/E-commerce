import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
        <div className='pageNotFoundContainer'>
               <h1><strong>404</strong></h1>
               <h3>Oops!.... &nbsp;&nbsp;Page Not Found</h3>
               <Link to="/"><button className='pageNotFound_Btn'>Go Back</button></Link>
        </div>
    </Layout>
  )
}

export default PageNotFound