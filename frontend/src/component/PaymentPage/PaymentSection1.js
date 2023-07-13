import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import * as jose from 'jose';

const PaymentSection1 = () => {

  // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token, 'notmysecretkey');
  const decoded = document.cookie.split('=')[1]
  const [dataArr, setDataArr] = useState([])
  const[sorted,setSorted]= useState('')
  const BACKEND = 'http://localhost:5000/'

  useEffect(() => {
    axios.post(`${BACKEND}/api/paymenthistory`, { decoded }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => setDataArr(res.data)).catch(err => console.log(" error from mybots", err))
  }, [])

  useEffect(()=>{
      console.log(dataArr)
  },[dataArr])

  return (
    <div div className='pb-5 ' style={{ backgroundColor: '#242439', height: '100%',minHeight:'100vh',width:'100vw' }}>
      <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Payments History</h1>
     {dataArr.sort((a, b) => new Date(b.created) - new Date(a.created)).map(x=>(
      <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0',width:'96%' }} className='mx-xxl-2 mx-2 my-2  d-flex rounded-4'>
      <Card.Body className='d-flex justify-content-center flex-wrap'>
      <p className=' col-12 col-xl-4 col-md-6 d-flex flex-wrap justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>Username: {x.username}</p>
      <p className=' col-12 col-xl-4 col-md-6 d-flex flex-wrap justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>Plan: {x.product.product_id}</p>
      <p className=' col-12 col-xl-4 col-md-6 d-flex flex-wrap justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>Price paid: {x.product.amount/100} {x.payment.currency}</p>
      <p className=' col-12 col-xl-4 col-md-6 d-flex flex-wrap justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>Name: {x.payment.name}</p>
      <p className=' col-12 col-xl-4 col-md-6 d-flex flex-wrap justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>Id: {x.payment.id}</p>
      <p className=' col-12 col-xl-4 col-md-6 d-flex flex-wrap justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>Date: {x.created}</p>

    </Card.Body>
  </Card>
))}

    </div>
  )
}

export default PaymentSection1