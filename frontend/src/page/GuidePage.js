import React,{useEffect, useState} from 'react'
import NavbarC from '../component/NavbarC';
import Footer from '../component/Footer';
import SectionOneGuide from '../component/GuidePage/SectionOneGuide';

const GuidePage = () => {

    const gradientC = true

  return (
    <div>
          {/* <NavbarC gradientC={gradientC}/> */}
        <SectionOneGuide/>
        {/* <Footer/> */}
    </div>
  )
}

export default GuidePage