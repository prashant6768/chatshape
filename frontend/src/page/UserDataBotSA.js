import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import SectionOneBotSA from '../component/UserDataBotSA.js/SectionOneBotSA'
import { useParams} from 'react-router-dom'

const UserDataBotSA = () => {

    const gradientC = true
    const {id}= useParams()

  return (
    <div>
    <NavbarC gradientC={gradientC}/>
   <SectionOneBotSA id={id}/>
   <Footer/>
   </div>
  )
}

export default UserDataBotSA