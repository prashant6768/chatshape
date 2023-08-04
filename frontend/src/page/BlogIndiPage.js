import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import Section1BlogIndi from '../component/BlogIndi/Section1BlogIndi'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';


const BlogIndiPage = () => {

    const gradientC = true
    
  return (
    <div>
       <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64ca2d70c6e8de9e5d052d56"
      />
      <NavbarC gradientC={gradientC}/>
      <Section1BlogIndi/>
      <Footer/>
    </div>
  )
}

export default BlogIndiPage