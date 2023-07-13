import React,{useState,useEffect} from 'react'
import axios from 'axios'
import * as jose from 'jose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from 'react-loader-spinner';
import env from 'react-dotenv'


const BotSection1 = () => {

  // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token,'notmysecretkey');
  const decoded = document.cookie.split('=')[1]
  const BACKEND = 'http://localhost:5000/'

  const[sendLink,setSendLink]= useState('')
  const[botName,setBot]=useState('')
  const[exclude,setExclude] =useState('')
  const[ex,setEx]=useState('')
  const[loading, setLoading] = useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true); 
    const lines = ex.split('\n');
    const trimmedLines = lines.map((line) => line.trim());
    const filteredLines = trimmedLines.filter((line) => line !== '');
    setExclude(filteredLines);

   await axios.post(`${BACKEND}/api/sendLinkData`,{sendLink,decoded,botName,exclude},{
              'Content-type':'application/json', 
              'Accept':'application/json',
              'Access-Control-Allow-Origin':'*',
          }).then(res=>{if(res.data == 'BotF'){ toast.error('You have Finished all your Bots, upgrade subscription for more'); setLoading(false);}else if(res.data == 'SubE'){ toast.error('Your Subscription has Expired, renew subscription for more'); setLoading(false);}else{toast.success('Stored successfully!'); console.log(res); setLoading(false);}}).catch(err => {console.log("error  botsection 1 ",err); toast.error('API request failed!'); setLoading(false);})
    console.log(sendLink,botName,decoded)
  }

  return (
    <div style={{ backgroundColor: '#242439', height: '100%', minHeight:'100vh', width:'100vw' }}>
     <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pb-5 pt-5' style={{ color: '#FFFFFF' }}>Create Chatbot</h1>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center pb-2 pt-3 mb-0' style={{ color: '#FFFFFF' }}>1. Enter the website you want to create a bot from.</p>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-2 pt-3' style={{ color: '#FFFFFF' }}>2. The website will be crawled and pages extracted.</p>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>3. Go to My Bots page, click on your Bot, and copy the scipt to add to your website.</p>
       
       <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>
      <form className='col-sm-9 col-12'>
       <div className="form-group">
        <label>Website Link you want the chatbot about</label>
       <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' value={sendLink} placeholder='website link' onChange={(e)=> setSendLink(e.target.value)}  />
       </div>
       <div className="form-group">
       <label>Pages you want to exclude from the chatbot (Write each individual link in seperate line)</label>
       <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' value={ex} placeholder='link to exclude' onChange={(e)=> setEx(e.target.value)}  />
       </div>
       <div className="form-group">
       <label>Name of Bot</label>
       <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={botName} placeholder='Name of bot' onChange={(e)=> setBot(e.target.value)}  />
       </div>
       <div className='form-group'>
       <button className='btn btn-outline-warning px-5 ' onClick={(e)=>handleSubmit(e)}>Create Bot</button>
       </div>
       <div className='form-group d-flex justify-content-center'>
       {loading ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
       </div>
       </form>
       </div>
      
       <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
    </div>
  )
}

export default BotSection1