import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from 'react-loader-spinner';
import ChatUI from '../ChatUI';

import Button from 'react-bootstrap/Button';
import env from 'react-dotenv'
import Cookies from 'js-cookie';
import ChatUIDemo from '../ChatUIDemo';

const ManageBot = (id) => {

  const navigate = useNavigate();

const[dataArr,setDataArr]= useState({})
const[botname,setBot] = useState('')
const[initialMsg,setInitialMsg]= useState('')
const[sPrompt,setSPrompt]= useState([])
const[prompt,setPrompt]=useState('')
const[url,setUrl]= useState('None')
const[pdf,setPdf]= useState('None')
const [loading, setLoading] = useState(false);
const[togDel,setTogDel]= useState(false)
const[vis,setVis]= useState('Bot Properties')
const BACKEND = 'http://localhost:5000/'
// const[url,setUrl] = useState('')

  useEffect(()=>{
    axios.get(`${BACKEND}/api/updatebot/${id.id}`,{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  }).then(res => {setDataArr(res.data); console.log(res.data)})
  },[])

useEffect(()=>{
 
  setBot(dataArr.botname)
  setPrompt(dataArr.prompt)
  setUrl(dataArr.url)
  setPdf(dataArr.pdf)
  setSPrompt(dataArr.sPrompt)
  setInitialMsg(dataArr.initialMsg)
  console.log(dataArr.initialMsg)
//   setUrl(dataArr.url)
},[dataArr])

const handleSubmit=(e)=>{
    e.preventDefault()
    setLoading(true);
    axios.put(`${BACKEND}/api/updatebot/${id.id}`,{botname,prompt,initialMsg, sPrompt},{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  }).then((res)=>{if(res.data === 'noname'){toast.error('Bot name can,t be empty');  setLoading(false);}else{toast.success('Updated successfully!');  setLoading(false);}}).catch((err)=>{console.log("error manage bots ",err); toast.error('API request failed!'); setLoading(false);})
}

const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    const newScreenWidth = window.innerWidth;
    setScreenWidth(newScreenWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(()=>{
    const textarea = document.getElementById("textareaprompt");
    if(textarea !== null){
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + 20+ "px";
    }
  },[prompt,screenWidth])

  useEffect(()=>{
    const textarea = document.getElementById("textareascript");
    if(textarea !== null){
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + 20+ "px";
  }
  },[prompt,screenWidth])

  useEffect(()=>{
    const textarea = document.getElementById("textareasug");
    if(textarea !== null){
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + 20+ "px";
  }
  },[prompt,screenWidth])

  const handleDelete=async(e)=>{
    e.preventDefault()
    setLoading(true);
    console.log("Delete")
   await axios.post(`${BACKEND}/api/deletebot/${id.id}`,{
      'Content-type':'application/json', 
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*'
}).then((res)=>{if(res.data === 'suc'){toast.success('Bot Deleted');  setLoading(false);}else if(res.data === 'fail'){toast.success('Some Error Occured, Try Again');  setLoading(false);}})
.then( setTimeout(() => { navigate('/mychatbots')}, 3000))
.catch((err)=>{console.log("error manage bots ",err); toast.error('API request failed!'); setLoading(false);})
  //  await navigate('/mychatbots');
  }
  const handleDeleteToggle=(e)=>{
    e.preventDefault()
    setTogDel(!togDel)
  }

  useEffect(()=>{
   console.log(vis)
  },[vis])



  return (
    <div  className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh' ,width:'100vw'}}>
     <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pt-5' style={{ color: '#FFFFFF' }}>Manage Chatbot</h1>
     <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 mt-5' style={{ color: '#FFFFFF' }}>{botname}</h3>
     <div>
      <ul  className='fw-bolder fs-5 row col-12 d-flex justify-content-around   text-center mb-5 mt-5' style={{ color: '#FFFFFF',listStyle:'none' , textDecoration:'none' }}>
       {['Bot Properties','Demo Chat','Change Scrapped Data'].map(x => (

        vis === x?
        <button className='btn btn-link col-lg-4 col-12 fw-bold fs-5' style={{ textDecoration:'underline', color:'#FFFFFF' }} onClick={(e)=>setVis(e.target.value) } value={x} >{x}</button>
  :  <button className='btn btn-link col-lg-4 col-12 fw-bold fs-5 ' style={{ textDecoration:'none', color:'#FFFFFF' }} onClick={(e)=>setVis(e.target.value) } value={x} >{x}</button>
         )) }

        {/* <button className='btn btn-link ' style={{ textDecoration:'none', color:'#FFFFFF' }} onClick={(e)=>setVis(e.target.value) } value='b' >BAAA</button>
        <button className='btn btn-link ' style={{ textDecoration:'none', color:'#FFFFFF' }} onClick={(e)=>setVis(e.target.value) } value='c' >CAAA</button> */}
      </ul>
     </div>
{ vis === 'Bot Properties'?
     <div >
     <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{height:'100%',color:'#FFFFFF'}} >Add this Script to your website to get your chatbot</label>
     <textarea id='textareascript' className='fs-4 d-flex justify-content-center container text-center  mb-3' readOnly style={{height:'100px', width:'95%',}}  placeholder='Script' value={`<script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-try-9/popup.js" defer id="popup" cred="${id.id}"></script>`}/>
     <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{height:'100%',color:'#FFFFFF'}}  >URL used</label>
     <input  className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{width:'95%'}} readOnly placeholder='URL Used' value={url}/>
     <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{height:'100%',color:'#FFFFFF'}}  >Pdf Used</label>
     <input  className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{width:'95%'}} readOnly placeholder='PDF Used' value={pdf}/>

       <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
       <form className='col-sm-9 col-12'>
       <div className="form-group mt-3 mb-3 fw-bold">
       <label>You can update these properties :</label>
       </div>
       <div className="form-group">
       <label>Name of Chatbot</label>
       <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={botname} placeholder='Name of bot' onChange={(e)=> {setBot(e.target.value);}  }  />
       </div>
       <div className="form-group">
       <label>Initial message from the Chatbot</label>
       <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={initialMsg} placeholder='Initial message on starting the chat' onChange={(e)=> {setInitialMsg(e.target.value);}  }  />
       </div>
       <div className="form-group">
       <label>Suggested Prompts from the Chatbot</label>
       <textarea id='textareasug' className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={sPrompt} placeholder='Suggested Prompts (seperate each with ",")' onChange={(e)=> {setSPrompt(e.target.value);}  }  />
       </div>
       <div className="form-group">
       <label>Prompt (Don't remove text and query from the prompt)</label>
       <textarea  id="textareaprompt"  className='fs-4 d-flex justify-content-center container text-center mt-1  mb-3' value={prompt} placeholder='Name of bot' onChange={(e)=> {setPrompt(e.target.value);  e.target.style.height = 'auto';  e.target.style.height = `${e.target.scrollHeight}px`; console.log("scroll",e.target.scrollHeight) }}  />
       </div>
       <div className='form-group'>
       <button className='btn btn-outline-warning px-5 ' onClick={(e)=>handleSubmit(e)}>Update Bot</button>
       </div>
       <div className='form-group mt-3'>
       <button className='btn btn-outline-danger px-5 ' onClick={(e)=>handleDeleteToggle(e)}>Delete Bot</button>
       </div>
       { togDel ?
         <div className='form-group mt-3'>
         <button className='btn btn-danger mx-1 ' onClick={(e)=>handleDelete(e)}>Delete</button>
         <button className='btn btn-secondary mx-1 ' onClick={(e)=>handleDeleteToggle(e)}>No</button>
         </div> : ''
       }
       <div className='form-group d-flex justify-content-center'>
       {loading ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} /> 
        ) : (
          ''
        )}
       </div>
       </form>
       </div>
       </div>:''
}
{ vis === 'Demo Chat'?
<div className=''>

   <ChatUIDemo botID={id.id}/> 
   </div>
    :''
}
{ vis === 'Change Scrapped Data'?
     <div >
     <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{height:'100%',color:'#FFFFFF'}} >REtrys Script to your website to get your chatbot</label>
     <textarea id='textareascript' className='fs-4 d-flex justify-content-center container text-center  mb-3' readOnly style={{height:'100px', width:'95%',}}  placeholder='Script' value={`<script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-try-9/popup.js" defer id="popup" cred="${id.id}"></script>`}/>
     <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{height:'100%',color:'#FFFFFF'}}  >URL used</label>
     <input  className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{width:'95%'}} readOnly placeholder='URL Used' value={url}/>
     <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{height:'100%',color:'#FFFFFF'}}  >Pdf Used</label>
     <input  className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{width:'95%'}} readOnly placeholder='PDF Used' value={pdf}/>

       <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
       <form className='col-sm-9 col-12'>
       <div className="form-group mt-3 mb-3 fw-bold">
       <label>You can update these properties :</label>
       </div>
       <div className="form-group">
       <label>Name of Chatbot</label>
       <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={botname} placeholder='Name of bot' onChange={(e)=> {setBot(e.target.value);}  }  />
       </div>
       <div className="form-group">
       <label>Prompt (Don't remove text and query from the prompt)</label>
       {/* <textarea  id="textareaprompt"  className='fs-4 d-flex justify-content-center container text-center mt-1  mb-3' value={prompt} placeholder='Name of bot' onChange={(e)=> {setPrompt(e.target.value);  e.target.style.height = 'auto';  e.target.style.height = `${e.target.scrollHeight}px`; console.log("scroll",e.target.scrollHeight) }}  /> */}
       </div>
       <div className='form-group'>
       <button className='btn btn-outline-warning px-5 ' onClick={(e)=>handleSubmit(e)}>Update Bot</button>
       </div>
       <div className='form-group mt-3'>
       <button className='btn btn-outline-danger px-5 ' onClick={(e)=>handleDeleteToggle(e)}>Delete Bot</button>
       </div>
       { togDel ?
         <div className='form-group mt-3'>
         <button className='btn btn-danger mx-1 ' onClick={(e)=>handleDelete(e)}>Delete</button>
         <button className='btn btn-secondary mx-1 ' onClick={(e)=>handleDeleteToggle(e)}>No</button>
         </div> : ''
       }
       <div className='form-group d-flex justify-content-center'>
       {loading ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} /> 
        ) : (
          ''
        )}
       </div>
       </form>
       </div>
       </div>:''
}
       <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
    </div>
  )
}


export default ManageBot