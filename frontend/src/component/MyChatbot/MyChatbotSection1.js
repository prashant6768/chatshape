import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import * as jose from 'jose';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import env from 'react-dotenv'
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';



const MyChatbotSection1 = () => {

  // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token, 'notmysecretkey');
  const decoded = Cookies.get('accessToken');
  const [dataArr, setDataArr] = useState([])
  const [botId, setBotId] = useState('')
  const [apiload,setApiload] = useState(false)

  // const BACKEND = 'http://localhost:5000/'
  const BACKEND = 'https://zemaapi.zema.io/'


  useEffect(() => {
    setApiload(true)
    axios.post(`${BACKEND}api/mybots`, { decoded }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => { setDataArr(res.data); console.log(res.data);setApiload(false) }).catch(err => {console.log(" error from mybots", err); setApiload(false)})
    console.log("chk for console log")
  }, [])

  useEffect(() => {
    console.log(botId)
  }, [botId])





  return (
    <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>
      <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>My Chatbots</h1>
      <p className=' col-12 fs-5 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF' }}>Manage your Chatbots</p>

      <div className='col-xl-2 col-lg-4 col-6  d-flex justify-content-center container text-center'>
        <button className='btn btn-primary mb-5  rounded-3 px-0 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }}  variant="primary"><Link to='/create' style={{ textDecoration: 'none',color:'white', width:'100%' }}>Create Chatbots</Link></button>
      </div>

      <div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>
      {/* <Link to='/create' style={{ textDecoration: 'none' }}><button className='btn btn-primary mb-5 col-xl-2 col-lg-4 col-6  d-flex justify-content-center container text-center ' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} >Create Chatbots</button></Link> */}

      <div className='d-flex justify-content-center  flex-wrap  mx-5'>
        {dataArr.map(x => (
          <div className='d-flex my-2' style={{ minHeight: '240px' }}>
            <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
              <Card.Body className="d-flex flex-column" style={{}}>
                <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{x.name}</Card.Title>
                <div className="mt-auto">
                  {
                    x.NoOfCharacters === 'Infinity' ?
                      '' :
                      <div className=' col-12 d-flex justify-content-center container text-center mb-3  mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>Characters Left: {x.NoOfCharacters} </div>
                  }
                  {/* <Link to={`/managebots/${x.id}`} style={{ textDecoration: 'none' }}>
                    <Button
                      value={x.id}
                      onClick={(e) => setBotId(e.target.value)}
                      className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mt-1'
                      style={{ color: '#FFFFFF', backgroundColor: '#620B84' }}
                      variant="primary"
                    >
                      Details
                    </Button>
                  </Link> */}
                  <div className='col-sm-8 col-12 d-flex justify-content-center container text-center mt-1'>
        <Button value={x.id}
                      onClick={(e) => setBotId(e.target.value)}
                      className='fw-bolder px-0 mx-0 col-12 d-flex justify-content-center container text-center '
                      style={{ color: '#FFFFFF', backgroundColor: '#620B84' }}
                      variant="primary"
        ><Link to={`/managebots/${x.id}`} style={{ textDecoration: 'none',color:'white', width:'100%' }}>Details</Link></Button>
      </div>
                </div>
              </Card.Body>
            </Card>
          </div>

        ))}</div>

    </div>
  )
}

export default MyChatbotSection1