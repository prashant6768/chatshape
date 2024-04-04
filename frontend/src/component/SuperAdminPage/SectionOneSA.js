import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner';
import { HashLink } from 'react-router-hash-link';
import { Tooltip as Tp}  from 'react-tooltip'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import Accordion from 'react-bootstrap/Accordion';

const SectionOneSA = () => {

  const decoded = Cookies.get('accessToken');
  const adminToken = Cookies.get('adminToken')

  // const BACKEND = 'http://localhost:5000/'
  // const BACKEND = 'https://zemaapi.zema.io/'
  const BACKEND = process.env.REACT_APP_BACKEND


  const [data, setData] = useState([])
  const[filterHistory,setFilterHistory]= useState([])
  const[apiload,setApiload]= useState(false)

  useEffect(() => {
    setApiload(true)
    axios.post(`${BACKEND}api/admin/dataAdmin`, { decoded, adminToken }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => {if(res.data[1] == 'ok'){
        console.log(res.data[0], "all the data");
        setData(res.data[0]);
        setApiload(false)
      }else if(res.data == 'You Are Not Authorized'){console.log('You Are Not Authorized');toast.error('You Are Not Authorized');setApiload(false)}else{console.log(res.data);toast.error("Some Error Occured");setApiload(false)}})
      .catch(err => {console.log(err);setApiload(false)})
  }, [])

  const [addAdmin, setAddAdmin] = useState('')

  const handleAddAdmin = (e) => {
    axios.post(`${BACKEND}api/admin/addAdmin`, { decoded, adminToken,addAdmin }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res =>{if(res.data === 'No User'){console.log("NO SUCH USER EXISTS"); toast.error("NO SUCH USER EXISTS")}else if(res.data =='You Are Not Authorized'){console.log("Not authorized"); toast.error("You Are Not Authorized")}else if(res.data === 'Already Admin'){console.log("Already an ADMIN"); toast.error("Already an ADMIN")}else if(res.data === "OK"){console.log("OK"); toast.success("Added New Admin")}else {console.log(res.data); toast.error("Error")}}).then(res => setAddAdmin('')).catch(err => {console.log(err); toast.error("Some Error") })
  }

  const handleRemoveAdmin =(e)=>{
    console.log(e)
    axios.post(`${BACKEND}api/admin/deleteAdmin`, { decoded, adminToken,e }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => {if(res.data == 'Only1'){toast.error("Atleast One admin is needed")}else if(res.data == 'You Are Not Authorized'){toast.error('You Are Not Authorized')}else if(res.data == 'OK'){ toast.success("Deleted")}else{toast.error("Error")}}).catch(err => {console.log(err); toast.error("Some Error") })
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
      // console.log(res.data, "all the error data");
      if(res.data === null){
        setErrData([])
        console.log("MMMMMMMMMMMTY")
      }
      else if(res.data[1] == 'ok'){
        setErrData(res.data[0])
        console.log("FULL",res.data[0])
      }
      else if(res.data == 'You Are Not Authorized'){toast.error('You Are Not Authorized')}
      else{toast.error('Some Error Occured')}
      
    })
    .catch(err => console.log(err,"--------------what"))
 },[])

 useEffect(()=>{
    setFilteredData(errData)
    console.log("filtered data ",errData)
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
const [botId,setBotId]= useState('')

useEffect(()=>{
  axios.post(`${BACKEND}api/admin/issueLog`, { decoded, adminToken }, {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
    .then(res => {if(res.data[1] == 'ok'){
      console.log(res.data[0], "all the issue data");
      setIssueData(res.data[0])
    }else if(res.data == 'You Are Not Authorized'){toast.error('You Are Not Authorized')}else{toast.error('Some Error Occured')}})
    .catch(err => console.log(err))
 },[])

 useEffect(()=>{
  setFilteredDataIssue(issueData)
  console.log("filter data issuue -------",issueData)
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

const scrollWidthOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -100; 
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}

const messageStyleSend = {
  backgroundColor: '#0070DA',
  fontSize: '14px',
  // color: '#FFFFFF',
  fontFamily: 'arial',
};
const messageStyleRec = {
  backgroundColor: '#3D4648',
  fontSize: '14px',
  // color: '#FFFFFF',
  fontFamily: 'arial',

};

const [addBot, setAddBot] = useState('')
const [botname,setBotname] = useState('')
const [searchTermPay, setSearchTermPay] = useState([]);
const [history,setHistory]= useState([])

const handleAddBot = (e) => {
  const credMatch = addBot.match(/cred="(.*?)"/)[1];
  console.log(credMatch[1],"=======credMatch")

  axios.post(`${BACKEND}api/admin/addBot`, { decoded, adminToken,credMatch}, {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }).then(res =>{if(res.data === 'You Are Not Authorized'){console.log("You Are Not Authorized"); toast.error("You Are Not Authorized")}else if(res.data === "ok"){console.log("OK"); toast.success("Homepage Chatbot changed");setTimeout(() => { window.location.reload(true) }, 2000)}else {console.log(res.data); toast.error("Some Error Occured!!!")}}).catch(err => {console.log(err); toast.error("Some Error Occured") })
}

useEffect(()=>{
  axios.post(`${BACKEND}api/admin/gethomepagebot`, { decoded, adminToken}, {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }).then(res =>{if(res.data === 'You Are Not Authorized'){console.log("You Are Not Authorized"); toast.error("You Are Not Authorized")}else if(res.data[0] === "Error"){console.log("Error"); toast.error("Some Error Occured")}else {console.log(res.data,"==========166"); setAddBot(res.data[0]);setBotname(res.data[1]);setBotId(res.data[2])}}).catch(err => {console.log(err); toast.error("Some Error Occured") })
},[])

useEffect(() => {
  console.log("BOT ID ================= ",botId)
  if (botId !== '') {
    axios.get(`${BACKEND}api/historyget/${botId}`, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }).then(res => { setHistory(res.data); console.log("history ", res.data) }).catch(err => console.log(err))
  }
}, [botId])


useEffect(()=>{
  setFilterHistory(history)
},[history])

const handleSearchHist = (e) => {
  const input = e.target.value;
  setSearchTermPay(input);

  const filtered = history.filter((item) => {
    const regex = new RegExp(input, 'i');
    for (const key in item) {
      if (item.hasOwnProperty(key) && regex.test(item[key])) {
        return true;
      }
    }
    return false;
  });

  setFilterHistory(filtered);
  console.log("filtered pay", filterHistory)
};

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPageHist = 10; 
const [sortedHistory, setSortedHistory] = useState([]); 

useEffect(() => {
  const sortedData = Array.isArray(filterHistory)
    ? filterHistory.sort((a, b) => new Date(b.time) - new Date(a.time))
    : [];

  setSortedHistory(sortedData);
  setCurrentPage(1)
}, [filterHistory]);

const startIndex = (currentPage - 1) * itemsPerPageHist;
const endIndex = startIndex + itemsPerPageHist;

const itemsToDisplayHist = sortedHistory.slice(startIndex, endIndex);

const handlePageChange = (page) => {
  if (page >= 1 && page <= Math.ceil(sortedHistory.length / itemsPerPageHist)) {
    setCurrentPage(page);
  }
};

const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

const toggleAccordion = (index) => {
  if (openAccordionIndex === index) {
    setOpenAccordionIndex(null);
  } else {
    setOpenAccordionIndex(index);
  }
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

      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Zema Homepage chatbot</h3>

      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
          <Card.Body className="d-flex flex-column" style={{}}>
          <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}>{botname}</Card.Title>

          <div className='row col-12 mt-3 justify-content-start justify-content-sm-between' style={{ display: 'flex', flexWrap: 'wrap' }}>
              {/* <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Create</p> */}
              <input
                className='fs-4 col-sm-9 d-flex rounded-4 justify-content-center my-2 text-center my-anchor-element'
                placeholder='Add Chatbot ID'
                value={addBot}
                onChange={(e) => setAddBot(e.target.value)}
              />
              <button
                className='btn btn-outline-warning d-flex justify-content-center col-lg-2 col-sm-3 my-2'
                style={{ maxWidth: '300px' }}
                onClick={handleAddBot}
              >Add Chatbot</button>
               <Tp anchorSelect=".my-anchor-element" style={{ backgroundColor: "rgba(255, 255, 255,1)", color: "#000000",fontWeight:'bolder',width:'90vw' }} place="top">
     Paste the script tag used for embedding the chatbot in this form.<br/>
     The form will automatically take out the cred value from the script to use it in the chatbot.<br/>
     Only the cred value will be visible inside the form after submitting the script.
</Tp>


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
                  {/* <div className='col-lg-3 col-sm-6'>
                  <HashLink to={`/superadminBot/${x.bot_id}#${x.err_id}`} scroll={el => scrollWidthOffset(el)} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></HashLink>
                  </div> */}
                  <div className='col-xl-1 col-sm-6 container'>
            <HashLink className='btn btn-link px-0 ' to={`/superadminBot/${x.bot_id}#${x.err_id}`} scroll={el => scrollWidthOffset(el)} style={{ textDecoration: 'underline', color: '#FFFFFF' }}   >Details</HashLink>
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
                  filteredDataIssue.length == 0 ?
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
                  {/* <div className='col-xl-1 col-sm-6'>
                  <HashLink to={`/superadminBot/${x.bot_id}#${x.issue_id}`} scroll={el => scrollWidthOffset(el)} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></HashLink>
                  </div> */}
                  <div className='col-xl-1 col-sm-6 container'>
            <HashLink className='btn btn-link px-0 ' to={`/superadminBot/${x.bot_id}#${x.issue_id}`} scroll={el => scrollWidthOffset(el)} style={{ textDecoration: 'underline', color: '#FFFFFF' }}   >Details</HashLink>
           </div>
                </div>
              ))}
          </Card.Body>
        </Card>
      </div>

      <div className='fs-4 col-12 row d-flex justify-content-center text-center  mb-5 mt-3 mx-1 ' style={{ color: '#FFFFFF' }}>
            <label className='fs-4 d-flex justify-content-center  col-11 text-center mt-5 mb-5 mx-2' style={{ height: '100%', color: '#FFFFFF' }}>Chat History</label>
        
            <input className='fs-4 col-sm-8 col-11 col-lg-10 d-flex justify-content-center rounded-4  mt-4 text-center mb-3 ' type="text"
                placeholder="Search..."
                value={searchTermPay}
                onChange={handleSearchHist}
                 />
          {filterHistory === '' ? '':
          // filterHistory.sort((a, b) => new Date(b.time) - new Date(a.time)).map(x =>
          itemsToDisplayHist.map((x, index) => (
            <Accordion
             alwaysOpen='false'  
            key={index}
             activeKey={openAccordionIndex === index ? '0' : null}
            onSelect={() => toggleAccordion(index)}
             className='col-11 my-2 custom-accordion' >
              <Accordion.Item eventKey="0" style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0' }} >
                <Accordion.Header >
                  {x.time} / {x.Name} / {x.Email}
                  <span
                        style={{
                          color: '#FFE459',
                          position: 'absolute',
                          right: '25px',
                          top: '50%',
                          fontSize: '34px',
                          transform: 'translateY(-50%)',
                        }}
                      >
                        {openAccordionIndex === index ? '-' : '+'}
                      </span>
                      </Accordion.Header>
                <Accordion.Body style={{ color: 'white' }} >
                 {x.history.map(message=>
                  <div
                  key={message.id}
                  className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                  style={message.sender === 'me' ? messageStyleSend : messageStyleRec}
              >
                  {/* <div id="text-container" className="message-content typing">{message.text}</div> */}
                  <p style={{ color: 'white' }} className={`my-1 ${message.sender === 'me' ? 'text-end' : 'text-start'}`}>{message.text}</p>
                  {/* <p  style={{color:'white'}} className="message-content my-1 ">{message.text}</p> */}
              </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
))}
          </div>
          
      <div className=' d-flex justify-content-center fs-4'>    
      <div
        onClick={() => handlePageChange(currentPage - 1)}
        className={` ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <BsFillArrowLeftCircleFill style={{color:'white'}} />
      </div>
      <p className='d-flex  justify-content-center  text-center mb-1 mt-1 mx-4' style={{ color: '#FFFFFF' }}>
        Page {currentPage}
      </p>
      <div
        onClick={() => handlePageChange(currentPage + 1)}
        className={` ${endIndex >= filterHistory.length ? 'disabled' : ''}`}
      >
        <BsFillArrowRightCircleFill style={{color:'white'}} />
      </div>
    </div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
    </div>
  )
}

export default SectionOneSA