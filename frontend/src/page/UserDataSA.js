import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import SectionOneUserDataSA from '../component/UserDataSA/SectionOneUserDataSA'

const UserDataSA = () => {
    
    const gradientC = true

    return (
      <div>
      <NavbarC gradientC={gradientC}/>
  <SectionOneUserDataSA/>
     <Footer/>
     </div>
  )
}

export default UserDataSA