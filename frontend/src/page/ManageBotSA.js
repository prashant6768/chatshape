import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import SectionOneManageBotSA from '../component/ManageBotSAPage/SectionOneManageBotSA'

const ManageBotSA = () => {

    const gradientC = true

  return (
    <div>
    <NavbarC gradientC={gradientC}/>
   <SectionOneManageBotSA/>
   <Footer/>
   </div>
  )
}

export default ManageBotSA