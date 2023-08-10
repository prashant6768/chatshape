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
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64d47c3004d7aebaeb5dbf04"
      />
        <NavbarC gradientC={gradientC}/>
        <MyChatbotSection1/>
        <Footer/>
    </div>
  )
}

export default MyChatbotsPage