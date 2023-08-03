import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner';
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

    const[data,setData]=useState('')
    const[data2,setData2]=useState('')
    const[profileView,setProfileView]= useState(false)
    const[name,setName]= useState('')
    const[phone,setPhone]= useState('')
    const[loading, setLoading] = useState(false);

    useEffect(()=>{
        axios.post(`${BACKEND}api/subdata`,{decoded},{
            'Content-type':'application/json', 
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*',
        }).then(res=> {console.log(res.data);setData(res.data);setData2(res.data[0])}).catch(err => console.log(err))
    },[])

    useEffect(()=>{
        console.log("QQQQQQQQQQ ",decoded)
      axios.post(`${BACKEND}api/profiledata`,{decoded},{
            'Content-type':'application/json', 
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*',
        }).then(res=> { setName(res.data.name); setPhone(res.data.phone); console.log(res.data,"profile")}).catch(err => console.log(err))
    },[])

    const handleProfile=(e)=>{
        e.preventDefault()
        setLoading(true)
        axios.put(`${BACKEND}api/profiledata`,{name,phone,decoded},{
            'Content-type':'application/json', 
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*',
        }).then(res=> {if(res.data=== 'Update Successful'){toast.success(res.data);console.log("AAA",res.data); setLoading(false)}else{toast.error("Updation Failed");console.log("AAA",res.data); setLoading(false)}}).catch(err => {toast.error(err); setLoading(false)})
    }


    return (
        <div className='pb-5' style={{ backgroundColor: '#242439', height: '100%',width:'100vw' }}>

            <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-5' style={{ color: '#FFFFFF' }}>Account</h1>
            {/* <p className='col-12 d-flex justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>Your Account</p> */}
            <Button onClick={()=>setProfileView(!profileView)} className='fw-bolder   fs-5 col-sm-4 col-11 d-flex justify-content-center container text-center py-1 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">Edit Profile Details </Button>
            { profileView ? <div className=' mt-2 d-flex justify-content-center pb-3'>
                <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%' }} className='mx-3 mt-3 rounded-4 col-lg-6 col-11'>
                    <Card.Body className=' d-flex row justify-content-between'>
                <label className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-1 ' style={{color:'white'}}>Enter/Edit Profile Name</label>
                 <input className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-3 ' value={name} placeholder='Name' onChange={(e)=> setName(e.target.value)}  />
                 <label className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-1' style={{color:'white'}}>Enter/Edit Profile Phone Number</label>
                <input className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-3' value={phone.replace(/[^0-9+]/g, '')} placeholder='Phone Number' onChange={(e)=> setPhone(e.target.value)}  />
                <button onClick={(e)=>handleProfile(e)} className=' btn btn-outline-warning col-sm-4 col-8 d-flex justify-content-center container text-center py-2 mb-1' style={{  }} >Update</button>  
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
            <div className=' mt-2 d-flex justify-content-center pb-5'>
                <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%' }} className='mx-3 mt-5 p-2 rounded-4 col-lg-6 col-11'>
                <Card.Text className='fw-bolder fs-4 col-sm-8 col-12 d-flex  justify-content-center container text-start me-auto mb-3' style={{ color: '#FFFFFF' }}>Manage subscription</Card.Text>
                <Card.Text className='s fs-5 col-sm-8 col-12 d-flex  justify-content-center container text-center me-auto mb-3' style={{ color: '#FFFFFF' }}>
                                Subscribed to:  {data2.plan} plan
                                </Card.Text>
                <Card.Text className='s fs-5 col-sm-8 col-12 d-flex  justify-content-center container text-center me-auto mb-3' style={{ color: '#FFFFFF', wordBreak:'break-all' }}>Email: {data[1]}</Card.Text>
                <Card.Text className='s fs-5 col-sm-8 col-12 d-flex  justify-content-center container text-center me-auto mb-3' style={{ color: '#FFFFFF' }}>Bought on: {data[2]}</Card.Text>
                <Card.Text className='s fs-5 col-sm-8 col-12 d-flex  justify-content-center container text-center me-auto mb-3' style={{ color: '#FFFFFF' }}>Expiry on: {data[3]}</Card.Text>
                <Card.Text className='s fs-5 col-sm-8 col-12 d-flex  justify-content-center container text-center me-auto mb-3' style={{ color: '#FFFFFF' }}>Bots left: {data2.NoOfBots}</Card.Text>
                {/* <Card.Text className='s fs-5 col-sm-8 col-12 d-flex  justify-content-center container text-center me-auto mb-3' style={{ color: '#FFFFFF' }}>Characters Left: {data2.NoOfCharacters}</Card.Text> */}
                <Card.Text className='s fs-5 col-sm-8 col-12 d-flex  justify-content-center container text-center me-auto mb-3' style={{ color: '#FFFFFF' }}>Messages Left: {data2.NoOfMsg}</Card.Text>
                
                    <div className='row d-flex justify-content-between'>
                   <Link to='/pricing' style={{textDecoration:'none'}}><Button className='fw-bolder fs-4 col-sm-4 col-12 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">Go Pro</Button></Link>
                   <Link to='/paymenthistory' style={{textDecoration:'none'}}><Button className='fw-bolder fs-4 col-sm-4 col-12 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">View Payment History</Button></Link>
                    
                    </div>
                </Card> 
            </div>

            <div className=' mt-2 d-flex justify-content-center pb-5'>
                <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%' }} className='mx-3 mt-5 p-2 rounded-4 col-lg-6 col-11'>
                    <p className='fw-bolder fs-5 col-12 d-flex justify-content-center container text-center mb-3 pb-3' style={{ color: '#FFFFFF' }}>Manage your Chatbots</p>
                    <div className='row d-flex justify-content-between'>
                   <Link to='/create' style={{textDecoration:'none'}}> <Button className='fw-bolder fs-4 col-sm-4 col-12 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">Create Chatbot</Button></Link>
                   <Link to='/mychatbots' style={{textDecoration:'none'}}><Button className='fw-bolder fs-4 col-sm-4 col-12 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">View Chatbot</Button></Link>
                    
                    </div>
                </Card> 
            </div>
            <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF' }}>After Extension Install :</h1>
            <p className=' col-12 d-flex justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>1. Open the extension by clicking on the pinned chrome extension icon</p>
            <p className=' col-12 d-flex justify-content-center container fs-5 text-center pb-5' style={{ color: '#FFFFFF' }}>2. Click on the robot emoji in the extension popup, while you are on your chatshape account page. Thats it!</p>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
        </div>
    )
}

export default AccountSection1