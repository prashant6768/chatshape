import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../component/underline.css'
import './Homepage/gradientCss.css'
import { Link } from 'react-router-dom';

const NavbarC = ({gradientC}) => {
  return (
    <Navbar expand="lg" className={gradientC ? 'py-4 sectionOneGradient':'py-4'} style={{ backgroundColor:'#242439',  minHeight:'100%',width:'100vw'}}>
    <Container>
     <Link to='/' style={{ textDecoration:'none'}}><Navbar.Brand href="#home" style={{color:'#FFFFFF', textDecoration:'none'}}>LOGO</Navbar.Brand></Link> 
      <Navbar.Toggle aria-controls="basic-navbar-nav " style={{ color:'white', backgroundColor:'white'}} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" >
          <Link to='/account'><Nav.Link href="#home" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Account</Nav.Link></Link>
          <Link to='/login'><Nav.Link href="#home" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Login</Nav.Link></Link>
          <Link to='/signup'><Nav.Link href="#home" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Signup</Nav.Link></Link>
          <Link to='/pricing'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Pricing</Nav.Link></Link>
          <Link to='/blog'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{color:'#FFFFFF'}}>Blog</Nav.Link></Link>
          <Link to='/mychatbots' style={{ textDecoration:'none'}}><Nav.Link href="#link" className='fw-bolder btn rounded-pill px-5' style={{color:'#FFFFFF', border:'4px solid #FFFFFF'}}>My Chatbots</Nav.Link></Link>        
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  )
}

export default NavbarC


