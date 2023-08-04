import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import Section1blog from '../component/BlogPage/Section1blog'
import Section2Blog from '../component/BlogPage/Section2Blog'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';

const BlogPage = () => {

   

  return (
    <div>
       <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64ca2d70c6e8de9e5d052d56"
      />
        <NavbarC />
        <Section1blog/>
        <Section2Blog/>
        <Footer/>
    </div>
  )
}

export default BlogPage