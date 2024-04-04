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
  // const BACKEND = 'https://zemaapi.zema.io/'
  const BACKEND = process.env.REACT_APP_BACKEND
  

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);
  const[param,setParam]=useState('')
  const[sl,setSl]=useState('')

  const [decoded,setDecoded]=useState(undefined)
  const [showLogin,setShowLogin]=useState(true)


  useEffect(()=>{
      setDecoded(Cookies.get('accessToken'));
      console.log(Cookies.get('accessToken'),"loginn  page ",decoded)
  },[decoded])

  useEffect(()=>{
      if(decoded === undefined){
        setShowLogin(true)
      }else{
          setShowLogin(false)
      }
      console.log("show login lll",showLogin)
  },[decoded])
  // const navigate = useNavigate();


  const handleSubmit =async (e) => {
    e.preventDefault();
    
    setLoading(true); 
  //   await axios.post(`${BACKEND}auth/login`,{username,password},{
  //       'Content-type':'application/json', 
  //       'Accept':'application/json',
  //       'Access-Control-Allow-Origin':'*'
  // })
  //   .then(data => {
  //      if(data.data === 'NO'){toast.error("Wrong Credentials");setLoading(false);}
  //      else if(data.data === 'ic'){toast.error("Fill Both Fields");setLoading(false);}
  //      else if(data.data[1] === 'admin'){Cookies.set('accessToken', `${data.data[0]}`); Cookies.set('adminToken', `${data.data[1]}`); Cookies.set('token', `${data.data[2]}`); Cookies.set('refresh_token', `${data.data[3]}`); toast.success("Login Successful");setLoading(false);setTimeout(() => { navigate('/account') }, 2000)}
  //      else{Cookies.set('accessToken', `${data.data[0]}`); Cookies.set('token', `${data.data[1]}`); Cookies.set('refresh_token', `${data.data[2]}`); toast.success("Login Successful");setLoading(false);setTimeout(() => { navigate('/account') }, 2000)} })
  //   .catch(err => {console.log("login form err = ",err); toast.error("Something went wrong");setLoading(false);})


  await axios.post(`${BACKEND}auth/login`, { username, password }, {
    headers: {
        'Content-type': 'application/json', 
        'Accept': 'application/json',
       'Access-Control-Allow-Origin': '*'

    }
})
.then(data => {
    if (data.data === 'NO') {
        toast.error("Wrong Credentials");
        setLoading(false);
    } else if (data.data === 'ic') {
        toast.error("Fill Both Fields");
        setLoading(false);
    } else if (data.data[1] === 'admin') {
        document.cookie = `accessToken=${data.data[0]}; path=/; Secure; SameSite=None`;
        document.cookie = `adminToken=${data.data[1]}; path=/; Secure; SameSite=None`;
        document.cookie = `token=${data.data[2]}; path=/; Secure; SameSite=None`;
        document.cookie = `refresh_token=${data.data[3]}; path=/; Secure; SameSite=None`;
        toast.success("Login Successful");
        setLoading(false);
        setTimeout(() => { navigate('/account') }, 2000);
    } else {
        document.cookie = `accessToken=${data.data[0]}; path=/; Secure; SameSite=None`;
        document.cookie = `token=${data.data[1]}; path=/; Secure; SameSite=None`;
        document.cookie = `refresh_token=${data.data[2]}; path=/; Secure; SameSite=None`;
        toast.success("Login Successful");
        setLoading(false);
        setTimeout(() => { navigate('/account') }, 2000);
    }
})
.catch(err => {
    console.log("login form err = ",err);
    toast.error("Something went wrong");
    setLoading(false);
});

    console.log('Submitted:', username, password);
  };
  const gradientC = true

  const logout=()=>{
    // document.cookie = "accessToken; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
    Cookies.remove('accessToken')
    Cookies.remove('adminToken')
     toast.success("Logout Successful")
     setTimeout(() => { navigate('/') }, 3000)
     
  }

  const handleGoogle= async(e)=>{
    e.preventDefault()
await axios.get(`${BACKEND}auth/googlelogin`,{
  headers: {
    'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
  },
}).then(res =>  {window.location.href = res.data ; console.log(res.data,"========hello g");setLoading(false);setTimeout(() => { navigate('/account') }, 2000)}).catch(err => console.log("GOOG ",err))
setTimeout(() => { navigate('/account') }, 2000)
}


  const location = useLocation();
  const[token,setToken]=useState('')
  const[refreshT,setRefreshT]=useState('')

  useEffect(() => {
    // Parse the query parameters from the URL
    const params =new URLSearchParams(window.location.search);
    setParam(params.get('access_token'))
    setSl(params.get('sl'))
    setToken(params.get('token'))
    setRefreshT(params.get('refresh_token'))

    console.log(param)
  }, [location.search]);

  useEffect(()=>{
    if(param !== null){
    // console.log(param,"WWWWWWWWWWq",sl)
    console.log(sl,"ddd",param)

    if(sl === 's'){
      Cookies.set('accessToken', `${param}`)
      toast.success("Profile created Successfully")
      Cookies.set('token', token, { expires: 1, path: '/' });
      Cookies.set('refresh_token', refreshT, { expires: 1, path: '/' })
      setTimeout(() => { navigate('/account') }, 2000)
      console.log(param,"SSSSSSSSSSS")
    }else if(sl === 'l'){
      Cookies.set('accessToken', `${param}`)
      toast.success("Login Successful")
      Cookies.set('token', token, { expires: 1, path: '/' });
      Cookies.set('refresh_token', refreshT, { expires: 1, path: '/' })
      setTimeout(() => { navigate('/account') }, 2000)
      console.log(param,"LLLLLLLLL")
    }else if(sl === 'a'){
      Cookies.set('accessToken', `${param}`)
      Cookies.set('adminToken', `admin`)
      Cookies.set('token', token, { expires: 1, path: '/' });
      Cookies.set('refresh_token', refreshT, { expires: 1, path: '/' })
      toast.success("Login Successful")
      setTimeout(() => { navigate('/account') }, 2000)
      console.log(param,"LLLLLLLLL")
    }
   
    console.log(param)
    console.log(sl)
  }

  },[param])

  const[togLog,setTogLog]=useState(false)

  const logoutToggle = (e) => {
    e.preventDefault()
    setTogLog(!togLog)
  }


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
        <div className="input-group mb-3">
        <Link to='/signup' style={{ textDecoration:'none'}}><Nav.Link href="#link" className='btn link' style={{ }}>Don't have an account? Sign up</Nav.Link></Link>        
        </div>
      </div>

    <div className="col-sm-12">
        <label htmlFor="email" className="mb-1">
          Google Login / Sign up
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
  
          aria-label="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
    </div>
    {
      showLogin === true ?
      <>
    <div className="col-12">
      <button
        type="submit"
        className="btn btn-primary mt-3 d-block w-100"
         onClick={(e) => handleSubmit(e)}
      >
        Login
      </button>
    </div>
     <div className="col-sm-12">
     <div className="input-group mt-2 mb-3">
     <Link to='/forgetpassword' style={{ textDecoration:'none'}}><Nav.Link href="#link" className='btn link' style={{ }}>Forgot Password</Nav.Link></Link>        
     </div>
   </div>
   </>
    :
    <div className="col-12">
    <button type="button" onClick={(e)=> logoutToggle(e)} class="btn btn-outline-danger  mt-3 d-block w-100">Logout</button>
    </div>
    }
    {togLog ?
    <div className='form-group mt-3 d-flex justify-content-center'>
      <button className='btn btn-danger mx-1 ' onClick={()=> logout()}>Logout</button>
      <button className='btn btn-secondary mx-1 ' onClick={(e) => logoutToggle(e)}>No</button>
    </div> : ''
  }
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