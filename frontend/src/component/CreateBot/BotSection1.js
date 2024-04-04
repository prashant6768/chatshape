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
import { Tooltip as Tp}  from 'react-tooltip'

const BotSection1 = () => {

  const navigate = useNavigate();

  // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token,'notmysecretkey');
  // const decoded = document.cookie.split('=')[1]
  const decoded = Cookies.get('accessToken');
  const token = Cookies.get('token');

  console.log("-----------decoded",decoded)

  // const BACKEND = 'http://localhost:5000/'
  // const BACKEND = 'https://zemaapi.zema.io/'
  const BACKEND = process.env.REACT_APP_BACKEND


  const[sendLink,setSendLink]= useState('')
  const[botName,setBot]=useState('')
  const[exclude,setExclude] =useState('')
  const[ex,setEx]=useState('')
  const [pdfFile, setPdfFile] = useState(null);
  const[loading, setLoading] = useState(false);

  const [multiLink, setMultiLink] = useState(false);

 

  const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      setMultiLink("Y")
    } else {
      setMultiLink("N")
    }
  };

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
console.log(multiLink)
  },[multiLink])

  useEffect(()=>{
    if(botName !== ''){
      console.log(exclude,'---exclude')

      const formData = new FormData();
    formData.append('sendLink', sendLink);
    formData.append('exclude', exclude);
    formData.append('multiLink',multiLink);
    formData.append('botName', botName);
    formData.append('decoded', decoded); 

    // formData.append('pdfFile', pdfFile);

    if (pdfFile) {
      for (let i = 0; i < pdfFile.length; i++) {
        formData.append(`pdfFile[]`, pdfFile[i]);
        console.log(`pdfFile[]`, pdfFile[i])
      }
    }
    
    console.log("111111111111111111--------",multiLink)

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

     axios.post(`${BACKEND}api/sendLinkData`,formData,{headers:{
        'Content-type':'multipart/form-data', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${token}`,
    }})
    
    
    // .then(res =>console.log("FROM BACKEND = ",res.data)).catch(err => console.log(err))
    .then(res=>{
      if(res.data == 'BotF'){ toast.error('You have Finished all your Bots, upgrade subscription for more'); setLoading(false);}
      else if(res.data == 'FillOne'){ toast.error('Atleast fill one of these, PDF or website URL'); setLoading(false);}
      else if(res.data == 'SubE'){ toast.error('Your Subscription has Expired, renew subscription for more'); setLoading(false);}
      else if(res.data == 'noname'){ toast.error('Botname is compulsary'); setLoading(false);}
      else if(res.data === 'ok'){toast.success('Stored successfully!'); console.log(res.data," working"); setLoading(false);setTimeout(() => { navigate('/mychatbots') }, 2000)}
      else{toast.error('Some Error Occured!!'); console.log("==========",res.data,"not woring"); setLoading(false)}})
      .catch(err => {console.log("error  botsection 1 ",err); toast.error('API request failed!'); setLoading(false);})
    console.log(formData)
    }

},[exclude])
 


  return (
    <div style={{ backgroundColor: '#242439', height: '100%', minHeight:'100vh', width:'100vw' }}>
     <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pb-5 pt-5' style={{ color: '#FFFFFF' }}>Create Chatbot</h1>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center pb-2 pt-3 mb-0' style={{ color: '#FFFFFF' }}>1. Enter the website / PDF you want to create a bot from.</p>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-2 pt-3' style={{ color: '#FFFFFF' }}>2. The website / PDF will be crawled and pages extracted.</p>
        <p className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>3. Go to My Chatbots page, click on your Bot, and copy the scipt to add to your website.</p>
       
       <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>

       {/* --------------------------------------multipart formdata pdf -------------------------------- */}


       <form className='col-sm-9 col-12'>
       <div className="form-group ">
        <label>Website Link you want the chatbot about</label>
       <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' value={sendLink} placeholder='website link' onChange={(e)=> setSendLink(e.target.value)}  />
       </div>
       <div className="form-check form-switch mt-1 ps-0 d-flex justify-content-center flex-wrap mb-3 ">
      <input
        className="form-check-input my-anchor-element col-12  mx-1"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onChange={handleCheckboxChange}
      />
       {/* <a className='my-anchor-element col-12 '> */}
      <label className="form-check-label   col-12" style={{color:'white'}} htmlFor="flexSwitchCheckDefault">
        Scrap data from Urls found inside the above url.
      </label>
      {/* </a> */}
      <Tp anchorSelect=".my-anchor-element" style={{ backgroundColor: "rgba(255, 255, 255,1)", color: "#000000",fontWeight:'bolder',width:'90vw' }} place="top">
  In "Off State", the chatbot will have data from only the URL provided. <br/> In "On State", the chatbot will also have data from additional webpages whose URLs it finds in the given webpage 
</Tp>
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
          className="btn custom-file-input w-100 me-auto my-anchor-element-pdf"
          multiple
          onChange={(e) => setPdfFile(e.target.files)}
        />
          <Tp anchorSelect=".my-anchor-element-pdf" style={{ backgroundColor: "rgba(255, 255, 255,1)", color: "#000000",fontWeight:'bolder',width:'90vw' }} place="top">
You can use multiple PDF files as knowledge base.
</Tp>
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