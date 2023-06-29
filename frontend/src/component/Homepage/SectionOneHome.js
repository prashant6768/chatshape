import React, { useRef, useEffect } from 'react';
import {Link } from 'react-router-dom'
import ReactPlayer from 'react-player';
import '../Homepage/gradientCss.css'



const SectionOneHome = () => {




    return (
        <div className='sectionOneGradient' style={{ height: '100%',width:'100vw' }}>
            <div className='   ' style={{ paddingTop: '150px', paddingBottom:'100px' }}>
                <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>Custom AI for your Website, and more</h1>
                <h4 className='fw-bolder col-12 d-flex justify-content-center container pt-3' style={{ color: '#FFFFFF' }}>Demo</h4>
               <p className='fw-bolder col-12 d-flex justify-content-center container py-2  text-center' style={{ color: '#FFFFFF' }}>Creating a chatbot from a website link, and then adding it to the site as an AI customer support agent.</p>
               <Link to='/create' style={{textDecoration:'none'}}> <button  className='fw-bolder btn col-lg-3 col-sm-5 col-10 d-flex justify-content-center text-center container py-2 rounded-pill fs-5' style={{ backgroundColor: '#FFFFFF', color: '#FD7930', borderColor: 'white', textDecoration:'none' }}>Create a Chatbot for your website</button></Link>
                <div className='fw-bolder btn col-lg-5 col-sm-8 col-10 d-flex justify-content-center text-center container   mt-4' style={{ backgroundColor: '#FFFFFF', color: '#FD7930', borderColor: 'white', border:'3px solid white', borderRadius:'20px' }}>
                    <ReactPlayer url={'https://youtu.be/snYu2JUqSWs'} width="840px" height="360px" loop controls />
                </div>

            </div>
        </div>
    )
}

export default SectionOneHome