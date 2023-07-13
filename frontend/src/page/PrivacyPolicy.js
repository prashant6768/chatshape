import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'

const PrivacyPolicy = () => {

    const gradientC = true

  return (
    <>
    <NavbarC gradientC={gradientC}/>
    <div className='pb-5' style={{ backgroundColor: '#242439', height: '100%', minHeight:'100vh', width:'100vw' }}>
     <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pb-2 pt-5' style={{ color: '#FFFFFF' }}>Privacy Policy</h1>
     <p className='fs-4 col-12 d-flex justify-content-center container text-center pb-5 pt-3' style={{ color: '#FFFFFF' }}>Last Updated on :</p>
     <p className='fs-4 col-12 d-flex justify-content-center container text-center pb-2 pt-3' style={{ color: '#FFFFFF' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur obcaecati, deserunt corrupti sequi natus iusto voluptatum saepe repudiandae nihil? Tempore eveniet cumque ad modi eaque! Voluptate quasi officia est sint natus laboriosam, consectetur incidunt nihil debitis quos fugit aperiam quaerat placeat saepe? Amet quibusdam tempora deserunt. Similique illum autem dicta molestiae minus reiciendis amet dolorum voluptas accusamus nemo! Facilis aut, reprehenderit, nam quasi, eius ipsam harum dolorem et quis libero vero nostrum voluptatibus tempora provident aperiam repudiandae officia optio suscipit repellendus aspernatur cumque. Aspernatur reiciendis enim, ipsum magni ex adipisci corporis, nisi delectus, repudiandae iure quas vel voluptatum ducimus hic.</p>

    </div>
    <Footer/>
    </>
  )
}

export default PrivacyPolicy