import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import ManageBot from '../component/ManageBotPage/ManageBot'
import { useParams} from 'react-router-dom'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';

const ManageBotPage = () => {

  const {id}= useParams()
  const gradientC = true

  return (
<div>
<ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-try-13/popup.js"
        id="popup"
        cred="64ca2d70c6e8de9e5d052d56"
      />
    <NavbarC gradientC={gradientC}/>
     <ManageBot id={id}/>
    <Footer/>
</div>
  )
}

export default ManageBotPage