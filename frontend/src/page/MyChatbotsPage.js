import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import MyChatbotSection1 from '../component/MyChatbot/MyChatbotSection1'

const MyChatbotsPage = () => {

const gradientC = true

  return (
    <div>
        <NavbarC gradientC={gradientC}/>
        <MyChatbotSection1/>
        <Footer/>
    </div>
  )
}

export default MyChatbotsPage