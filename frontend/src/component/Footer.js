import React from 'react'
import './Homepage/gradientCss.css'
import {Link} from 'react-router-dom' 
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
  return (
    <div  className='sectionOneGradient row mx-0' style={{ height: '100%',width:'100vw' }}>
        <div className=' col-lg-5 col-10 container' >
            <div  className='fw-bolder col-10 d-flex justify-content-lg-start justify-content-center container pt-3' style={{ color: '#FFFFFF' }}>
                <ul style={{ listStyle:'none' }}>
                    <li className='my-4' ><h1>LOGO</h1></li>
                    <li className='my-4' ><h3>Sign Up</h3></li>
                    <li className='my-4' ><h3>Login</h3></li>
                </ul>
            </div>
        </div>
        <div className=' col-lg-5 col-10 container ' >
            <div  className='fw-bolder col-10 d-flex justify-content-lg-end justify-content-center container pt-3' style={{ color: '#FFFFFF' }}>
                <ul style={{ listStyle:'none' }} className='text-center'>
                    <li className='my-4' ><h4>@company | All Rights Reserved</h4></li>
                    <li className='my-4' ><h4>Contact Us</h4></li>
                  <Link to='/terms' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Terms of Service</h4></Nav.Link></Link>
                     
                </ul>
            </div>
        </div>

    </div>
  )
}

export default Footer