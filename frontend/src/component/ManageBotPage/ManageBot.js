import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../underline.css'
import { ThreeDots } from 'react-loader-spinner';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { Tooltip as Tp } from 'react-tooltip'
import '../ManageBotPage/histroy.css'

import { FaRegCopy } from 'react-icons/fa'
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
  const [embeddedQA, setEmbeddedQA] = useState([])
  const [tokenDataGraph, setTokenDataGraph] = useState('')
  const [conDataGraph, setConDataGraph] = useState('')

  const [loading, setLoading] = useState(false);
  const [loadingdel, setLoadingdel] = useState(false);
  const [loadingre, setLoadingre] = useState(false);
  const [togDel, setTogDel] = useState(false)
  const [vis, setVis] = useState('Bot Properties')
  const [resizer, setResizer] = useState(true)

  // const BACKEND = 'http://localhost:5000/'
  // const BACKEND = 'https://zemaapi.zema.io/'
  const BACKEND = process.env.REACT_APP_BACKEND

  const [apiload,setApiload] = useState(false)


  const [sendLink, setSendLink] = useState('')
  const [exclude, setExclude] = useState('')
  const [ex, setEx] = useState('')
  const [pdfFile, setPdfFile] = useState(null);
  const [togRetrain, setTogRetrain] = useState(false)
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeCon, setSelectedTimeCon] = useState('');
  const [history, setHistory] = useState('')
  const [urlsUsed, setUrlsUsed] = useState([])
  const [urlsEx, setUrlsEx] = useState([])
  const [sources,setSources] = useState([])


  const handleCreateGraph = () => {
    console.log(selectedTime)
    axios.post(`${BACKEND}api/chartToken/${id.id}`, { selectedTime }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => { if (res.data === 'nodata') { console.log(res.data); toast.error("Data Doesn't exist for this date ") } else if (res.data[0] == 'error') { console.log(res.data[1]); toast.error("Error Fetching data"); } else { console.log(res.data); setTokenDataGraph(res.data) } }).catch(err => console.log(err))
  }
  const handleCreateGraphCon = () => {
    console.log(selectedTimeCon)
    axios.post(`${BACKEND}api/chartCon/${id.id}`, { selectedTimeCon }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => { if (res.data === 'nodata') { console.log(res.data); toast.error("Data Doesn't exist for this date "); } else if (res.data[0] == 'error') { console.log(res.data[1]); toast.error("Error Fetching data "); } else { console.log(res.data); setConDataGraph(res.data) } }).catch(err => console.log(err))
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
    setUrlsUsed(dataArr.urlsUsed)
    setUrlsEx(dataArr.urlsEx)
    setEmbeddedQA(dataArr.embeddedQA)
    if (dataArr && dataArr.metadataUnique) {
      setSources(dataArr.metadataUnique.map(item => item.source));
    console.log(dataArr,"---131----",dataArr.metadataUnique.map(item => item.source))

    }
    setSPrompt(dataArr.sPrompt)
    setInitialMsg(dataArr.initialMsg)
    setTokenDataGraph(dataArr.tokenData)
    setConDataGraph(dataArr.UniqueConData)
    console.log("------qqqqqqqq--", dataArr.urlsUsed)
    console.log(dataArr.url, "------", dataArr.UniqueConData)
    console.log("------qqqpdfffffqqqqq--", dataArr.pdf)

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
    }).then((res) => { if (res.data === 'noname') { toast.error("Bot name can't be empty"); setLoading(false); } else { toast.success('Updated Successfully!'); setLoading(false); } }).catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoading(false); })
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
  useEffect(() => {
    const textarea = document.getElementById("textareapdf");
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
    }).then((res) => { if (res.data === 'suc') { toast.success('Bot Deleted'); setLoadingdel(false); } else if (res.data === 'fail') { toast.error('Some Error Occured, Try Again'); setLoadingdel(false); } else{ toast.error('Some Error Occured, Try Again'); setLoadingdel(false); console.log(res.data)} })
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

  const [multiLink, setMultiLink] = useState(false);
  const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      setMultiLink("Y")
    } else {
      setMultiLink("N")
    }
  };

  const [addPdf, setAddPdf] = useState("N");
  const handleCheckboxChangePdf = (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      setAddPdf("Y")
    } else {
      setAddPdf("N")
    }
  };

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
      formData.append('multiLink', multiLink);
      formData.append('addDataToExisting', addPdf);

      // formData.append('pdfFile', pdfFile);
      if (pdfFile) {
        for (let i = 0; i < pdfFile.length; i++) {
          formData.append(`pdfFile[]`, pdfFile[i]);
          console.log(`pdfFile[]`, pdfFile[i])
        }
      }



      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      axios.post(`${BACKEND}api/updateLinkData/${id.id}`, formData, {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
        // .then(res =>console.log("FROM BACKEND = ",res.data)).catch(err => console.log(err))
        .then(res => { if (res.data == 'BotF') { toast.error('You have Finished all your Bots, upgrade subscription for more'); setLoadingre(false); } else if (res.data == 'FillOne') { toast.error('Atleast fill one of these, PDF or website URL'); console.log("ressssssssssssss", res.data); setLoadingre(false); } else if (res.data == 'SubE') { toast.error('Your Subscription has Expired, renew subscription for more'); setLoadingre(false); } else if (res.data == 'noname') { toast.error('Botname is compulsary'); setLoadingre(false); } else if (res.data === 'ok') { toast.success('Bot Retrained Successfully!'); console.log(res.data, "CHKKKKKKKKKKKK"); setLoadingre(false); setTimeout(() => { window.location.reload(true) }, 2000) } else { toast.error('Some Error Occured!!'); console.log(res.data, "CHKKKKKKKKKKKK"); setLoading(false); } })
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

  useEffect(() => {
    if (vis === 'Bot Analytics') {
      axios.get(`${BACKEND}api/historyget/${id.id}`, {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }).then(res => {if(res.data[0]== 'error'){console.log("321----",res.data[1])}else{ setHistory(res.data); console.log("history ", res.data)} }).catch(err => console.log(err))
    }
  }, [vis])


  const [minHeight, setMinHeight] = useState(500);

  const breakpoints = {
    small: 768,
    medium: 1024,
  };
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < breakpoints.small) {
        setMinHeight(200);
      } else if (screenWidth < breakpoints.medium) {
        setMinHeight(300);
      } else {
        setMinHeight(500);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [searchTermPay, setSearchTermPay] = useState([]);
  const [filterHistory, setFilterHistory] = useState([])

  useEffect(() => {
    setFilterHistory(history)
  }, [history])

  const handleSearchPay = (e) => {
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
  const itemsPerPage = 10;
  const [sortedHistory, setSortedHistory] = useState([]);

  useEffect(() => {
    const sortedData = Array.isArray(filterHistory)
      ? filterHistory.sort((a, b) => new Date(b.time) - new Date(a.time))
      : [];

    setSortedHistory(sortedData);
    setCurrentPage(1)
  }, [filterHistory]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToDisplay = sortedHistory.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(sortedHistory.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion2 = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

  const [manageSAdata, setManageSAdata] = useState('')
  const [embedScript, setEmbedScript] = useState('')

  useEffect(() => {
    setApiload(true)
    axios.post(`${BACKEND}api/getmanagesa`, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => { console.log(res.data, "======"); setManageSAdata(res.data[1]);setApiload(false) }).catch(err => {console.log(err);setApiload(false)})
  }, [])

  useEffect(() => {
    if (manageSAdata.embedScript != undefined) {
      setEmbedScript(manageSAdata.embedScript.replace(/\${id\.id}/g, id.id))
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", manageSAdata.embedScript.replace(/\${id\.id}/g, id.id))

    }
  }, [manageSAdata])

  const handleCopyClick = () => {

    const textArea = document.createElement('textarea');
    textArea.value = embedScript;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    toast.success('Script Copied', 3000)
  };

  const handleRemoveMetadata=(data)=>{
    // e.preventDefault()
    console.log("remove    ",data)
    axios.post(`${BACKEND}api/deletemetadata/${id.id}`, {data},{
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then(res => {if(res.data[0] == 'Error'){console.log(res.data[1]);toast.error('Some Error Occured!!!')}else if(res.data == 'ok'){toast.success("Data Removed");setTimeout(() => { window.location.reload(true) }, 1000)}else{console.log(res.data);toast.error("Some Error Occured")}}).catch(err => {toast.error('Some Error Occured');console.log(err)})

  }

  return (
    <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>
      <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pt-5' style={{ color: '#FFFFFF' }}>Manage Chatbot</h1>
      <h2 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 mt-5' style={{ color: '#FFFFFF' }}>{botname}</h2>
      <div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>
      <div>
        <ul className='fw-bolder fs-5 row col-12 d-flex justify-content-around   text-center mb-5 mt-5' style={{ color: '#FFFFFF', listStyle: 'none', textDecoration: 'none' }}>
          {['Bot Properties', 'Demo Chatbot', 'Bot Analytics'].map(x => (

            // vis === x ?
            //   <button className='btn btn-link col-lg-4 col-12 fw-bold fs-5' style={{ textDecoration: 'underline', color: '#FFFFFF' }} onClick={(e) => setVis(e.target.value)} value={x} >{x}</button>
            //   : <button className='btn btn-link col-lg-4 col-12 fw-bold fs-5 ' style={{ textDecoration: 'none', color: '#FFFFFF' }} onClick={(e) => setVis(e.target.value)} value={x} >{x}</button>
         
            vis === x ?
            <div className='me-sm-auto p-0 col-lg-4 col-12   my-2'>
            <button className='btn btn-link px-0 fw-bold fs-5' style={{ textDecoration: 'underline', color: '#FFFFFF' }} onClick={(e) => setVis(e.target.value)} value={x} >{x}</button>
           </div>
            :
            <div className=' me-sm-auto p-0 col-lg-4 col-12  my-2'> 
            <button className='btn btn-link px-0 col-lg-4 col-12 fw-bold fs-5 ' style={{ textDecoration: 'none', color: '#FFFFFF' }} onClick={(e) => setVis(e.target.value)} value={x} >{x}</button>
</div>        
        ))}

          {/* <div className='col-sm-5 me-sm-auto p-0 col-11 my-2'>
            <Button className='  p-0 fw-bolder fs-5 link d-flex justify-content-center mx-auto text-center  my-2' style={{ color: '#FFFFFF' }} variant="link"><Link className='' to='/pricing' style={{ color: '#FFFFFF' }}>Get a Chatbot</Link></Button>
          </div> */}

        </ul>
      </div>
      {vis === 'Bot Properties' ?
        <div >
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF', marginTop: '100px' }} >Add this Script to your website to get your chatbot</label>
          {/* <textarea id='textareascript' className='fs-4 d-flex justify-content-center container text-center  mb-3' readOnly style={{ height: '100px', width: '95%', }} placeholder='Script' value={`<script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js" defer id="popup" cred="${id.id}"></script>`} /> */}

          <Tp anchorSelect=".my-anchor-element-script" style={{ backgroundColor: "rgba(255, 255, 255,1)", color: "#000000", fontWeight: 'bolder' }} place="top">
            Click to Copy the script
          </Tp>
          <textarea id='textareascript' className='fs-4 d-flex justify-content-center my-anchor-element-script container text-center  mb-3' readOnly style={{ height: '100px', width: '95%', }} placeholder='Script' value={embedScript}
            onClick={handleCopyClick}
          />


          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >URL Used</label>

          <input className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{ width: '95%' }} readOnly placeholder='URL Used' value={url} />
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >PDF Used</label>
          {
            pdf == undefined || pdf.length == 0  ?
            <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{ width: '95%' }} readOnly placeholder='PDF Used' value={pdf} />
:
<textarea id='textareapdf' className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{ width: '95%' }} readOnly placeholder='PDF Used' value={Array.isArray(pdf) ? pdf.map(String).join('\n') : ''} />

          }
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >URLs Scrapped</label>
          <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' style={{ width: '95%', height: '150px' }} readOnly placeholder='URLs scrapped' value={Array.isArray(urlsUsed) ? urlsUsed.join('\n') : ''} />
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >URLs Excluded</label>
          <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' style={{ width: '95%' }} readOnly placeholder='URLs excluded' value={Array.isArray(urlsEx) ? urlsEx.join('\n') : ''} />

          {/* {
            embeddedQA && embeddedQA.length > 0 && (
              <>
                <Accordion alwaysOpen='false' className='col-10 my-4 mx-auto custom-accordion' style={{ marginBottom: '100px'}} >
                  <Accordion.Item eventKey="0" style={{ backgroundColor: '#212529', border: '1px solid #171725' }} >
                    <Accordion.Header>
                    <label className='fs-4 d-flex justify-content-center container text-center ' style={{ height: '100%', color: '#FFFFFF' }}>
                  Embedded Q/A
                </label> 
                    </Accordion.Header>
                    <Accordion.Body style={{ color: 'white', backgroundColor: '#171725' }} >
                      {embeddedQA.map((item, index) => (
                        <>
                          <div key={index} className='mt-5'>
                            <input
                              className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3'
                              style={{ width: '95%' }}
                              readOnly
                              placeholder='Embedded Q/A'
                              value={item.question}
                            />
                            <textarea
                              className='fs-4 d-flex justify-content-center container mt-1 text-center mb-5'
                              style={{ width: '95%' }}
                              readOnly
                              placeholder='Embedded Q/A'
                              value={item.answer}
                            />
                            
                          </div>
                        </>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>
            )
          } */}

          {embeddedQA && embeddedQA.length > 0 && (
            <>
              <Accordion
                activeKey={isAccordionOpen ? '0' : null}
                onSelect={toggleAccordion2}
                className='col-10 my-4 mx-auto custom-accordion'
                style={{ marginBottom: '100px' }}
              >
                <Accordion.Item eventKey="0" style={{ backgroundColor: '#212529', border: '1px solid #171725' }}>
                  <Accordion.Header>
                    <div className='d-flex justify-content-center fs-4 container text-center' style={{ height: '100%', color: '#FFFFFF' }}>
                      Embedded Q/A
                      <span style={{
                        color: '#FFE459',
                        position: 'absolute',
                        right: '25px', // Adjust this value to fine-tune the position
                        top: '50%',
                        fontSize: '34px',
                        transform: 'translateY(-50%)',
                      }}>
                        {isAccordionOpen ? '-' : '+'}
                      </span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body style={{ color: 'white', backgroundColor: '#171725' }}>
                    {embeddedQA.map((item, index) => (
                      <div key={index} className='mt-5'>
                        <input
                          className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3'
                          style={{ width: '95%' }}
                          readOnly
                          placeholder='Embedded Q/A'
                          value={item.question}
                        />
                        <textarea
                          className='fs-4 d-flex justify-content-center container mt-1 text-center mb-5'
                          style={{ width: '95%' }}
                          readOnly
                          placeholder='Embedded Q/A'
                          value={item.answer}
                        />
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </>
          )}

<div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
          <Card.Body className="d-flex flex-column" style={{}}>

            {
              sources.map(x => (
                <div className='row col-12 mt-2 d-flex justify-content-between pb-2' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                  <div className='col-lg-10 col-sm-10'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>
                      {x.replace('/home/ubuntu/zema/PDF/', '')}
                      </p>
                  </div>
                  <div className='col-lg-2 col-sm-2'>
                    <button className='btn btn-outline-danger col-12 d-flex justify-content-center text-center ' value={x} 
                    onClick={(e)=>{handleRemoveMetadata(e.target.value)}}
                     style={{  }}>Remove</button>
                  </div>
                </div>
              ))}
          </Card.Body>
        </Card>
      </div>

          {/* update bot */}
          <div className='fs-4 col-12 d-flex justify-content-center  text-center mb-5 mt-3' style={{ color: '#FFFFFF', backgroundColor: '#242439' }}>
            <form className='col-sm-9 mb-5 col-11 mx-auto ' style={{ marginTop: '50px' }}>
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
                <textarea id="textareaprompt" className='fs-4 d-flex justify-content-center container text-start mt-1  mb-3' value={prompt} placeholder='Name of bot' onChange={(e) => { setPrompt(e.target.value); e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; console.log("scroll", e.target.scrollHeight) }} />
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
              <div className="form-check form-switch mt-1 d-flex justify-content-center mb-3">
                <input
                  className="form-check-input my-anchor-element me-4"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                  Scrap data from URLs found inside the above url
                </label>
                <Tp anchorSelect=".my-anchor-element" style={{ backgroundColor: "rgba(255, 255, 255,1)", color: "#000000",fontWeight:'bolder',width:'90vw' }} place="top">
  In "Off State", the chatbot will have data from only the URL provided. <br/> In "On State", the chatbot will also have data from additional webpages whose URLs it finds in the given webpage 
</Tp>
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
                  className="btn custom-file-input w-100 me-auto my-anchor-element-pdf"
                  onChange={(e) => setPdfFile(e.target.files)}
                  multiple
                />
              </div>
              <Tp anchorSelect=".my-anchor-element-pdf" style={{ backgroundColor: "rgba(255, 255, 255,1)", color: "#000000",fontWeight:'bolder',width:'90vw' }} place="top">
You can use multiple PDF files as knowledge base.
</Tp>
              <div className="form-check form-switch mt-1 d-flex justify-content-center mb-3">
                <input
                  className="form-check-input my-anchor-element-add me-4"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={handleCheckboxChangePdf}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                 Add data to existing knowledge base
                </label>
                <Tp anchorSelect=".my-anchor-element-add" style={{ backgroundColor: "rgba(255, 255, 255,1)", color: "#000000",fontWeight:'bolder',width:'90vw' }} place="top">
In 'OFF' state, the knowledge base will be replaced by new data <br/>
In 'ON' state, the new data will be added to existing knowledge base.
</Tp>
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
      {vis === 'Demo Chatbot' ?
        <div className=''>

          <ChatUIDemo botID={id.id} />
        </div>
        : ''
      }
      {vis === 'Bot Analytics' && apiload == false ?
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
              <ResponsiveContainer width="99%" minHeight={minHeight}>
                <LineChart width={1000} height={500} data={tokenDataGraph} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                  <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                  <XAxis dataKey="date"
                    minTickGap={10}
                    style={{ fontSize: '14px' }}
                  />
                  <YAxis style={{ fontSize: '14px' }} allowDataOverflow={true} />
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
              <ResponsiveContainer width="99%" minHeight={minHeight}>
                <LineChart width={1000} height={500} data={conDataGraph} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                  <Line type="monotone" dataKey="ConNo" stroke="#8884d8" />
                  <XAxis dataKey="date"
                    minTickGap={10}
                    style={{ fontSize: '14px' }}
                  />
                  <YAxis style={{ fontSize: '14px' }} allowDataOverflow={true} />
                  <Tooltip content={<CustomTooltip2 />} />
                </LineChart>
              </ResponsiveContainer>
            }
          </div>

          <div className='fs-4 col-12 row d-flex justify-content-center text-center  mb-5 mt-3 mx-1 ' style={{ color: '#FFFFFF' }}>
            <label className='fs-4 d-flex justify-content-center  col-11 text-center mt-5 mb-5 mx-2' style={{ height: '100%', color: '#FFFFFF' }}>Chat History</label>

            <input className='fs-4 col-sm-8 col-lg-10 col-11 d-flex justify-content-center rounded-4  mt-4 text-center mb-3 ' type="text"
              placeholder="Search..."
              value={searchTermPay}
              onChange={handleSearchPay}
            />
            {/* {filterHistory === '' ? '' :
              // filterHistory.sort((a, b) => new Date(b.time) - new Date(a.time)).map(x =>
              itemsToDisplay.map((x, index) => (
                <Accordion alwaysOpen='false' key={index} className='col-11 my-2 custom-accordion'
          
                >
                  <Accordion.Item eventKey="0" style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0' }} >
                    <Accordion.Header >
                      {x.time}
                    </Accordion.Header>
                    <Accordion.Body style={{ color: 'white' }} >
                      {x.history.map(message =>
                        <div
                          key={message.id}
                          className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                          style={message.sender === 'me' ? messageStyleSend : messageStyleRec}
                        >
                    
                          <p style={{ color: 'white' }} className="message-content my-1 ">{message.text}</p>
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))} */}
            {filterHistory === ''
              ? ''
              : itemsToDisplay.map((x, index) => (
                <Accordion
                  alwaysOpen='false'
                  key={index}
                  className='col-11 my-2 custom-accordion'
                  activeKey={openAccordionIndex === index ? '0' : null}
                  onSelect={() => toggleAccordion(index)}
                >
                  <Accordion.Item eventKey="0" style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0' }}>
                    <Accordion.Header>
                      {x.time} {x.Name} {x.Email}
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
                    <Accordion.Body style={{ color: 'white' }}>
                      {x.history.map((message) => (
                        <div
                          key={message.id}
                          className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                          style={message.sender === 'me' ? messageStyleSend : messageStyleRec}
                        >
                          <p style={{ color: 'white' }} className={`my-1 ${message.sender === 'me' ? 'text-end' : 'text-start'}`}>
                            {message.text}
                          </p>
                        </div>
                      ))}
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
              <BsFillArrowLeftCircleFill style={{ color: 'white' }} />
            </div>
            <p className='d-flex  justify-content-center  text-center mb-1 mt-1 mx-4' style={{ color: '#FFFFFF' }}>
              Page {currentPage}
            </p>
            <div
              onClick={() => handlePageChange(currentPage + 1)}
              className={` ${endIndex >= filterHistory.length ? 'disabled' : ''}`}
            >
              <BsFillArrowRightCircleFill style={{ color: 'white' }} />
            </div>
          </div>

        </div> : ''
      }
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
    </div>
  )
}


export default ManageBot