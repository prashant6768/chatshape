import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner';

const SectionOneSA = () => {

  const decoded = Cookies.get('accessToken');
  const adminToken = Cookies.get('adminToken')

  // const BACKEND = 'http://localhost:5000/'
  const BACKEND = 'https://zemaapi.zema.io/'


  const [data, setData] = useState([])
  const[apiload,setApiload]= useState(false)

  useEffect(() => {
    setApiload(true)
    axios.post(`${BACKEND}api/admin/dataAdmin`, { decoded, adminToken }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => {
        console.log(res.data, "all the data");
        setData(res.data);
        setApiload(false)
      })
      .catch(err => {console.log(err);setApiload(false)})
  }, [])

  const [addAdmin, setAddAdmin] = useState('')

  const handleAddAdmin = (e) => {
    axios.post(`${BACKEND}api/admin/addAdmin`, { decoded, adminToken,addAdmin }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res =>{if(res.data === 'No User'){console.log("NO SUCH USER EXISTS"); toast.error("NO SUCH USER EXISTS")}else if(res.data === 'Already Admin'){console.log("Already an ADMIN"); toast.error("Already an ADMIN")}else if(res.data === "OK"){console.log("OK"); toast.success("Added New Admin")}else {console.log(res.data); toast.error("Error")}}).then(res => setAddAdmin('')).catch(err => {console.log(err); toast.error("Some Error") })
  }

  const handleRemoveAdmin =(e)=>{
    console.log(e)
    axios.post(`${BACKEND}api/admin/deleteAdmin`, { decoded, adminToken,e }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => {if(res.data == 'Only1'){toast.error("Atleast One admin is needed")}else if(res.data == 'OK'){ toast.success("Deleted")}else{toast.error("Error")}}).catch(err => {console.log(err); toast.error("Some Error") })
  }

const[errData,setErrData]=useState([])
const [searchTerm, setSearchTerm] = useState('');
const [filteredData, setFilteredData] = useState(data);

 useEffect(()=>{
  axios.post(`${BACKEND}api/admin/errorLog`, { decoded, adminToken }, {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
    .then(res => {
      console.log(res.data, "all the error data");
      if(res.data === null){
        setErrData([])
        console.log("MMMMMMMMMMMTY")
      }
      else{
        setErrData(res.data)
        console.log("FULL")
      }
      
    })
    .catch(err => console.log(err))
 },[])

 useEffect(()=>{
    setFilteredData(errData)
 },[errData])

 const handleSearch = (e) => {
  const input = e.target.value;
  setSearchTerm(input);

  const filtered = errData.filter((item) => {
    const regex = new RegExp(input, 'i');
    for (const key in item) {
      if (item.hasOwnProperty(key) && regex.test(item[key])) {
        return true;
      }
    }
    return false;
  });

  setFilteredData(filtered);
};


const[issueData,setIssueData]=useState([])
const [searchTermIssue, setSearchTermIssue] = useState('');
const [filteredDataIssue, setFilteredDataIssue] = useState(data);

useEffect(()=>{
  axios.post(`${BACKEND}api/admin/issueLog`, { decoded, adminToken }, {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
    .then(res => {
      console.log(res.data, "all the issue data");
      setIssueData(res.data)
    })
    .catch(err => console.log(err))
 },[])

 useEffect(()=>{
  setFilteredDataIssue(issueData)
 },[issueData])

 const handleSearchIssue = (e) => {
  const input = e.target.value;
  setSearchTermIssue(input);

  const filtered = issueData.filter((item) => {
    const regex = new RegExp(input, 'i');
    for (const key in item) {
      if (item.hasOwnProperty(key) && regex.test(item[key])) {
        return true;
      }
    }
    return false;
  });

  setFilteredDataIssue(filtered);
};

  return (
    <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>
      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Super Admins</h3>

      <div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>

      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
          <Card.Body className="d-flex flex-column" style={{}}>

            {
              data.map(x => (
                <div className='row col-12 mt-2 d-flex justify-content-between pb-2' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                  <div className='col-lg-4 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.admin}</p>
                  </div>
                  {/* <div className='col-lg-3 col-sm-5'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Tokens Used : {x.usage}</p>
                  </div>
                  <div className='col-lg-3 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Conversations used : {x.ConNo}</p>
                  </div> */}
                  <div className='col-lg-2 col-sm-5'>
                    <button className='btn btn-outline-danger col-12 d-flex justify-content-center text-center ' value={x.id} onClick={(e)=>{handleRemoveAdmin(e.target.value)}} style={{  }}>Remove</button>
                  </div>
                </div>
              ))}
            <div className='row col-12 mt-3 justify-content-start justify-content-sm-between' style={{ display: 'flex', flexWrap: 'wrap' }}>
              {/* <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Create</p> */}
              <input
                className='fs-4 col-sm-9 d-flex rounded-4 justify-content-center my-2 text-center'
                placeholder='Add new Admin'
                value={addAdmin}
                onChange={(e) => setAddAdmin(e.target.value)}
              />
              <button
                className='btn btn-outline-warning d-flex justify-content-center col-lg-2 col-sm-3 my-2'
                style={{ maxWidth: '300px' }}
                onClick={handleAddAdmin}
              >Add Admin</button>


            </div>

          </Card.Body>
        </Card>
      </div>


      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Error Logs</h3>

      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
          <Card.Body className="d-flex flex-column" style={{}}>
            <div className='row'>
              <input className='fs-4 col-sm-12 col-lg-12 d-flex justify-content-center rounded-4  mt-4 text-center mb-3 ' type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch} />
              {/* <Dropdown ref={ref} drop='down-centered' className='col-sm-4 col-lg-2 mt-4 text-start mb-3 ' show={isOpen} onClick={toggleDropdown}>
                <button className='btn btn-outline-warning fw-bolder mx-3 mt-2 ' style={{}} id="dropdown-basic">
                  Sort
                </button>

                <Dropdown.Menu >
                  <Dropdown.Item href="#"><button className='btn  fw-bolder px-0 mt-2 ' onClick={() => sortData('asc')}>Sort Ascending</button></Dropdown.Item>
                  <Dropdown.Item href="#"><button className='btn  fw-bolder px-0  mt-2 ' onClick={() => sortData('desc')}>Sort Descending</button></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
            {
                  filteredData == undefined || filteredData == null ?
                  <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Data Available</p>
                  :
              filteredData.map(x => (
                <div className='row col-12 mt-3' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.time}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.err_id}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Bots used: {x.bot}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    {/* <p className=' col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</p> */}
                  <Link to={`/superadminBot/${x.bot_id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link>
 
                  </div>
                </div>
              ))}
          
          </Card.Body>
        </Card>
      </div>


      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Issue Logs</h3>

      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
          <Card.Body className="d-flex flex-column" style={{}}>
            <div className='row'>
              <input className='fs-4 col-sm-12 col-lg-12 d-flex justify-content-center rounded-4  mt-4 text-center mb-3 ' type="text"
                placeholder="Search..."
                value={searchTermIssue}
                onChange={handleSearchIssue} />
            </div>
            {
                  filteredDataIssue.length === 0?
                  <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Data Available</p>
                  :
              filteredDataIssue.map(x => (
                <div className='row col-12 mt-3' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                  <div className='col-xl-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.username}</p>
                  </div>
                  <div className='col-xl-4 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.issue}</p>
                  </div>
                  <div className='col-xl-2 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Bots used: {x.bot}</p>
                  </div>
                  <div className='col-xl-2 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}> {x.time}</p>
                  </div>
                  <div className='col-xl-1 col-sm-6'>
                    {/* <p className=' col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</p> */}
                  <Link to={`/superadminBot/${x.bot_id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link>
 
                  </div>
                </div>
              ))}
          </Card.Body>
        </Card>
      </div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
    </div>
  )
}

export default SectionOneSA