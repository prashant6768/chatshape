import React,{useEffect, useState} from 'react'
import axios from 'axios'
import NavbarC from '../component/NavbarC';
import Footer from '../component/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from 'react-loader-spinner';
import {BsGoogle} from 'react-icons/bs'

import env from 'react-dotenv'


const Signup = () => {

  const BACKEND = 'http://localhost:5000/'

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[name,setName]=useState('')
    const[phone,setPhone]=useState('')
    const[loading, setLoading] = useState(false);
    const[loading2, setLoading2] = useState(false);
    const[otp,setOtp]=useState('')
    const[show,setShow]=useState(false)
    const [isButtonDisabled,setIsButtonDisabled]=useState(true)
  
    const handleSubmit =async (e) => {
      e.preventDefault();
      setShow(true)
      setLoading(true); 
      await axios.post(`${BACKEND}/auth/signup`,{username,password,name,phone},{
        // await axios.post('http://18.218.218.167:8000/auth/signup',{username,password},{
          'Content-type':'application/json', 
          'Accept':'application/json',
          'Access-Control-Allow-Origin':'*'
    }).then(res => { console.log(res); setLoading(false)})
      .catch(err => {console.log("signup form err = ",err); toast.error("Something went wrong");setLoading(false);})
  
      console.log('Submitted:', BACKEND);
    };

    const handleGoogle= async(e)=>{
        e.preventDefault()
    await axios.get(`${BACKEND}auth/googlelogin`,{
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
}).then(res => {window.location.href = res.data ; console.log(res.data)}).catch(err => console.log("GOOG ",err))
    }

    const handleOtp=async(e)=>{
       e.preventDefault()
       setLoading2(true)
       await axios.post(`${BACKEND}/auth/getOTP`,{otp,username},{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  }).then((res)=>{console.log("signup = ",res); if(res.data === "NO"){toast.error("User Already Exists");setLoading2(false);}else if(res.data == "Verification Failed"){toast.error("Verification Failed");setLoading2(false);} else{toast.success("Profile created Successfully");setLoading2(false);}}).catch(err => {console.log(err);setLoading2(false);{toast.error("Some Error Occured")}})
    }

    useEffect(()=>{

      if(username === '' || name === '' || phone === '' || password === ''){
        setIsButtonDisabled(true)
      }else{
        setIsButtonDisabled(false)
      }

    },[username,name,phone,password])

    const gradientC = true

  return (
    <div style={{width:'100vw'}}>
    <NavbarC gradientC={gradientC}/>
    <div  style={{paddingTop:'100px', backgroundColor: '#242439', minHeight: '1000px', height:'100%'}}>
    <div className='d-flex justify-content-center col-12'  >
    <form action="#" className="mt-4 register-form rounded-3 p-3 mx-1 " style={{width:'330px',height:'470px',backgroundColor:'white',  border:'1px solid lightgrey'}}>
    <div className="row">
      <h3>Signup</h3>
      


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
          Email 
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
        <label htmlFor="text" className="mb-1">
          Name
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            id="nameFreelancer"
            required
            aria-label="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
      </div>
      <div className="col-sm-12">
        <label htmlFor="text" className="mb-1">
          Phone Number
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            id="phoneFreelancer"
            required
            aria-label="number"
            value={phone.replace(/[^0-9+]/g, '')}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="col-sm-12">
        <label htmlFor="password" className="mb-1">
          Password 
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
      <div className="col-12 py-2">
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="btn btn-primary mt-3 d-block w-100"
           onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
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
  </div>
  { show ?
  <div className='d-flex justify-content-center col-12' style={{paddingTop:'60px',paddingBottom:'100px', backgroundColor: '#242439', height: '100vh'}} >
  <form action="#" className="mt-4 register-form rounded-3 p-3 " style={{width:'330px',height:'160px',backgroundColor:'white',  border:'1px solid lightgrey'}}>
<div className="row">
  <div className="col-sm-12">
    <label htmlFor="email" className="mb-1">
     Check for OTP in your email
    </label>
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="OTP"
        id="emailFreelancer"
        required
        aria-label="otp"
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
      />
    </div>
  </div>
  <div className="col-12">
    <button
      type="submit"
      className="btn btn-primary mt-3 d-block w-100"
       onClick={(e) => handleOtp(e)}
    >
      Sign Up
    </button>
  </div>
</div>
<div className='form-group d-flex justify-content-center mt-4'>
   {loading2 ? (
      <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
     
    ) : (
      ''
    )}
    </div>

</form>
  </div> : ''
  }
  </div>
  <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
  <Footer/>
  </div>
  )
}

export default Signup


