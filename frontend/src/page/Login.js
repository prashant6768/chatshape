import React,{useState} from 'react'
import axios from 'axios'
import NavbarC from '../component/NavbarC';
import Footer from '../component/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner';
import * as jose from 'jose';
import env from 'react-dotenv'

const Login = () => {

  const BACKEND = 'http://localhost:5000/'
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    setLoading(true); 
    await axios.post(`${BACKEND}/auth/login`,{username,password},{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  })
    .then(data => { if(data.data === 'NO'){toast.error("Wrong Credentials");setLoading(false);}else{Cookies.set('accessToken', `${data.data}`); toast.success("Login Successful");setLoading(false);} })
    // .then(data => console.log(data.data))
    .catch(err => {console.log("login form err = ",err); toast.error("Something went wrong");setLoading(false);})

    console.log('Submitted:', username, password);
  };
  const gradientC = true

  const logout=()=>{
    // document.cookie = "accessToken; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
    Cookies.remove('accessToken')
     toast.success("Logout Successful")
     window.location.reload(true)
  }

  return (

  <div style={{minWidth:'100vw'}}>
  <NavbarC gradientC={gradientC}/>
  <div className='d-flex justify-content-center col-12' style={{paddingTop:'100px',paddingBottom:'100px', backgroundColor: '#242439', minHeight: '1000px', height:'100%'}} >
 
  <form action="#" className="mt-4 register-form rounded-3 p-3 " style={{width:'330px', height:'350px',backgroundColor:'white',  border:'1px solid lightgrey'}}>
  <div className="row">
    <h3>Login</h3>
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
        Submit
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