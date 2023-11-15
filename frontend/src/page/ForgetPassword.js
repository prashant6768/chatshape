import React,{useEffect, useState} from 'react'
import axios from 'axios'
import NavbarC from '../component/NavbarC';
import Footer from '../component/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from 'react-loader-spinner';

import env from 'react-dotenv'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    const navigate = useNavigate();
    const gradientC = true

     const BACKEND = 'https://zemaapi.zema.io/'
    // const BACKEND = 'http://localhost:5000/'
    


    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled,setIsButtonDisabled]=useState(true)
    const[show,setShow]=useState(false)
    const[show2,setShow2]=useState(false)

    useEffect(()=>{

        if(username === '' ){
          setIsButtonDisabled(true)
        }else{
          setIsButtonDisabled(false)
        }
  
      },[username])

    const handleSubmit =async (e) => {
        e.preventDefault();
        setLoading(true); 
        await axios.post(`${BACKEND}auth/forgetpassword`,{username},{
            'Content-type':'application/json', 
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*'
      }).then(res => {if(res.data === "NO"){ toast.error("User Doesn't Exist");console.log(res); setLoading(false)}else if(res.data === 'ic'){toast.error("Fill the Username");setLoading(false);}else if(res.data === 'OK'){toast.success("OTP Sent");setLoading(false);setShow(true)}else{console.log(res.data);toast.error("Error Occured !!!"); setLoading(false);}})
        .catch(err => {console.log("forget password form err = ",err); toast.error("Something went wrong");setLoading(false);})
    
        console.log('Submitted:', BACKEND);
      };


      const[otp,setOtp]=useState('')
      const[loading2, setLoading2] = useState(false);

      const handleOtp=async(e)=>{
        e.preventDefault()
        setLoading2(true)
        await axios.post(`${BACKEND}auth/fpOTP`,{otp,username},{
         'Content-type':'application/json', 
         'Accept':'application/json',
         'Access-Control-Allow-Origin':'*'
   }).then((res)=>{console.log("fp otp = ",res); if(res.data === "NO"){toast.error("Error Occured");setLoading2(false);}else if(res.data == "Verification Failed"){toast.error("Verification Failed");setLoading2(false);} else if(res.data == "OK"){toast.success("Verification was Successful");setLoading2(false);setShow2(true) }else{toast.error("Error Occured");setLoading2(false);console.log(res.data)}}).catch(err => {console.log(err);setLoading2(false);{toast.error("Some Error Occured")}})
     }

     const [loading3,setLoading3]= useState(false)
     const [newPassword,setNewPassword]= useState('')

     const handleNewPassword=async(e)=>{
        e.preventDefault()
        setLoading3(true)
        
        if (newPassword.length < 8) {
          toast.error("Password must be at least 8 characters long");
          setLoading3(false);
          return;
        }
        const passRegex = /\s{2,}/;
        if (passRegex.test(newPassword)) {
          toast.error("Invalid Password Format, 2 consecutive white spaces");
          setLoading3(false);
          return;
        }
        await axios.post(`${BACKEND}auth/cpOTP`,{username,newPassword},{
         'Content-type':'application/json', 
         'Accept':'application/json',
         'Access-Control-Allow-Origin':'*'
   }).then((res)=>{console.log("cp otp = ",res); if(res.data === "mt"){toast.error("Password can't be empty");setLoading3(false);}else if(res.data == "na"){toast.error("Request Denied");setLoading3(false);} else if(res.data == "OK"){toast.success("Password Updated");setLoading3(false);setTimeout(() => { navigate('/login') }, 2000) }else{toast.error("Error Occured");setLoading3(false);console.log(res.data)}}).catch(err => {console.log(err);setLoading3(false);{toast.error("Some Error Occured")}})
     }



  return (
    <div style={{width:'100vw'}}>
    {/* <ScriptLoaderHOC
     scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
     id="popup"
     cred="64d47c3004d7aebaeb5dbf04"
   /> */}
 <NavbarC gradientC={gradientC}/>
 <div  style={{paddingTop:'100px', paddingBottom:'150px', backgroundColor: '#242439', height:'100%'}}>
 <div className='d-flex justify-content-center col-12'  >
 <form action="#" className="mt-4 register-form rounded-3 p-3 mx-1 " style={{width:'330px',height:'240px',backgroundColor:'white',  border:'1px solid lightgrey'}}>
 <div className="row">
   <h3>Forgot Password</h3>
   
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
   {/* <div className="col-sm-12">
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
   </div> */}
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
<div className='d-flex justify-content-center col-12 ' style={{paddingTop:'60px',paddingBottom:'50px', backgroundColor: '#242439'}} >
<form action="#" className="mt-4 register-form rounded-3 p-3 mx-1" style={{width:'330px',height:'160px',backgroundColor:'white',  border:'1px solid lightgrey'}}>
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
   Submit OTP
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


{ show2 ?
<div className='d-flex justify-content-center col-12 ' style={{paddingTop:'10px',paddingBottom:'50px', backgroundColor: '#242439'}} >
<form action="#" className="mt-4 register-form rounded-3 p-3 mx-1" style={{width:'330px',height:'160px',backgroundColor:'white',  border:'1px solid lightgrey'}}>
<div className="row">
<div className="col-sm-12">
 <label  className="mb-1">
  New Password
 </label>
 <div className="input-group mb-3">
   <input
     type="text"
     className="form-control"
     placeholder="New Password"
     id="emailFreelancer"
     required
     aria-label="Password"
     value={newPassword}
     onChange={(e)=>setNewPassword(e.target.value)}
   />
 </div>
</div>
<div className="col-12">
 <button
   type="submit"
   className="btn btn-primary mt-3 d-block w-100"
    onClick={(e) => handleNewPassword(e)}
 >
   Update Password
 </button>
</div>
</div>
<div className='form-group d-flex justify-content-center mt-4'>
{loading3 ? (
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

export default ForgetPassword