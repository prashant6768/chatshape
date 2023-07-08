import React from 'react'
import './Homepage/gradientCss.css'
import {Link} from 'react-router-dom' 
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/Zema_Logo_Original.png'

const Footer = () => {
  return (
    <div  className='sectionOneGradient row mx-0' style={{ height: '100%',width:'100vw' }}>
        <div className=' col-lg-5 col-10 container' >
            <div  className='fw-bolder col-10 d-flex justify-content-lg-start justify-content-center container pt-3' style={{ color: '#FFFFFF' }}>
                <ul style={{ listStyle:'none' }} className='text-center px-0'>
                    <Link to='/' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><img src={logo} alt='ZEMA' style={{ height:'80px'}} /></Nav.Link></Link>
                    <Link to='/signup' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Sign Up</h4></Nav.Link></Link>
                    <Link to='/login' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Login</h4></Nav.Link></Link>
                    
                </ul>
            </div>
        </div>
        <div className=' col-lg-5 col-10 container ' >
            <div  className='fw-bolder col-10 d-flex justify-content-lg-end justify-content-center container pt-3' style={{ color: '#FFFFFF' }}>
                <ul style={{ listStyle:'none' }} className='text-center px-0'>
                    <li className='my-4' ><h4>@company | All Rights Reserved</h4></li>
                    <Link to='/privacy' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Privacy Policy</h4></Nav.Link></Link>
                  <Link to='/terms' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Terms of Service</h4></Nav.Link></Link>
                     
                </ul>
            </div>
        </div>

    </div>
  )
}

export default Footer