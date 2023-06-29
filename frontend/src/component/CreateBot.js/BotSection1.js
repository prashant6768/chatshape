import React,{useState,useEffect} from 'react'
import axios from 'axios'
import * as jose from 'jose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from 'react-loader-spinner';

const BotSection1 = () => {

  const token = document.cookie.split('=')[1]
  const decoded = jose.decodeJwt(token,'notmysecretkey');

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

   await axios.post("http://127.0.0.1:5000/api/sendLinkData",{sendLink,decoded,botName,exclude},{
              'Content-type':'application/json', 
              'Accept':'application/json',
              'Access-Control-Allow-Origin':'*',
          }).then(()=>{ toast.success('Stored successfully!');  setLoading(false);}).catch(err => {console.log("error  botsection 1 ",err); toast.error('API request failed!'); setLoading(false);})
    console.log(sendLink,botName,decoded)
  }

  return (
    <div style={{ backgroundColor: '#242439', height: '100%', minHeight:'100vh', width:'100vw' }}>
     <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pb-5 pt-5' style={{ color: '#FFFFFF' }}>Create Chatbot</h1>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center pb-2 pt-3' style={{ color: '#FFFFFF' }}>1. Enter the website you want to create a bot from.</p>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>2. The website will be crawled and pages extracted.</p>
       <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>
      <form className='col-sm-9 col-12'>
       <div className="form-group">
       <input className='fs-4 d-flex justify-content-center container text-center mb-3 ' value={sendLink} placeholder='website link' onChange={(e)=> setSendLink(e.target.value)}  />
       </div>
       <div className="form-group">
       <textarea className='fs-4 d-flex justify-content-center container text-center mb-3 ' value={ex} placeholder='link to exclude' onChange={(e)=> setEx(e.target.value)}  />
       </div>
       <div className="form-group">
       <input className='fs-4 d-flex justify-content-center container text-center mb-3' value={botName} placeholder='Name of bot' onChange={(e)=> setBot(e.target.value)}  />
       </div>
       <div className='form-group'>
       <button className='btn btn-outline-warning px-5 ' onClick={(e)=>handleSubmit(e)}>Submit</button>
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