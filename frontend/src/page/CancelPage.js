import React from 'react'
import env from 'react-dotenv'
import NavbarC from '../component/NavbarC';
import Footer from '../component/Footer';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'


const CancelPage = () => {

  const BACKEND = 'http://localhost:5000/'
  const gradientC = true

  return (
    <div style={{width:'100vw'}}>
    <NavbarC gradientC={gradientC}/>
    <div className='d-flex justify-content-center' style={{paddingTop:'100px', paddingBottom:'150px', backgroundColor: '#242439', height:'100%'}}>
      <div className="card" style={{width: '17rem', backgroundColor:'#171725'}}>
  <div className="card-body" style={{color:'white'}}>
  <h1 className="card-title py-5 text-center">SORRY</h1>
    <h5 className="card-title py-3 text-center">Payment was Cancelled</h5>
    <Link className='col-sm-5 ms-sm-auto col-11 my-2' to='/pricing' style={{ textDecoration: 'none' }}><Button className='fw-bolder fs-5 rounded-3  d-flex justify-content-center container text-center  mb-1' style={{ color: '#FFFFFF', backgroundColor: '#242439', borderColor: '#FFFFFF', borderWidth: '2px' }} variant="primary">Go Back</Button></Link>

  </div>
</div>  
    </div>
    <Footer/>
    </div>
  )
}

export default CancelPage