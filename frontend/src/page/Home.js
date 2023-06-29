import React from 'react'
import NavbarC from '../component/NavbarC'
import SectionOneHome from '../component/Homepage/SectionOneHome'
import SectionTwoHome from '../component/Homepage/sectionTwoHome'
import Footer from '../component/Footer'

const Home = () => {
  return (
    <div>
      <NavbarC/>
      <SectionOneHome/>
      <SectionTwoHome/>
      <Footer/>
      </div>
  )
}

export default Home