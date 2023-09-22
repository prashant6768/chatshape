import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import SectionOneSA from '../component/SuperAdminPage/SectionOneSA'

const SuperAdminPage = () => {

    const gradientC = true

  return (
    <div>
    <NavbarC gradientC={gradientC}/>
<SectionOneSA/>
   <Footer/>
   </div>
  )
}

export default SuperAdminPage