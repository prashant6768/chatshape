import React,{useState,useEffect} from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import Cookies from 'js-cookie';

const SuccessPage = () => {

  const BACKEND = 'http://localhost:5000/'
  const[data,setData]=useState('')
  const[product,setProduct]=useState('')
  const[user,setUser]=useState('')
  const[date,setDate]=useState('')
  const[time,setTime]=useState('')

    // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token, 'notmysecretkey');
  const decoded = Cookies.get('accessToken');

useEffect(()=>{
  
axios.post(`${BACKEND}stripepay/order/success`,{decoded},{
  'Content-type':'application/json', 
  'Accept':'application/json',
  'Access-Control-Allow-Origin':'*',
}).then(res => {console.log(res.data); setData(res.data[0]);setProduct(res.data[1]);setUser(res.data[2]) })

},[])

useEffect(()=>{
  const timestamp = data.created;

  const dateObj = new Date(timestamp * 1000);

  // Extract the date and time components from the Date object
   setDate(dateObj.toLocaleDateString());
  setTime(dateObj.toLocaleTimeString())


},[data])

  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className="card" style={{width: '18rem', backgroundColor:'whitesmoke'}}>
  <div className="card-body">
    <h1>Zema</h1>
    <h5 className="card-title mb-3"> Payment was Successful</h5>
    <p>Zema User: {user}</p>
    <p>Payment made at: {time}</p>
    <p>Payment made at: {date}</p>
    <p>Email: {data.email}</p>
    <p>Name: {data.name}</p>
    <p>ID: {data.id}</p>
    <p>Plan: {product.product_id}</p>
    <p>Price: {product.amount/100} {product.currency}</p>
    <button type="button" className="btn btn-primary"><a href='http://localhost:3000/' style={{textDecoration:'none', color:'white'}} className="card-link">Back to Home page</a></button>
  
  </div>
</div>  
    </div>
  )
}

export default SuccessPage