import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import Section1BlogIndi from '../component/BlogIndi/Section1BlogIndi'


const BlogIndiPage = () => {

    const gradientC = true
    
  return (
    <div>
      <NavbarC gradientC={gradientC}/>
      <Section1BlogIndi/>
      <Footer/>
    </div>
  )
}

export default BlogIndiPage