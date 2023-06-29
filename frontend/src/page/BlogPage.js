import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import Section1blog from '../component/BlogPage/Section1blog'
import Section2Blog from '../component/BlogPage/Section2Blog'

const BlogPage = () => {

   

  return (
    <div>
        <NavbarC />
        <Section1blog/>
        <Section2Blog/>
        <Footer/>
    </div>
  )
}

export default BlogPage