import React,{useState,useEffect} from 'react'
import axios from 'axios'
import * as jose from 'jose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from 'react-loader-spinner';
import env from 'react-dotenv'
import Cookies from 'js-cookie';
import '../CreateBot/createbotcss.css'
import { useNavigate } from 'react-router-dom';

const BotSection1 = () => {

  const navigate = useNavigate();

  // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token,'notmysecretkey');
  // const decoded = document.cookie.split('=')[1]
  const decoded = Cookies.get('accessToken');
  console.log("------------decoded",decoded)
  // const BACKEND = 'http://localhost:5000/'
  // const BACKEND = 'http://3.138.169.250/'
  const BACKEND = 'https://api.zema.io/'

  const[sendLink,setSendLink]= useState('')
  const[botName,setBot]=useState('')
  const[exclude,setExclude] =useState('')
  const[ex,setEx]=useState('')
  const [pdfFile, setPdfFile] = useState(null);
  const[loading, setLoading] = useState(false);


  // old way of submit, no pdf
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true); 
    const lines = ex.split('\n');
    const trimmedLines = lines.map((line) => line.trim());
    const filteredLines = trimmedLines.filter((line) => line !== '');
    setExclude(filteredLines);
  }

  useEffect(()=>{
    if(botName !== ''){
      console.log(exclude,'---exclude')

      const formData = new FormData();
    formData.append('sendLink', sendLink);
    formData.append('exclude', exclude);
    formData.append('botName', botName);
    formData.append('pdfFile', pdfFile);
    formData.append('decoded', decoded); 

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

     axios.post(`${BACKEND}api/sendLinkData`,formData,{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*',
    })
    // .then(res =>console.log("FROM BACKEND = ",res.data)).catch(err => console.log(err))
    .then(res=>{if(res.data == 'BotF'){ toast.error('You have Finished all your Bots, upgrade subscription for more'); setLoading(false);}else if(res.data == 'FillOne'){ toast.error('Atleast fill one of these, PDF or website URL'); setLoading(false);}else if(res.data == 'SubE'){ toast.error('Your Subscription has Expired, renew subscription for more'); setLoading(false);}else if(res.data == 'noname'){ toast.error('Botname is compulsary'); setLoading(false);}else if(res.data === 'ok'){toast.success('Stored successfully!'); console.log(res.data,"CHKKKKKKKKKKKK"); setLoading(false);setTimeout(() => { navigate('/mychatbots') }, 2000)}else{toast.error('Some Error Occured!!'); console.log("==========",res.data,"CHKKKKKKKKKKKK"); setLoading(false)}}).catch(err => {console.log("error  botsection 1 ",err); toast.error('API request failed!'); setLoading(false);})
    console.log(formData)
    }

},[exclude])
 


  return (
    <div style={{ backgroundColor: '#242439', height: '100%', minHeight:'100vh', width:'100vw' }}>
     <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pb-5 pt-5' style={{ color: '#FFFFFF' }}>Create Chatbot</h1>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center pb-2 pt-3 mb-0' style={{ color: '#FFFFFF' }}>1. Enter the website / PDF you want to create a bot from.</p>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-2 pt-3' style={{ color: '#FFFFFF' }}>2. The website / PDF will be crawled and pages extracted.</p>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>3. Go to My Bots page, click on your Bot, and copy the scipt to add to your website.</p>
       
       <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>

       {/* --------------------------------------multipart formdata pdf -------------------------------- */}


       <form className='col-sm-9 col-12'>
       <div className="form-group">
        <label>Website Link you want the chatbot about</label>
       <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' value={sendLink} placeholder='website link' onChange={(e)=> setSendLink(e.target.value)}  />
       </div>
       <div className="form-group">
       <label>Pages you want to exclude from the chatbot (Write each individual link in seperate line)</label>
       <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' value={ex} placeholder='link to exclude' onChange={(e)=> setEx(e.target.value)}  />
       </div>
       <div className="form-group mt-4 mb-3 d-flex justify-content-around flex-wrap">
        <label className='me-2'>PDF File:</label>
        <input
          type="file"
          accept=".pdf"
          style={{backgroundColor:'white',color:'black', borderRadius:'0px'}}
          className="btn custom-file-input w-100 me-auto"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
      </div>
       <div className="form-group">
       <label>Name of Bot</label>
       <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={botName} placeholder='Name of bot' onChange={(e)=> setBot(e.target.value)}  />
       </div>
       <div className='form-group'>
        { botName !== '' && loading !== true ?
       <button className='btn btn-outline-warning px-5 ' onClick={(e)=>handleSubmit(e)}>Create Bot</button>
       :  <button disabled='true' className='btn btn-outline-warning px-5 ' onClick={(e)=>handleSubmit(e)}>Create Bot</button>
       
        }
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