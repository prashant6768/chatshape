import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import SectionOneFeature from '../component/FeaturePage/SectionOneFeature'

const FeaturesPage = () => {

  const gradientC = true

  return (
    <div>
    <NavbarC gradientC={gradientC}/>
<SectionOneFeature/>
   <Footer/>
   </div>
  )
}

export default FeaturesPage