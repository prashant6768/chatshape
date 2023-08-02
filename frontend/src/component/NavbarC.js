import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../component/underline.css'
import './Homepage/gradientCss.css'
import { Link } from 'react-router-dom';
import logo from '../assets/Zema_Logo_Transperent.png'
import logo2 from '../assets/Zema_Logo_Original.png'
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';

const NavbarC = ({gradientC}) => {

  const[tok,setTok]=useState(null)
   const decoded = Cookies.get('accessToken');

   useEffect(()=>{
    if(tok === null){console.log("NULLLLLLLLLLl")}
    else{console.log("PPPPPPPPPPPPPPPPPPPPP")}
   },[])

   

  return (
    <Navbar expand="lg" className={gradientC ? ' sectionOneGradient':''} style={{ backgroundColor:'#242439',  minHeight:'100%',width:'100vw'}}>
    <Container>
     <Link to='/' style={{ textDecoration:'none'}}><Navbar.Brand href="#home" style={{color:'#FFFFFF', textDecoration:'none'}}><img src={gradientC ? logo2 : logo} alt='ZEMA' style={{ height:'80px'}} /></Navbar.Brand></Link> 
      <Navbar.Toggle aria-controls="basic-navbar-nav " style={{ color:'white', backgroundColor:'white'}} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" >
        {
            decoded === null || decoded === '' || decoded === undefined ?
            <>
            <Link to='/feature'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Features</Nav.Link></Link>
            <Link to='/pricing'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Pricing</Nav.Link></Link>
            <Link to='/blog'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Blog</Nav.Link></Link>
            <Link to='/login' style={{ textDecoration:'none'}}><Nav.Link href="#link" className='fw-bolder btn rounded-pill extraT px-5' style={{color:'#FFFFFF', border:'4px solid #FFFFFF', maxWidth:'200px'}}>Try Zema</Nav.Link></Link>  
            </>:
            <>
            <Link to='/feature'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Features</Nav.Link></Link>
          <Link to='/account'><Nav.Link href="#home" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Account</Nav.Link></Link>
          {/* <Link to='/login'><Nav.Link href="#home" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Login</Nav.Link></Link> */}
          {/* <Link to='/signup'><Nav.Link href="#home" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Signup</Nav.Link></Link> */}
          <Link to='/pricing'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Pricing</Nav.Link></Link>
          <Link to='/blog'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Blog</Nav.Link></Link>
          <Link to='/mychatbots'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>My Chatbots</Nav.Link></Link>
          {/* <Link to='/mychatbots' style={{ textDecoration:'none'}}><Nav.Link href="#link" className='fw-bolder btn rounded-pill extraT px-5' style={{color:'#FFFFFF', border:'4px solid #FFFFFF', maxWidth:'200px'}}>Try Zema</Nav.Link></Link>         */}
          <Link to='/login' style={{ textDecoration:'none'}}><Nav.Link href="#link" className='fw-bolder btn rounded-pill extraT px-5' style={{color:'#FFFFFF', border:'4px solid #FFFFFF', maxWidth:'200px'}}>Try Zema</Nav.Link></Link>        
            </>

          }
       </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  )
}

export default NavbarC


