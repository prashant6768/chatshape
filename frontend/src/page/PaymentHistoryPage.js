import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import PaymentSection1 from '../component/PaymentPage/PaymentSection1'

const PaymentHistoryPage = () => {
 
  const gradientC = true

  return (
    <div>
        <NavbarC gradientC={gradientC}/>
         <PaymentSection1/>
        <Footer/>
    </div>
  )
}

export default PaymentHistoryPage