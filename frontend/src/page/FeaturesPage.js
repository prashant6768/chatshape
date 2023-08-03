import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import SectionOneFeature from '../component/FeaturePage/SectionOneFeature'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';

const FeaturesPage = () => {

  const gradientC = true

  return (
    <div>
       <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-try-13/popup.js"
        id="popup"
        cred="64ca2d70c6e8de9e5d052d56"
      />
    <NavbarC gradientC={gradientC}/>
<SectionOneFeature/>
   <Footer/>
   </div>
  )
}

export default FeaturesPage