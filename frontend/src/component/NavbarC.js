import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../component/underline.css'
import './Homepage/gradientCss.css'
import { Link } from 'react-router-dom';
import logo from '../assets/Zema_Logo_Transperent.png'
import logo2 from '../assets/Zema_Logo_Original.png'
import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Dropdown } from 'react-bootstrap';





const NavbarC = ({ gradientC }) => {

  const decoded = Cookies.get('accessToken');
  const adminToken = Cookies.get('adminToken');


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ref = useRef()
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpen])

  return (
    <Navbar expand="lg" className={gradientC ? ' sectionOneGradient' : ''} style={{ backgroundColor: '#242439', minHeight: '100%', width: '100vw' }}>
      <Container>
        <Link to='/' style={{ textDecoration: 'none' }}><Navbar.Brand href="#home" style={{ color: '#FFFFFF', textDecoration: 'none' }}><img src={gradientC ? logo2 : logo} alt='ZEMA' style={{ height: '80px' }} /></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav " style={{ color: 'white', backgroundColor: 'white' }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" >
            {
              decoded === null || decoded === '' || decoded === undefined ?
                <>
                  <Link to='/feature'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{ color: '#FFFFFF' }}>Features</Nav.Link></Link>
                  <Link to='/pricing'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{ color: '#FFFFFF' }}>Pricing</Nav.Link></Link>
                  <Link to='/blog'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{ color: '#FFFFFF' }}>Blog</Nav.Link></Link>
                  <Link to='/login' style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='fw-bolder btn rounded-pill extraT px-5' style={{ color: '#FFFFFF', border: '4px solid #FFFFFF', maxWidth: '200px' }}>Try Zema</Nav.Link></Link>
                </> :
                // {
                //   adminToken === null || adminToken === '' || adminToken === undefined ?
                <>
                  <Link to='/feature'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{ color: '#FFFFFF' }}>Features</Nav.Link></Link>
                  <Link to='/account'><Nav.Link href="#home" className='fw-bolder mx-3 underline-grow' style={{ color: '#FFFFFF' }}>Account</Nav.Link></Link>
                  <Link to='/pricing'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{ color: '#FFFFFF' }}>Pricing</Nav.Link></Link>
                  <Link to='/blog'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{ color: '#FFFFFF' }}>Blog</Nav.Link></Link>
                  <Link to='/mychatbots'><Nav.Link href="#link" className='fw-bolder mx-3 underline-grow' style={{ color: '#FFFFFF' }}>My Chatbots</Nav.Link></Link>
                  {/* <Link to='/login' style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='fw-bolder btn rounded-pill extraT px-5' style={{ color: '#FFFFFF', border: '4px solid #FFFFFF', maxWidth: '200px' }}>Try Zema</Nav.Link></Link> */}
                

                  {
              adminToken === null || adminToken === '' || adminToken === undefined ?
                <>
                  <Link to='/login' style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='fw-bolder btn rounded-pill extraT px-5' style={{ color: '#FFFFFF', border: '4px solid #FFFFFF', maxWidth: '200px' }}>Try Zema</Nav.Link></Link>
                </> :
                <>
                  <Dropdown ref={ref} show={isOpen} onClick={toggleDropdown}>
                    <div className='fw-bolder mx-3 mt-2 underline-grow' style={{ color: '#FFFFFF' }} id="dropdown-basic">
                      Admin
                    </div>

                    <Dropdown.Menu >
                      <Dropdown.Item href="#"><Link to='/superadminUserData'><Nav.Link href="#link" className='fw-bolder mx-3 ' >Users Data</Nav.Link></Link></Dropdown.Item>
                      <Dropdown.Item href="#"><Link to='/superadmin'><Nav.Link href="#link" className='fw-bolder mx-3 ' >Super Admin</Nav.Link></Link></Dropdown.Item>
                      <Dropdown.Item href="#"><Link to='/superadminmanage'><Nav.Link href="#link" className='fw-bolder mx-3 ' >Manage LLM</Nav.Link></Link></Dropdown.Item>
                      <Dropdown.Item href="#"><Link to='/superadminguide'><Nav.Link href="#link" className='fw-bolder mx-3 ' >Guide</Nav.Link></Link></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Link to='/login' style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='fw-bolder btn rounded-pill extraT px-5' style={{ color: '#FFFFFF', border: '4px solid #FFFFFF', maxWidth: '200px' }}>Try Zema</Nav.Link></Link>
                </>
            }


                </>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default NavbarC


