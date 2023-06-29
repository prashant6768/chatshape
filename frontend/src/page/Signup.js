import React,{useState} from 'react'
import axios from 'axios'
import NavbarC from '../component/NavbarC';
import Footer from '../component/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit =async (e) => {
      e.preventDefault();
      
      await axios.post('http://127.0.0.1:5000/auth/signup',{username,password},{
          'Content-type':'application/json', 
          'Accept':'application/json',
          'Access-Control-Allow-Origin':'*'
    }).then((res)=>{console.log("signup = ",res); if(res.data === "NO"){toast.error("User Already Exists")} else{toast.success("Profile created Successfully")}})
      // .then(data => {document.cookie =`accessToken = ${data.data.accessToken}` })
      .catch(err => {console.log("signup form err = ",err); toast.error("Something went wrong")})
  
      console.log('Submitted:', username, password);
    };

    const gradientC = true

  return (
    <div style={{width:'100vw'}}>
    <NavbarC gradientC={gradientC}/>
    <div className='d-flex justify-content-center col-12' style={{paddingTop:'100px',paddingBottom:'100px', backgroundColor: '#242439', height: '100vh'}} >
    <form action="#" className="mt-4 register-form rounded-3 p-3 " style={{width:'330px',height:'300px',backgroundColor:'white',  border:'1px solid lightgrey'}}>
    <div className="row">
      <h3>Signup</h3>
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
    </div>
 
  </form>
  </div>
  <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
  <Footer/>
  </div>
  )
}

export default Signup