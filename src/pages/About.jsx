import React from 'react'
import Layout from '../components/Layout/Layout'
import aboutImg from "../images/about.jpeg";

const About = () => {
  return (
    <Layout title={"About us -Shop.io"}>
        <div className='AboutContainer'>
             <div>
                <img src={aboutImg} alt="about" />
             </div>
             <div className='about_right-container'>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
             </div>
        </div>
    </Layout>
  )
}

export default About