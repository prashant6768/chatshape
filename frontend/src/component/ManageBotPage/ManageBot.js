import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from 'react-loader-spinner';
import Button from 'react-bootstrap/Button';
import env from 'react-dotenv'


const ManageBot = (id) => {

const[dataArr,setDataArr]= useState({})
const[botname,setBot] = useState('')
const[prompt,setPrompt]=useState('')
const [loading, setLoading] = useState(false);
const BACKEND = 'http://localhost:5000/'
// const[url,setUrl] = useState('')

  useEffect(()=>{
    axios.get(`${BACKEND}/api/updatebot/${id.id}`,{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  }).then(res => setDataArr(res.data))
  },[])

useEffect(()=>{
 
  setBot(dataArr.botname)
  setPrompt(dataArr.prompt)
//   setUrl(dataArr.url)
},[dataArr])

const handleSubmit=(e)=>{
    e.preventDefault()
    setLoading(true);
    axios.put(`${BACKEND}/updatebot/${id.id}`,{botname,prompt},{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  }).then(()=>{toast.success('Updated successfully!');  setLoading(false);}).catch((err)=>{console.log("error manage bots ",err); toast.error('API request failed!'); setLoading(false);})
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
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + 20+ "px";
  },[prompt,screenWidth])

  useEffect(()=>{
    const textarea = document.getElementById("textareascript");
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + 20+ "px";
  },[prompt,screenWidth])


  return (
    <div  className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh' ,width:'100vw'}}>
     <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pt-5' style={{ color: '#FFFFFF' }}>Manage Chatbot</h1>
     <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 mt-5' style={{ color: '#FFFFFF' }}>{botname}</h3>
     <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{height:'100%',color:'#FFFFFF'}} >Add this Script to your website to get your chatbot</label>
     <textarea id='textareascript' className='fs-4 d-flex justify-content-center container text-center  mb-3' style={{height:'100px', width:'95%',}} placeholder='Name of bot' value={`<script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-try2/popup.js" defer id="popup" cred="${id.id}"></script>`}/>
    
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
       <textarea  id="textareaprompt"  className='fs-4 d-flex justify-content-center container text-center mt-1  mb-3' value={prompt} placeholder='Name of bot' onChange={(e)=> {setPrompt(e.target.value);  e.target.style.height = 'auto';  e.target.style.height = `${e.target.scrollHeight}px`; console.log("scroll",e.target.scrollHeight) }}  />
       </div>
       <div className='form-group'>
       <button className='btn btn-outline-warning px-5 ' onClick={(e)=>handleSubmit(e)}>Update Bot</button>
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

export default ManageBot