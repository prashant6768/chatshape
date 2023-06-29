import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import AccountSection1 from '../component/AccountPage/AccountSection1'

const AccountPage = () => {

    const gradientC = true

  return (
    <div>
        <NavbarC gradientC={gradientC}/>
         <AccountSection1/>
        <Footer/>
    </div>
  )
}

export default AccountPage