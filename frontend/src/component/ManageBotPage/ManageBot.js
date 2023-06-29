import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from 'react-loader-spinner';
import Button from 'react-bootstrap/Button';

const ManageBot = (id) => {

const[dataArr,setDataArr]= useState({})
const[botname,setBot] = useState('')
const[prompt,setPrompt]=useState('')
const [loading, setLoading] = useState(false);
// const[url,setUrl] = useState('')

  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/api/updatebot/${id.id}`,{
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
    axios.put(`http://127.0.0.1:5000/api/updatebot/${id.id}`,{botname,prompt},{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  }).then(()=>{toast.success('Updated successfully!');  setLoading(false);}).catch((err)=>{console.log("error manage bots ",err); toast.error('API request failed!'); setLoading(false);})
}

  return (
    <div  className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh' ,width:'100vw'}}>
     <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pb-5 pt-5' style={{ color: '#FFFFFF' }}>Manage Chatbot</h1>
     <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pb-5 pt-5' style={{ color: '#FFFFFF' }}>{botname}</h3>
     <textarea className='fs-4 d-flex justify-content-center container text-center mb-3' style={{height:'100%'}} placeholder='Name of bot' value={`<script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-try2/popup.js" defer id="popup" cred="${id.id}"></script>`}/>
    
       <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-3' style={{ color: '#FFFFFF' }}>
       <form className='col-sm-9 col-12'>
       {/* <div className="form-group">
       <input className='fs-4 d-flex justify-content-center container text-center mb-3 ' value={url} placeholder='website link' onChange={(e)=> setUrl(e.target.value)}  />
       </div> */}
       <div className="form-group">
       <input className='fs-4 d-flex justify-content-center container text-center mb-3' value={botname} placeholder='Name of bot' onChange={(e)=> setBot(e.target.value)}  />
       </div>
       <div className="form-group">
       <textarea className='fs-4 d-flex justify-content-center container text-center  mb-3' style={{height:'200px'}} value={prompt} placeholder='Name of bot' onChange={(e)=> setPrompt(e.target.value)}  />
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

export default ManageBot