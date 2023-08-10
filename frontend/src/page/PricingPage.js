import React from 'react'
import NavbarC from '../component/NavbarC'
import PricingSection1 from '../component/Pricing/PricingSection1'
import Footer from '../component/Footer'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';

const PricingPage = () => {

    const gradientC = true

  return (
    <div>
       <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64d47c3004d7aebaeb5dbf04"
      />
       <NavbarC gradientC={gradientC}/>
       <PricingSection1/>
       <Footer/>
    </div>
  )
}

export default PricingPage