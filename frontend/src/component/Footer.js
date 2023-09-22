import React,{useState,useEffect} from 'react'
import './Homepage/gradientCss.css'
import {Link} from 'react-router-dom' 
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/Zema_Logo_Original.png'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Footer = () => {

    const [decoded,setDecoded]=useState(undefined)
    const [showLogin,setShowLogin]=useState(true)

    const navigate = useNavigate();

    const logout=()=>{
        Cookies.remove('accessToken')
        Cookies.remove('adminToken')
         toast.success("Logout Successful")
         navigate('/login');
      }

    useEffect(()=>{
        setDecoded(Cookies.get('accessToken'));
        console.log(Cookies.get('accessToken'),"footer",decoded)
    },[decoded])

    useEffect(()=>{
        if(decoded === undefined){
          setShowLogin(true)
        }else{
            setShowLogin(false)
        }
        console.log("show login ",showLogin)
    },[decoded])
    

  return (
    <div  className='sectionOneGradient row mx-0' style={{ height: '100%',width:'100vw' }}>
        <div className=' col-lg-5 col-10 container' >
            <div  className='fw-bolder col-10 d-flex justify-content-lg-start justify-content-center container pt-3' style={{ color: '#FFFFFF' }}>
                <ul style={{ listStyle:'none' }} className='text-lg-start text-center px-0'>
                    <Link to='/' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><img src={logo} alt='ZEMA' style={{ height:'80px'}} /></Nav.Link></Link>
                    <Link to='/signup' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Sign Up</h4></Nav.Link></Link>
                    {
                        showLogin === true ?
                    <Link to='/login' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Login</h4></Nav.Link></Link>
                   : <Link to='/login' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4 onClick={()=> logout()}>Logout</h4></Nav.Link></Link>
               
                }
                    <Link to='/blog' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Blog</h4></Nav.Link></Link>
                </ul>
            </div>
        </div>
        <div className=' col-lg-5 col-10 container ' >
            <div  className='fw-bolder col-10 d-flex justify-content-lg-end justify-content-center container pt-3' style={{ color: '#FFFFFF' }}>
                <ul style={{ listStyle:'none' }} className='text-center text-lg-end px-0'>
                    <h3 className='my-4'>Get a Chatbot for your Website</h3>
                   <h4 >@Zema | All Rights Reserved</h4>
                   <Link to='/create' style={{textDecoration:'none'}}><button type="button" style={{color:'red', backgroundColor:'white'}} className="btn fw-bold mt-3  btn-lg rounded-pill px-5">Try Zema</button></Link>
                    {/* <Link to='/privacy' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Privacy Policy</h4></Nav.Link></Link>
                  <Link to='/terms' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4' ><h4>Terms of Service</h4></Nav.Link></Link> */}
                     
                </ul>
            </div>
        </div>
        <div className=' col-lg-8 col-12 container d-flex justify-content-center '>
        <Link to='/privacy' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4 mx-3' ><h4>Privacy Policy</h4></Nav.Link></Link>
        <Link to='/terms' style={{textDecoration:'none'}}><Nav.Link  href="#link" style={{color:'white'}}  className='my-4 mx-3' ><h4>Terms of Service</h4></Nav.Link></Link>
        </div>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
    </div>
  )
}

export default Footer