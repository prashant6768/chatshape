import React from 'react'
import NavbarC from '../component/NavbarC'
import SectionOneHome from '../component/Homepage/SectionOneHome'
import SectionTwoHome from '../component/Homepage/sectionTwoHome'
import Footer from '../component/Footer'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';


const Home = () => {
  return (
    <div>
       <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64ca2d70c6e8de9e5d052d56"
      />
      <NavbarC/>
      <SectionOneHome/>
      <SectionTwoHome/>
      <Footer/>
      </div>
  )
}

export default Home