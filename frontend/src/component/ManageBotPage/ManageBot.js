import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../underline.css'
import { ThreeDots } from 'react-loader-spinner';
import Accordion from 'react-bootstrap/Accordion';
import '../ManageBotPage/histroy.css'

import ChatUI from '../ChatUI';

import Button from 'react-bootstrap/Button';
import env from 'react-dotenv'
import Cookies from 'js-cookie';
import ChatUIDemo from '../ChatUIDemo';

import { LineChart, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const ManageBot = (id) => {

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

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip " style={{ backgroundColor: '#FFFFFF', color: 'black' }} >
          <p className="label">{`${label}`}</p> <p> {`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }

  function CustomTooltip2({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip " style={{ backgroundColor: '#FFFFFF', color: 'black' }} >
          <p className="label">{`${label}`}</p> <p> {`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }

  const navigate = useNavigate();

  const [dataArr, setDataArr] = useState({})
  const [botname, setBot] = useState('')
  const [initialMsg, setInitialMsg] = useState('')
  const [suggestedPrompt, setSPrompt] = useState([])
  const [prompt, setPrompt] = useState('')
  const [url, setUrl] = useState('None')
  const [pdf, setPdf] = useState('None')
  const [tokenDataGraph, setTokenDataGraph] = useState('')
  const [conDataGraph, setConDataGraph] = useState('')

  const [loading, setLoading] = useState(false);
  const [loadingdel, setLoadingdel] = useState(false);
  const [loadingre, setLoadingre] = useState(false);
  const [togDel, setTogDel] = useState(false)
  const [vis, setVis] = useState('Bot Properties')
  const [resizer, setResizer] = useState(true)

  // const BACKEND = 'http://localhost:5000/'
  const BACKEND = 'http://3.138.169.250/'


  const [sendLink, setSendLink] = useState('')
  const [exclude, setExclude] = useState('')
  const [ex, setEx] = useState('')
  const [pdfFile, setPdfFile] = useState(null);
  const [togRetrain, setTogRetrain] = useState(false)
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeCon, setSelectedTimeCon] = useState('');
  const[history,setHistory]= useState('')


  const handleCreateGraph = () => {
    console.log(selectedTime)
    axios.post(`${BACKEND}api/chartToken/${id.id}`, { selectedTime }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => { if (res.data === 'nodata') { console.log(res.data); toast.error("Data Doesn't exist for this date ") }else if(res.data[0] == 'error'){console.log(res.data[1]);toast.error("Error Fetching data");} else { console.log(res.data); setTokenDataGraph(res.data) } }).catch(err => console.log(err))
  }
  const handleCreateGraphCon = () => {
    console.log(selectedTimeCon)
    axios.post(`${BACKEND}api/chartCon/${id.id}`, { selectedTimeCon }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => { if (res.data === 'nodata') { console.log(res.data); toast.error("Data Doesn't exist for this date "); }else if(res.data[0] == 'error'){console.log(res.data[1]);toast.error("Error Fetching data ");} else { console.log(res.data); setConDataGraph(res.data) } }).catch(err => console.log(err))
  }


  useEffect(() => {
    axios.get(`${BACKEND}api/updatebot/${id.id}`, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => { setDataArr(res.data); console.log(res.data) })
  }, [])

  useEffect(() => {

    setBot(dataArr.botname)
    setPrompt(dataArr.prompt)
    setUrl(dataArr.url)
    setPdf(dataArr.pdf)
    setSPrompt(dataArr.sPrompt)
    setInitialMsg(dataArr.initialMsg)
    setTokenDataGraph(dataArr.tokenData)
    setConDataGraph(dataArr.UniqueConData)
    console.log(dataArr.tokenData, "------", dataArr.UniqueConData)
    //   setUrl(dataArr.url)
  }, [dataArr])

  useEffect(() => {
    console.log("token", tokenDataGraph)
    console.log("con", conDataGraph)
  }, [tokenDataGraph, conDataGraph])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true);
    axios.put(`${BACKEND}api/updatebot/${id.id}`, { botname, prompt, initialMsg, suggestedPrompt }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then((res) => { if (res.data === 'noname') { toast.error('Bot name can,t be empty'); setLoading(false); } else { toast.success('Updated successfully!'); setLoading(false); } }).catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoading(false); })
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

  useEffect(() => {
    const textarea = document.getElementById("textareaprompt");
    if (textarea !== null) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 20 + "px";
    }
  }, [prompt, screenWidth, resizer])

  useEffect(() => {
    const textarea = document.getElementById("textareascript");
    if (textarea !== null) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 20 + "px";
    }
  }, [prompt, screenWidth, resizer])

  useEffect(() => {
    const textarea = document.getElementById("textareasug");
    if (textarea !== null) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 20 + "px";
    }
  }, [prompt, screenWidth, resizer])

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoadingdel(true);
    console.log("Delete")
    await axios.post(`${BACKEND}api/deletebot/${id.id}`, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then((res) => { if (res.data === 'suc') { toast.success('Bot Deleted'); setLoadingdel(false); } else if (res.data === 'fail') { toast.success('Some Error Occured, Try Again'); setLoadingdel(false); } })
      .then(setTimeout(() => { navigate('/mychatbots') }, 2000))
      .catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoadingdel(false); })
    //  await navigate('/mychatbots');
  }
  const handleDeleteToggle = (e) => {
    e.preventDefault()
    setTogDel(!togDel)
  }
  const handleRetrainToggle = (e) => {
    e.preventDefault()
    setTogRetrain(!togRetrain)
  }

  // #################################33 retrain api

  const handleRetrain = async (e) => {
    e.preventDefault()
    setLoadingre(true);
    const lines = ex.split('\n');
    const trimmedLines = lines.map((line) => line.trim());
    const filteredLines = trimmedLines.filter((line) => line !== '');
    setExclude(filteredLines);
    setTogRetrain(!togRetrain)
  }

  useEffect(() => {
    if (sendLink !== '' || exclude !== '' || pdfFile !== null) {
      console.log(exclude, '---exclude')

      const formData = new FormData();
      formData.append('sendLink', sendLink);
      formData.append('exclude', exclude);
      formData.append('pdfFile', pdfFile);


      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      axios.post(`${BACKEND}api/updateLinkData/${id.id}`, formData, {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
        // .then(res =>console.log("FROM BACKEND = ",res.data)).catch(err => console.log(err))
        .then(res => { if (res.data == 'BotF') { toast.error('You have Finished all your Bots, upgrade subscription for more'); setLoadingre(false); } else if (res.data == 'FillOne') { toast.error('Atleast fill one of these, PDF or website URL'); console.log("ressssssssssssss", res.data); setLoadingre(false); } else if (res.data == 'SubE') { toast.error('Your Subscription has Expired, renew subscription for more'); setLoadingre(false); } else if (res.data == 'noname') { toast.error('Botname is compulsary'); setLoadingre(false); } else if(res.data === 'ok'){ toast.success('Bot Retrained successfully!'); console.log(res.data, "CHKKKKKKKKKKKK"); setLoadingre(false); setTimeout(() => { window.location.reload(true) }, 2000) }else { toast.error('Some Error Occured!!'); console.log(res.data, "CHKKKKKKKKKKKK"); setLoading(false);  } })
        .catch(err => { console.log("error  botsection 1 ", err); toast.error('API request failed!'); setLoadingre(false); })
      console.log(formData)
    }

  }, [exclude])

  // #####################################retrain api end

  useEffect(() => {
    if (vis == 'Bot Properties') {
      setResizer(true)
    } else {
      setResizer(false)
    }
  }, [vis])

  useEffect(()=>{
    if(vis === 'Bot Analytics'){
    axios.get(`${BACKEND}api/historyget/${id.id}`, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }).then(res => {setHistory(res.data); console.log(res.data)}).catch(err => console.log(err))
  }
  },[vis])



  return (
    <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>
      <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pt-5' style={{ color: '#FFFFFF' }}>Manage Chatbot</h1>
      <h2 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 mt-5' style={{ color: '#FFFFFF' }}>{botname}</h2>
      <div>
        <ul className='fw-bolder fs-5 row col-12 d-flex justify-content-around   text-center mb-5 mt-5' style={{ color: '#FFFFFF', listStyle: 'none', textDecoration: 'none' }}>
          {['Bot Properties', 'Demo Chat', 'Bot Analytics'].map(x => (

            vis === x ?
              <button className='btn btn-link col-lg-4 col-12 fw-bold fs-5' style={{ textDecoration: 'underline', color: '#FFFFFF' }} onClick={(e) => setVis(e.target.value)} value={x} >{x}</button>
              : <button className='btn btn-link col-lg-4 col-12 fw-bold fs-5 ' style={{ textDecoration: 'none', color: '#FFFFFF' }} onClick={(e) => setVis(e.target.value)} value={x} >{x}</button>
          ))}

          {/* <button className='btn btn-link ' style={{ textDecoration:'none', color:'#FFFFFF' }} onClick={(e)=>setVis(e.target.value) } value='b' >BAAA</button>
        <button className='btn btn-link ' style={{ textDecoration:'none', color:'#FFFFFF' }} onClick={(e)=>setVis(e.target.value) } value='c' >CAAA</button> */}
        </ul>
      </div>
      {vis === 'Bot Properties' ?
        <div >
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF', marginTop:'100px' }} >Add this Script to your website to get your chatbot</label>
          <textarea id='textareascript' className='fs-4 d-flex justify-content-center container text-center  mb-3' readOnly style={{ height: '100px', width: '95%', }} placeholder='Script' value={`<script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js" defer id="popup" cred="${id.id}"></script>`} />
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >URL used</label>
          <input className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{ width: '95%' }} readOnly placeholder='URL Used' value={url} />
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >Pdf Used</label>
          <input className='fs-4 d-flex justify-content-center container mt-1 text-center  ' style={{ width: '95%', marginBottom:'100px' }} readOnly placeholder='PDF Used' value={pdf} />
          {/* update bot */}
          <div className='fs-4 col-12 d-flex justify-content-center  text-center mb-5 mt-3' style={{ color: '#FFFFFF', backgroundColor:'#242439' }}>
            <form className='col-sm-9 mb-5 col-11 mx-auto ' style={{marginTop:'50px'}}>
              <div className="form-group mt-5 mb-5 fs-2 fw-bold">
                <label  >You can update these properties :</label>
              </div>
              <div className="form-group">
                <label>Name of Chatbot</label>
                <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={botname} placeholder='Name of bot' onChange={(e) => { setBot(e.target.value); }} />
              </div>
              <div className="form-group">
                <label>Initial message from the Chatbot</label>
                <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={initialMsg} placeholder='Initial message on starting the chat' onChange={(e) => { setInitialMsg(e.target.value); }} />
              </div>
              <div className="form-group">
                <label>Suggested Queries from the Chatbot</label>
                <textarea id='textareasug' className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={suggestedPrompt} placeholder='Suggested Prompts (seperate each with ",")' onChange={(e) => { setSPrompt(e.target.value.split(",")); }} />
              </div>
              <div className="form-group">
                <label>Prompt (Don't remove text and query from the prompt)</label>
                <textarea id="textareaprompt" className='fs-4 d-flex justify-content-center container text-center mt-1  mb-3' value={prompt} placeholder='Name of bot' onChange={(e) => { setPrompt(e.target.value); e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; console.log("scroll", e.target.scrollHeight) }} />
              </div>
              <div className='form-group'>
                <button className='btn btn-outline-warning mb-3 px-5 ' onClick={(e) => handleSubmit(e)}>Update Bot</button>
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
          {/* retrain bot */}
          <div className='fs-4 col-12 d-flex row justify-content-center mx-auto text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
            <div className="form-group col-12 mt-5 mb-3 fw-bold">
              <label>Retrain your Chatbot:</label>
            </div>
            <form className='col-sm-9 col-12'>
              <div className="form-group">
                <label>Website Link you want the chatbot about</label>
                <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' value={sendLink} placeholder='website link' onChange={(e) => setSendLink(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Pages you want to exclude from the chatbot (Write each individual link in seperate line)</label>
                <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' value={ex} placeholder='link to exclude' onChange={(e) => setEx(e.target.value)} />
              </div>
              <div className="form-group mt-4 mb-3 d-flex justify-content-around flex-wrap">
                <label className='me-2'>PDF File:</label>
                <input
                  type="file"
                  accept=".pdf"
                  style={{ backgroundColor: 'white', color: 'black', borderRadius: '0px' }}
                  className="btn custom-file-input w-100 me-auto"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-outline-warning px-5 ' onClick={(e) => handleRetrainToggle(e)}>Retrain Bot</button>
                {togRetrain ?
                  <div className='form-group mt-3'>
                    <button className='btn btn-danger mx-1 ' onClick={(e) => handleRetrain(e)}>Retrain</button>
                    <button className='btn btn-secondary mx-1 ' onClick={(e) => handleRetrainToggle(e)}>No</button>
                  </div> : ''
                }
              </div>
              <div className='form-group d-flex justify-content-center'>
                {loadingre ? (
                  <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />

                ) : (
                  ''
                )}
              </div>
            </form>




            <div className='form-group mt-3'>
              <button className='btn btn-outline-danger px-5 ' onClick={(e) => handleDeleteToggle(e)}>Delete Bot</button>
            </div>
            {togDel ?
              <div className='form-group mt-3'>
                <button className='btn btn-danger mx-1 ' onClick={(e) => handleDelete(e)}>Delete</button>
                <button className='btn btn-secondary mx-1 ' onClick={(e) => handleDeleteToggle(e)}>No</button>
              </div> : ''
            }
            <div className='form-group d-flex justify-content-center'>
              {loadingdel ? (
                <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div> : ''
      }
      {vis === 'Demo Chat' ?
        <div className=''>

          <ChatUIDemo botID={id.id} />
        </div>
        : ''
      }
      {vis === 'Bot Analytics' ?
        <div >
          {/* <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }} >Analytics</label> */}
          <label className='fs-4 d-flex justify-content-center container text-center mt-5 mb-5' style={{ height: '100%', color: '#FFFFFF' }} >Tokens used</label>
          <div className='fs-4 d-flex justify-content-center  text-center mt-1 mb-5'>

            <div className="input-group mb-3 mx-2 " style={{ width: '400px' }}>
              <input type="text" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="form-control col-lg-6" placeholder="YYYY or YYYY-MM" aria-label="Recipient's username" aria-describedby="button-addon2" />
              <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => handleCreateGraph()}>Generate Graph</button>
            </div>

          </div>
           <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
            {tokenDataGraph.length === 0 ? '' :
              <ResponsiveContainer width="99%" aspect={3}>
                <LineChart width={1000} height={500} data={tokenDataGraph} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                  <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                  <XAxis dataKey="date"
                    minTickGap={10}
                    fontSize={15}
                  />
                  <YAxis allowDataOverflow={true} />
                  <Tooltip content={<CustomTooltip />} />
                </LineChart>
              </ResponsiveContainer>
            }
          </div> 

          <label className='fs-4 d-flex justify-content-center container text-center mt-5 mb-5' style={{ height: '100%', color: '#FFFFFF' }} >Unique Conversations</label>
          <div className='fs-4 d-flex justify-content-center  text-center mt-1 mb-5'>

            <div className="input-group mb-3 mx-2 " style={{ width: '400px' }}>
              <input type="text" value={selectedTimeCon} onChange={(e) => setSelectedTimeCon(e.target.value)} className="form-control col-lg-6" placeholder="YYYY or YYYY-MM" aria-label="Recipient's username" aria-describedby="button-addon2" />
              <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => handleCreateGraphCon()}>Generate Graph</button>
            </div>

          </div>
          <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
            {conDataGraph.length === 0 ? '' :
              <ResponsiveContainer width="99%" aspect={3}>
                <LineChart width={1000} height={500} data={conDataGraph} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                  <Line type="monotone" dataKey="ConNo" stroke="#8884d8" />
                  <XAxis dataKey="date"
                    minTickGap={10}
                    fontSize={15}
                  />
                  <YAxis allowDataOverflow={true} />
                  <Tooltip content={<CustomTooltip2 />} />
                </LineChart>
              </ResponsiveContainer>
            }
          </div>

          <div className='fs-4 col-12 row d-flex justify-content-center text-center  mb-5 mt-3 mx-1 ' style={{ color: '#FFFFFF' }}>
            <label className='fs-4 d-flex justify-content-center  col-11 text-center mt-5 mb-5 mx-2' style={{ height: '100%', color: '#FFFFFF' }}>Chat History</label>
          {history === '' ? '':
          history.sort((a, b) => new Date(b.time) - new Date(a.time)).map(x =>
            <Accordion alwaysOpen='false' className='col-11 my-2 custom-accordion' >
              <Accordion.Item eventKey="0" style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0' }} >
                <Accordion.Header >{x.time}</Accordion.Header>
                <Accordion.Body style={{ color: 'white' }} >
                 {x.history.map(message=>
                  <div
                  key={message.id}
                  className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                  style={message.sender === 'me' ? messageStyleSend : messageStyleRec}
              >
                  {/* <div id="text-container" className="message-content typing">{message.text}</div> */}
                  <p  style={{color:'white'}} className="message-content my-1 ">{message.text}</p>
              </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
)}
          </div>

        </div> : ''
      }
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
    </div>
  )
}


export default ManageBot