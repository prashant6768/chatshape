import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import BotSection1 from '../component/CreateBot/BotSection1'

const CreateBot = () => {

    const gradientC = true

  return (
    <div>
        <NavbarC gradientC={gradientC}/>
        <BotSection1/>
        <Footer/>
    </div>
  )
}

export default CreateBot