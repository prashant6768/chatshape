import React from 'react'
import NavbarC from '../component/NavbarC'
import PricingSection1 from '../component/Pricing/PricingSection1'
import Footer from '../component/Footer'

const PricingPage = () => {

    const gradientC = true

  return (
    <div>
       <NavbarC gradientC={gradientC}/>
       <PricingSection1/>
       <Footer/>
    </div>
  )
}

export default PricingPage