import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet"
import { Toaster } from 'react-hot-toast';

const Layout = ({children,description,title,author,keywords}) => {
  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                <div>
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                </div>
                    <title>{title}</title>
        </Helmet>
        <Header />
        <main style={{minHeight:"75vh"}}>
        {children}
        <Toaster />
        </main>
        <Footer />
    </div>
  )
}

Layout.defaultProps={
    title:"Shop.io",
    description:"Mern Shop App",
    keywords:"React,Node,Mongo",
    author:"Vishal"
}
export default Layout