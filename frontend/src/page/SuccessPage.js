import React,{useState,useEffect} from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import Cookies from 'js-cookie';
import NavbarC from '../component/NavbarC';
import Footer from '../component/Footer';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner';

const SuccessPage = () => {

  // const BACKEND = 'http://localhost:5000/'
  // const BACKEND = 'https://zemaapi.zema.io/'
  const BACKEND = process.env.REACT_APP_BACKEND
  
  const[data,setData]=useState('')
  const[product,setProduct]=useState('')
  const[user,setUser]=useState('')
  const[date,setDate]=useState('')
  const[time,setTime]=useState('')
  const[apiload,setApiload]= useState(false)

    // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token, 'notmysecretkey');
  const decoded = Cookies.get('accessToken');

useEffect(()=>{

  setApiload(true)
  
axios.post(`${BACKEND}stripepay/order/success`,{decoded},{
  'Content-type':'application/json', 
  'Accept':'application/json',
  'Access-Control-Allow-Origin':'*',
}).then(res => {console.log(res.data); setData(res.data[0]);setProduct(res.data[1]);setUser(res.data[2]); setApiload(false) })

},[])

useEffect(()=>{
  const timestamp = data.created;

  const dateObj = new Date(timestamp * 1000);

  // Extract the date and time components from the Date object
   setDate(dateObj.toLocaleDateString());
  setTime(dateObj.toLocaleTimeString())


},[data])

const gradientC = true

  return (
    <div style={{width:'100vw'}}>
      <NavbarC gradientC={gradientC}/>
    <div className='d-flex justify-content-center ' style={{paddingTop:'100px', paddingBottom:'150px', backgroundColor: '#242439', height:'100%'}}>
      <div className="card" style={{width: '17rem', backgroundColor:'#171725'}}>
  <div className="card-body" style={{color:'white'}}>
    <h1>Zema</h1>
    <h5 className="card-title mb-3"> Payment was Successful</h5>
    <div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>
    <p><strong>Zema User: </strong>{user}</p>
    <p><strong>Payment made at: </strong>{time}</p>
    <p><strong>Payment made at: </strong>{date}</p>
    <p><strong>Email: </strong>{data.email}</p>
    <p><strong>Name: </strong>{data.name}</p>
    <p><strong>ID: </strong>{data.id}</p>
    <p><strong>Plan: </strong>{product.product_id}</p>
    <p><strong>Price: </strong>{product.amount/100} {product.currency}</p>
    {/* <button type="button" className="btn btn-outline-warning"><a href='http://localhost:3000/' style={{textDecoration:'none', color:'white'}} className="card-link">Back to Home page</a></button> */}
    <Link className='col-sm-5 ms-sm-auto col-11 my-2' to='/' style={{ textDecoration: 'none' }}><Button className='fw-bolder fs-5 rounded-3  d-flex justify-content-center container text-center  mb-1' style={{ color: '#FFFFFF', backgroundColor: '#242439', borderColor: '#FFFFFF', borderWidth: '2px' }} variant="primary">Zema</Button></Link>
   
  
  </div>
</div>  
    </div>
    <Footer/>
    </div>
  )
}

export default SuccessPage