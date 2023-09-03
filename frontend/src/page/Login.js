import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';

import { useLocation } from 'react-router-dom';
import axios from 'axios'
import NavbarC from '../component/NavbarC';
import Footer from '../component/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner';
import {BsGoogle} from 'react-icons/bs'
import * as jose from 'jose';
import env from 'react-dotenv'


const Login = () => {

  const navigate = useNavigate();

  // const BACKEND = 'http://localhost:5000/'
  const BACKEND = 'http://3.138.169.250/'

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);
  const[param,setParam]=useState('')
  const[sl,setSl]=useState('')
  // const navigate = useNavigate();


  const handleSubmit =async (e) => {
    e.preventDefault();
    
    setLoading(true); 
    await axios.post(`${BACKEND}auth/login`,{username,password},{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  })
    .then(data => { if(data.data === 'NO'){toast.error("Wrong Credentials");setLoading(false);}else{Cookies.set('accessToken', `${data.data}`); toast.success("Login Successful");setLoading(false);setTimeout(() => { navigate('/account') }, 2000)} })
    // .then(data => console.log(data.data))
    // .then(setTimeout(() => { navigate('/account') }, 2000))
    .catch(err => {console.log("login form err = ",err); toast.error("Something went wrong");setLoading(false);})

    console.log('Submitted:', username, password);
  };
  const gradientC = true

  const logout=()=>{
    // document.cookie = "accessToken; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
    Cookies.remove('accessToken')
     toast.success("Logout Successful")
     navigate('/login');
  }

  const handleGoogle= async(e)=>{
    e.preventDefault()
await axios.get(`${BACKEND}auth/googlelogin`,{
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}).then(res => {window.location.href = res.data ; console.log(res.data)}).catch(err => console.log("GOOG ",err))
}


  const location = useLocation();

  useEffect(() => {
    // Parse the query parameters from the URL
    const params =new URLSearchParams(window.location.search);
    setParam(params.get('access_token'))
    setSl(params.get('sl'))
    console.log(param)
  }, [location.search]);

  useEffect(()=>{
    if(param !== null){
    // console.log(param,"WWWWWWWWWWq",sl)
    console.log(sl,"ddd",param)

    if(sl === 's'){
      Cookies.set('accessToken', `${param}`)
      toast.success("Profile created Successfully")
      console.log(param,"SSSSSSSSSSS")
    }else if(sl === 'l'){
      Cookies.set('accessToken', `${param}`)
      toast.success("Login successful")
      console.log(param,"LLLLLLLLL")
    }
   
    console.log(param)
    console.log(sl)
  }

  },[param])

  return (

  <div style={{minWidth:'100vw'}}>
     {/* <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64d47c3004d7aebaeb5dbf04"
      /> */}
  <NavbarC gradientC={gradientC}/>
  <div className='d-flex justify-content-center col-12' style={{paddingTop:'100px',paddingBottom:'150px', backgroundColor: '#242439',  height:'100%'}} >
 
  <form action="#" className="mt-4 register-form rounded-3 p-3 mx-1 " style={{width:'330px', height:'465px',backgroundColor:'white',  border:'1px solid lightgrey'}}>
  <div className="row">
    <h3>Login</h3>

    <div className="col-sm-12">
        {/* <label htmlFor="signup" className="mb-1">
          Don't have an account? Signup
        </label> */}
        <div className="input-group mb-3">
        <Link to='/signup' style={{ textDecoration:'none'}}><Nav.Link href="#link" className='btn link' style={{ }}>Don't have an account? Signup</Nav.Link></Link>        
        </div>
      </div>

    <div className="col-sm-12">
        <label htmlFor="email" className="mb-1">
          Google Login / Signup
        </label>
        <div className="input-group mb-3">
         <button className='btn btn-dark col-12 ' onClick={(e)=>{handleGoogle(e)}} >Google <BsGoogle style={{color:'white'}} className='ms-2'/></button>
        </div>
      </div>

    <div className="col-sm-12">
      <label htmlFor="email" className="mb-1">
        Email <span className="text-danger">*</span>
      </label>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          id="emailFreelancer"
          required
          aria-label="email"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
      </div>
    </div>
    <div className="col-sm-12">
      <label htmlFor="password" className="mb-1">
        Password <span className="text-danger">*</span>
      </label>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          id="passwordFreelancer"
          required
          aria-label="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
    </div>
    <div className="col-12">
      <button
        type="submit"
        className="btn btn-primary mt-3 d-block w-100"
         onClick={(e) => handleSubmit(e)}
      >
        Login
      </button>
    </div>
    <div className="col-12">
    <button type="button" onClick={()=> logout()} class="btn btn-outline-danger  mt-3 d-block w-100">Logout</button>
    </div>
  </div>
  <div className='form-group d-flex justify-content-center mt-4'>
       {loading ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>
</form>



<ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
</div>
<Footer/>
</div>
  )
}

export default Login