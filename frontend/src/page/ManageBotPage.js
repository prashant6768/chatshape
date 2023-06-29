import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import ManageBot from '../component/ManageBotPage/ManageBot'
import { useParams} from 'react-router-dom'

const ManageBotPage = () => {

  const {id}= useParams()
  const gradientC = true

  return (
<div>
    <NavbarC gradientC={gradientC}/>
     <ManageBot id={id}/>
    <Footer/>
</div>
  )
}

export default ManageBotPage