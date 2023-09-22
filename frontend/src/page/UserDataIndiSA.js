import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import SectionOneUserDataIndiSa from '../component/UserDataIndiSA/SectionOneUserDataIndiSa'
import { useParams} from 'react-router-dom'

const UserDataIndiSA = () => {

    const gradientC = true
    const {id}= useParams()


  return (
    <div>
    <NavbarC gradientC={gradientC}/>
   <SectionOneUserDataIndiSa id={id}/>
   <Footer/>
   </div>
  )
}

export default UserDataIndiSA