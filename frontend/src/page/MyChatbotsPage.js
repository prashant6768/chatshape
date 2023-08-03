import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import MyChatbotSection1 from '../component/MyChatbot/MyChatbotSection1'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';

const MyChatbotsPage = () => {

const gradientC = true

  return (
    <div>
       <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-try-13/popup.js"
        id="popup"
        cred="64ca2d70c6e8de9e5d052d56"
      />
        <NavbarC gradientC={gradientC}/>
        <MyChatbotSection1/>
        <Footer/>
    </div>
  )
}

export default MyChatbotsPage