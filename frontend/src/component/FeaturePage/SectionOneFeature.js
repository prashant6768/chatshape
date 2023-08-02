import React from 'react'
import {AiOutlineDatabase} from 'react-icons/ai'

const SectionOneFeature = () => {
  return (
    <div div className='pb-5 px-3 ' style={{ backgroundColor: '#242439', height: '100%',minHeight:'100vh',width:'100vw' }}>
    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Key Features</h1>

    <div className='d-flex justify-content-center ' style={{marginTop:'100px'}}>
    <div className='row col-lg-10 col-12 '>
        <div className='col-lg-6 col-12'>
<img src="https://24toolbox.com/assets/image/og/dummy-%C4%ABmage-generator-tool.jpg?ver=220114.01" style={{ width:'100%'}} alt="loading"/>
        </div>
        <div className='col-lg-6 col-12'>
        <h1 className=' col-12 d-flex justify-content-center justify-content-lg-start container text-center  mb-4' style={{ color: '#FFFFFF' }}><AiOutlineDatabase/> </h1>    
    <h1 className='fw-bolder col-12 d-flex justify-content-center justify-content-lg-start container text-center  mb-4' style={{ color: '#FFFFFF' }}>Create Powerful AI Knowledge Bases</h1>
    <p className=' col-12 d-flex justify-content-center justify-content-lg-start container text-center text-lg-start  mb-4' style={{ color: '#FFFFFF' }}>Upload multiple file types, websites, images and videos</p>
        </div>
    </div>
    </div>

  </div>
  )
}

export default SectionOneFeature