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
{/* <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64d47c3004d7aebaeb5dbf04"
      /> */}
    <NavbarC gradientC={gradientC}/>
     <ManageBot id={id}/>
    <Footer/>
</div>
  )
}

export default ManageBotPage