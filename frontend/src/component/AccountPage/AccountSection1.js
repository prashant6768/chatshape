import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import * as jose from 'jose';
import Cookies from 'js-cookie';


const AccountSection1 = () => {

    // const token = document.cookie.split('=')[1]
    // const decoded = jose.decodeJwt(token, 'notmysecretkey');
    // const decoded = document.cookie.split('=')[1]
    const decoded = Cookies.get('accessToken');
    const BACKEND = 'http://localhost:5000/'
    // const BACKEND = 'http://3.19.246.7/'

    const [data, setData] = useState('')
    const [data2, setData2] = useState('')
    const [profileView, setProfileView] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.post(`${BACKEND}api/subdata`, { decoded }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }).then(res => { console.log(res.data); setData(res.data); setData2(res.data[0]) }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log("QQQQQQQQQQ ", decoded)
        axios.post(`${BACKEND}api/profiledata`, { decoded }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }).then(res => { setName(res.data.name); setPhone(res.data.phone); console.log(res.data, "profile") }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log("data = ", data, "  data2 = ", data2)
    }, [data, data2])

    const handleProfile = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.put(`${BACKEND}api/profiledata`, { name, phone, decoded }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }).then(res => { if (res.data === 'Update Successful') { toast.success(res.data); console.log("AAA", res.data); setLoading(false) } else { toast.error("Updation Failed"); console.log("AAA", res.data); setLoading(false) } }).catch(err => { toast.error(err); setLoading(false) })
    }


    return (
        <div className='' style={{ backgroundColor: '#242439', height: '100%', width: '100vw' }}>

            <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-5' style={{ color: '#FFFFFF' }}>Account</h1>
            {/* <p className='col-12 d-flex justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>Your Account</p> */}
            <Button onClick={() => setProfileView(!profileView)} className='fw-bolder   fs-5  col-xl-5 col-xxl-4 col-lg-6  col-sm-9 col-10 d-flex justify-content-center container text-center py-1 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">Edit Profile Details </Button>
            {profileView ? <div className=' mt-2 d-flex justify-content-center pb-3'>
                <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%' }} className='mx-3 mt-3 rounded-4 col-lg-6 col-11'>
                    <Card.Body className=' d-flex row justify-content-between'>
                        <label className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-1 ' style={{ color: 'white' }}>Enter/Edit Profile Name</label>
                        <input className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-3 ' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                        <label className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-1' style={{ color: 'white' }}>Enter/Edit Profile Phone Number</label>
                        <input className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-3' value={phone.replace(/[^0-9+]/g, '')} placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} />
                        <button onClick={(e) => handleProfile(e)} className=' btn btn-outline-warning col-sm-4 col-8 d-flex justify-content-center container text-center py-2 mb-1' style={{}} >Update</button>
                        <div className='form-group d-flex justify-content-center'>
                            {loading ? (
                                <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />

                            ) : (
                                ''
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div> : ''}
            <div className=' mt-5 d-flex justify-content-center pb-5' style={{ backgroundColor: '#171725' }} >
                <Card style={{ backgroundColor: '#171725', height: '100%', border: 'none' }} className='mx-1 mx-sm-3 mt-5 p-2  col-xl-5 col-xxl-4 col-lg-6  col-sm-9 col-12'>
                    <Card.Text className='fw-bolder fs-2 col-sm-8 col-12 d-flex  justify-content-center container text-center me-auto mb-5' style={{ color: '#FFFFFF' }}>Manage subscription</Card.Text>
                    <Card style={{ backgroundColor: '#242439', height: '100%', border: 'none' }} className=' mt-4 p-2   col-12'>
                        <Card.Text className='fs-5  d-flex  justify-content-center container text-center  ' style={{ color: '#FFFFFF' }}>
                            Subscribed to: <br/> {data2.plan} plan
                        </Card.Text>
                    </Card>
                    <Card style={{ backgroundColor: '#242439', height: '100%', border: 'none' }} className=' mt-4 p-2  col-12'>
                        <Card.Text className='fs-5 px-0  d-flex  justify-content-center container text-center ' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Email: <br/> {data[1]}</Card.Text>
                    </Card>
                    <div className='row col-12 mx-auto  d-flex justify-content-around'>
                        <Card style={{ backgroundColor: '#242439', height: '100%', border: 'none' }} className=' mt-4 p-2  col-sm-5 me-auto col-12'>
                            <Card.Text className='fs-5  d-flex  justify-content-center container text-center ' style={{ color: '#FFFFFF' }}>Bought on:<br/> {data[2]}</Card.Text>
                        </Card>
                        <Card style={{ backgroundColor: '#242439', height: '100%', border: 'none' }} className='mt-4 p-2  col-sm-5 ms-auto col-12'>
                            <Card.Text className='fs-5  d-flex  justify-content-center container text-center ' style={{ color: '#FFFFFF' }}>Expiry on:<br/> {data[3]}</Card.Text>
                        </Card>
                    </div>
                    <div className='row col-12 mb-5 mx-auto d-flex justify-content-around'>
                        <Card style={{ backgroundColor: '#242439', height: '100%', border: 'none' }} className=' mt-4 p-2  col-sm-5 col-12'>
                            <Card.Text className='fs-5  d-flex  justify-content-center container text-center' style={{ color: '#FFFFFF' }}>Bots left:<br/> {data2.NoOfBots}</Card.Text>
                        </Card>
                        {data2.tokens > 1 ?
                            <Card style={{ backgroundColor: '#242439', height: '100%', border: 'none' }} className=' mt-4 p-2 ms-auto col-sm-5 col-12'>
                                <Card.Text className='fs-5  d-flex  justify-content-center container text-center ' style={{ color: '#FFFFFF'}}>Tokens Left:<br/> {data2.tokens}</Card.Text>
                            </Card>
                            :
                            <Card style={{ backgroundColor: '#242439', height: '100%', border: 'none' }} className=' mt-4 p-2 ms-auto col-sm-5 col-12'>
                                <Card.Text className=' fs-5  d-flex  justify-content-center container text-center ' style={{ color: '#FFFFFF' }}>Tokens Left:<br/> 0</Card.Text>
                            </Card>
                        }
                    </div>
                    {/* <Card.Text className='s fs-5 col-sm-8 col-12 d-flex  justify-content-start container text-center me-auto mb-3' style={{ color: '#FFFFFF' }}>Messages Left: {data2.NoOfMsg}</Card.Text> */}

                    {/* <div className='row d-flex justify-content-between'>
                        <Link to='/pricing' style={{ textDecoration: 'none' }}><Button className='fw-bolder fs-4 col-sm-4 col-12 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">Go Pro</Button></Link>
                        <Link to='/paymenthistory' style={{ textDecoration: 'none' }}><Button className='fw-bolder fs-4 col-sm-4 col-12 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">View Payment History</Button></Link>
                    </div> */}
                    <div className='row d-flex justify-content-center'>
                        <Link className='col-sm-5 me-sm-auto col-11 my-2' to='/pricing' style={{}}> <Button className='fw-bolder fs-5 link d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF' }} variant="link">Get a Chatbot</Button></Link>
                        <Link className='col-sm-5 ms-sm-auto col-11 my-2' to='/paymenthistory' style={{ textDecoration: 'none' }}><Button className='fw-bolder fs-4 rounded-3  d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#242439', borderColor: '#FFFFFF', borderWidth: '2px' }} variant="primary">Transactions</Button></Link>
                    </div>
                </Card>
            </div>

            <div className=' mt-2 d-flex justify-content-center pb-5' >
                <div style={{ height: '100%' }} className='mx-3 mt-5 p-2 col-xl-5 col-xxl-4 col-lg-6  col-sm-9 col-11'>
                    <h1 className='fw-bolder fs-2 col-12 d-flex justify-content-center container text-center mb-5 pb-3' style={{ color: '#FFFFFF', marginTop: '50px' }}>Manage your Chatbots</h1>
                    <div className='row d-flex justify-content-center mb-5'>
                        <Link className='col-sm-5 me-sm-auto col-11 my-2' to='/create' style={{}}> <Button className='fw-bolder fs-5 link d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF' }} variant="link">Create Chatbot</Button></Link>
                        <Link className='col-sm-5 ms-sm-auto col-11 my-2' to='/mychatbots' style={{ textDecoration: 'none' }}><Button className='fw-bolder fs-5 rounded-3  d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#242439', borderColor: '#FFFFFF', borderWidth: '2px' }} variant="primary">View Chatbot</Button></Link>
                    </div>
                </div>
            </div>

            {/* <div className='pb-5 pt-5' style={{backgroundColor: '#171725'}}>
            <h1 className='fw-bolder col-11 d-flex justify-content-center  text-center mx-auto mb-5' style={{ color: '#FFFFFF', marginTop:'50px' }}>After Extension Install :</h1>
            <p className=' col-11 d-flex justify-content-center mx-auto fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>1. Open the extension by clicking on the pinned chrome extension icon</p>
            <p className=' col-11 d-flex justify-content-center mx-auto fs-5 text-center pb-5' style={{ color: '#FFFFFF' }}>2. Click on the robot emoji in the extension popup, while you are on your chatshape account page. Thats it!</p>
            </div> */}
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
        </div>
    )
}

export default AccountSection1