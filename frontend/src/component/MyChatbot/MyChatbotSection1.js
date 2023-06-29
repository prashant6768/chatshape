import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import * as jose from 'jose';
import axios from 'axios'
import Button from 'react-bootstrap/Button';

const MyChatbotSection1 = () => {

  const token = document.cookie.split('=')[1]
  const decoded = jose.decodeJwt(token, 'notmysecretkey');
  const [dataArr, setDataArr] = useState([])
  const [botId,setBotId]=useState('')

  useEffect(() => {
    axios.post('http://127.0.0.1:5000/api/mybots', { decoded }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => setDataArr(res.data)).catch(err => console.log(" error from mybots", err))
  }, [])

 useEffect(()=>{
  console.log(botId)
 },[botId])



  return (
    <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh',width:'100vw' }}>
      <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4' style={{ color: '#FFFFFF' }}>My Chatbots</h1>
      <p className=' col-12 fs-5 d-flex justify-content-center container text-center pb-5' style={{ color: '#FFFFFF' }}>Manage your Chatbots</p>
      <Link to='/create' style={{ textDecoration: 'none' }}><button className='btn btn-primary col-xl-2 col-lg-4 col-6  d-flex justify-content-center container text-center ' style={{ color: '#FFFFFF' }} >Create Chatbots</button></Link>
      <div className='d-flex justify-content-center flex-wrap'>
        {dataArr.map(x => (
          <div  className=' mx-2 my-2' style={{ width: '300px' }}>
            <Card  style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%' }} className='mx-xxl-0 mx-1 mt-5 rounded-4'>
              <Card.Body>
                <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-3 mt-3 fs-3' style={{ color: '#FFFFFF' }} >{x.name}</Card.Title>
                <Link to={`/managebots/${x.id}`} style={{ textDecoration: 'none' }}><Button value={x.id} onClick={(e)=>setBotId(e.target.value)}  className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor:'#620B84' }}  variant="primary">Details</Button></Link>
              </Card.Body>
            </Card>
          </div>
        ))}</div>

    </div>
  )
}

export default MyChatbotSection1