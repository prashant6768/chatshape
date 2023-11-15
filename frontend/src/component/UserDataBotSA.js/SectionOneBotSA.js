import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { Button, Dropdown } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'


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

const SectionOneBotSA = (id) => {

  const decoded = Cookies.get('accessToken');
  const adminToken = Cookies.get('adminToken')

  // const BACKEND = 'http://localhost:5000/'
  const BACKEND = 'https://zemaapi.zema.io/'


  const [comData, setComData] = useState([])


  const [data, setData] = useState([])
  const [inputDateToken, setInputDateToken] = useState('');

  const [apiload,setApiload] = useState(false)

  useEffect(() => {
    console.log("id ", id.id)
    setApiload(true)
    axios.post(`${BACKEND}api/admin/dataBot/${id.id}`, { decoded, adminToken }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => {if(res.data[1] == 'ok'){
        console.log(res.data[0], "all the data");
        setData(res.data[0]);
        setApiload(false)
      }else if(res.data == 'You Are Not Authorized'){setApiload(false);toast.error('You Are Not Authorized')}else{console.log(res.data);toast.error("Some Error Ocuured!!!");setApiload(false)}})
      .catch(err => {console.log(err);setApiload(false)})
  }, [])


  useEffect(() => {
    if (data.length !== 0) {

      const combinedData = [];
      console.log(data)
      // Combine data from tokenData
      for (let i = 0; i < data.tokenData.length; i++) {
        const tokenItem = data.tokenData[i];
        const uniqueItem = data.uniqueData[i];

        const combinedItem = {
          date: tokenItem.date,
          usage: tokenItem.usage,
          ConNo: uniqueItem.ConNo,
        };

        combinedData.push(combinedItem);
      }

      console.log("combinedData", combinedData);
      setComData(combinedData)
      setFilteredDataBot(combinedData)
    }
  }, [data])


  const handleDateChangeToken = (e) => {
    setInputDateToken(e.target.value);
  };

  const [filteredDataTokenG, setFilteredDataTokenG] = useState([]);

  const handleSubmitToken = (e) => {
    e.preventDefault();
    // console.log("con ",totalUniConPerDate)
    const filtered = data.tokenData.filter((item) => {
      const itemDate = item.date;
      return itemDate.startsWith(inputDateToken);
    });
    const filtered100 = filtered.map((item) => ({
      ...item
    }));
    setFilteredDataTokenG(filtered100);
    console.log("filtered  ", filtered100)
    if(filtered100.length == 0){
      toast.error("Data Doesn't exist for this date ")
    }
  };


  const [inputDateCon, setInputDateCon] = useState('');

  const handleDateChangeCon = (e) => {
    setInputDateCon(e.target.value);
  };

  const [filteredDataConG, setFilteredDataConG] = useState([]);

  const handleSubmitCon = (e) => {
    e.preventDefault();
    // console.log("con ",totalUniConPerDate)
    const filtered = data.uniqueData.filter((item) => {
      const itemDate = item.date;
      return itemDate.startsWith(inputDateCon);
    });
    const filtered100 = filtered.map((item) => ({
      ...item
    }));
    setFilteredDataConG(filtered100);
    console.log("filtered Con 000000 ", filtered100)
    if(filtered100.length == 0){
      toast.error("Data Doesn't exist for this date ")
    }
  };



  const [searchTermBot, setSearchTermBot] = useState([]);
  const [isOpenBot, setIsOpenBot] = useState(false);
  const [filteredDataBot, setFilteredDataBot] = useState([])
  const [sortOrderBot, setSortOrderBot] = useState('asc');
  const refBot = useRef()

  const toggleDropdownBot = () => {
    setIsOpenBot(!isOpenBot);
  };

  const handleSearchBot = (e) => {
    const input = e.target.value;
    setSearchTermBot(input);
    console.log(input, data)



    const filtered = comData.filter((item) => {
      const regex = new RegExp(input, 'i');
      for (const key in item) {
        if (item.hasOwnProperty(key) && regex.test(item[key])) {
          return true;
        }
      }
      return false;
    });
    setFilteredDataBot(filtered);
    console.log("filtered", filtered)

  };



  const sortDataBot = (order, sortBy) => {
    const sorted = [...comData].sort((a, b) => {
      let valueA, valueB;

      if (sortBy === 'uniCon') {
        valueA = a.ConNo;
        valueB = b.ConNo;
      } else if (sortBy === 'tokenUsage') {
        valueA = a.usage;
        valueB = b.usage;
      }

      if (order === 'asc') {
        return valueA - valueB;
      } else if (order === 'desc') {
        return valueB - valueA;
      } else {
        return 0;
      }
    });

    if (order === '') {
      setFilteredDataBot([...filteredDataBot]);
    } else {
      setFilteredDataBot(sorted);
    }
    setSortOrderBot(order);
  };


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


  const [errData, setErrData] = useState([])
  const [searchTermError, setSearchTermError] = useState('');
  const [filteredDataError, setFilteredDataError] = useState(data);

  useEffect(() => {
    axios.post(`${BACKEND}api/admin/errorLogIndi/${id.id}`, { decoded, adminToken }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => {if(res.data[1] == 'ok'){
        console.log(res.data[0], "all the error data");
        setErrData(res.data[0])
      }else if(res.data == 'You Are Not Authorized'){toast.error("You Are Not Authorized")}else{toast.error("Some Error Occured")}})
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    setFilteredDataError(errData)
  }, [errData])

  const handleSearchError = (e) => {
    const input = e.target.value;
    setSearchTermError(input);

    const filtered = errData.filter((item) => {
      const regex = new RegExp(input, 'i');
      for (const key in item) {
        if (item.hasOwnProperty(key) && regex.test(item[key])) {
          return true;
        }
      }
      return false;
    });

    setFilteredDataError(filtered);
  };


  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrollToElement, setScrollToElement] = useState(null);
  const detailsRef = useRef(null);

  const handleDetailsClick = (item, index) => {
    setSelectedItem(item);
    console.log(item, "=========")
    setShowDetails(true);
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

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

  const [togDel, setTogDel] = useState(false)
  const [loadingdel, setLoadingdel] = useState(false);
  const navigate = useNavigate();


  const handleDeleteToggle = (e) => {
    e.preventDefault()
    setTogDel(!togDel)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoadingdel(true);
    console.log("Delete")
    await axios.post(`${BACKEND}api/deletebot/${data.bot_id}`, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then((res) => { if (res.data === 'suc') { toast.success('Bot Deleted'); setLoadingdel(false); } else if (res.data === 'fail') { toast.success('Some Error Occured, Try Again'); setLoadingdel(false);  } })
      .then(setTimeout(() => { navigate(`/superadminUserData`) }, 2000))
      .catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoadingdel(false); })
      // .then((res) => { if (res.data === 'suc') { toast.success('Bot Deleted'); setLoadingdel(false); } else if (res.data === 'fail') { toast.error('Some Error Occured, Try Again'); setLoadingdel(false); } })
      // .then(setTimeout(() => { navigate('/mychatbots') }, 2000))
      // .catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoadingdel(false); })
  }

  const itemsPerPage = 10;
  const [currentPageBot, setCurrentPageBot] = useState(1);

  useEffect(() => {
    setCurrentPageBot(1)
  }, [filteredDataBot]);

  const startIndexBot = (currentPageBot - 1) * itemsPerPage;
  const endIndexBot = startIndexBot + itemsPerPage;

  const itemsToDisplayDataBot = filteredDataBot.slice(startIndexBot, endIndexBot);

  const handlePageChangeBot = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredDataBot.length / itemsPerPage)) {
      setCurrentPageBot(page);
    }
  };

  const [currentPageErr, setCurrentPageErr] = useState(1);

  useEffect(() => {
    setCurrentPageErr(1)
  }, [filteredDataError]);

  const startIndexErr = (currentPageErr - 1) * itemsPerPage;
  const endIndexErr = startIndexErr + itemsPerPage;

  const itemsToDisplayDataErr = filteredDataError.slice(startIndexErr, endIndexErr);

  const handlePageChangeErr = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredDataError.length / itemsPerPage)) {
      setCurrentPageErr(page);
    }
  };

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion2 = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const [botname, setBot] = useState('')
  const [initialMsg, setInitialMsg] = useState('')
  const [suggestedQuery, setSPrompt] = useState([])
  const [prompt, setPrompt] = useState('')
  const [url, setUrl] = useState('None')
  const [pdf, setPdf] = useState('None')
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
   setBot(data.botname)
   setInitialMsg(data.initialMsg)
   setSPrompt(data.suggestedQuery)
   setPrompt(data.prompt)
  },[data])

  const [multiLink, setMultiLink] = useState(false);
  const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      setMultiLink("Y")
    } else {
      setMultiLink("N")
    }
  };

  const handleSubmitEditBot = (e) => {
    e.preventDefault()
    setLoading(true);
    axios.post(`${BACKEND}api/admin/updatebot/${id.id}`, { botname, prompt, initialMsg, suggestedQuery,decoded, adminToken }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then((res) => { if (res.data === 'noname') { toast.error("Bot name can't be empty"); setLoading(false); }else if(res.data == 'You Are Not Authorized'){toast.error('You Are Not Authorized');setLoading(false)} else if(res.data == 'Update Successful') { toast.success('Updated successfully!'); setLoading(false); }else{toast.error("Couldn't Update")} }).catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoading(false); })
  }

  const [sendLink, setSendLink] = useState('')
  const [exclude, setExclude] = useState('')
  const [ex, setEx] = useState('')
  const [pdfFile, setPdfFile] = useState(null);
  const [togRetrain, setTogRetrain] = useState(false)
  const [loadingre, setLoadingre] = useState(false);

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
      formData.append('multiLink', multiLink);

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
        .then(res => { if (res.data == 'BotF') { toast.error('You have Finished all your Bots, upgrade subscription for more'); setLoadingre(false); } else if (res.data == 'FillOne') { toast.error('Atleast fill one of these, PDF or website URL'); console.log("ressssssssssssss", res.data); setLoadingre(false); } else if (res.data == 'SubE') { toast.error('Your Subscription has Expired, renew subscription for more'); setLoadingre(false); } else if (res.data == 'noname') { toast.error('Botname is compulsary'); setLoadingre(false); } else if(res.data === 'ok'){ toast.success('Bot Retrained successfully!'); console.log(res.data, "CHKKKKKKKKKKKK"); setLoadingre(false); setTimeout(() => { window.location.reload(true) }, 2000) }else { toast.error('Some Error Occured!!'); console.log(res.data, "CHKKKKKKKKKKKK"); setLoading(false);  } })
        .catch(err => { console.log("error  botsection 1 ", err); toast.error('API request failed!'); setLoadingre(false); })
      console.log(formData)
    }

  }, [exclude])

  const[ansE,setAnsE]=useState('')
  const[queE,setQueE]=useState('')

  const handleEmbedQuestion=(e)=>{
    e.preventDefault()
    if(queE == '' || ansE == ''){
        toast.error('Fill both fields')
    }else{

        setLoading(true);
    axios.post(`${BACKEND}api/embedQuestion/${id.id}`, { queE ,ansE }, {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }).then(res => {if(res.data === 'success'){console.log("--430-",res.data); toast.success('Questions embedded into the Knowledge Base'); setLoading(false);setAnsE('');setQueE('')}else{toast.error("Some Error Occured"); setLoading(false);setAnsE('');setQueE('')}}).catch(err => {console.log(err);toast.error("Some Error Occured !!!!"); setLoading(false);setAnsE('');setQueE('') })
    // .then(res => { if (res.data === 'Yes') { toast.success('Font Changes were successful'); setLoading(false); } else { toast.success('Some error occured'); setLoading(false); } }).catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoading(false); })
    }

}

const [searchTermPay, setSearchTermPay] = useState([]);
const[filterHistory,setFilterHistory]= useState([])
const[history,setHistory]= useState('')

useEffect(()=>{
  axios.get(`${BACKEND}api/historyget/${id.id}`, {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }).then(res => {setHistory(res.data); console.log("history ",res.data)}).catch(err => console.log(err))
},[])

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


const [issueData, setIssueData] = useState([])
const [searchTermIssue, setSearchTermIssue] = useState('');
const [filteredDataIssue, setFilteredDataIssue] = useState(data);

useEffect(() => {
  axios.post(`${BACKEND}api/admin/issueLogIndi/${id.id}`, { decoded, adminToken }, {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
    .then(res => {if(res.data[1]=='ok'){
      console.log(res.data[0], "all the error data");
      setIssueData(res.data[0])
    }else if(res.data == 'You Are Not Authorized'){toast.error('You Are Not Authorized')}else{toast.error('Some Error Occured')}})
    .catch(err => console.log(err))
}, [])

useEffect(() => {
  setFilteredDataIssue(issueData)
}, [issueData])

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

const [currentPageIssue, setCurrentPageIssue] = useState(1);

useEffect(() => {
  setCurrentPageIssue(1)
}, [filteredDataIssue]);

const startIndexIssue = (currentPageIssue - 1) * itemsPerPage;
const endIndexIssue = startIndexIssue + itemsPerPage;

const itemsToDisplayDataIssue = filteredDataIssue.slice(startIndexIssue, endIndexIssue);

const handlePageChangeIssue = (page) => {
  if (page >= 1 && page <= Math.ceil(filteredDataIssue.length / itemsPerPage)) {
    setCurrentPageIssue(page);
  }
};

const [showDetailsIssue, setShowDetailsIssue] = useState(false);
const [selectedItemIssue, setSelectedItemIssue] = useState(null);
const [scrollToElementIssue, setScrollToElementIssue] = useState(null);
const detailsRefIssue = useRef(null);

const handleDetailsClickIssue = (item, index) => {
  setSelectedItemIssue(item);
  console.log(item, "=====issue====")
  setShowDetailsIssue(true);
  setTimeout(() => {
    if (detailsRefIssue.current) {
      detailsRefIssue.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
};

const closeDetailsIssue = () => {
  setShowDetailsIssue(false);
};

function abbrNum(number, decPlaces) {

  decPlaces = Math.pow(10, decPlaces);
  var abbrev = ["k", "m", "b", "t"];
  for (var i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round(number * decPlaces / size) / decPlaces;
      if ((number == 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i++;
      }
      number += abbrev[i];
      break;
    }
  } 
  return number;
}

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

      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Bot - {data.name}</h3>
      <div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>
        {
          data.url ?
      <h5 className='fw-bolder col-12 d-flex justify-content-start container text-start pt-3 mb-2' style={{ color: '#FFFFFF' }}>Source URL- {data.url}</h5>
:<></>
        }
                {
          data.pdf ?
          <h4 className='fw-bolder col-12 d-flex justify-content-start container text-start pt-3 mb-2' style={{ color: '#FFFFFF' }}>Source PDF</h4> 
          :<></>
        }
        {
          data.pdf ?
          // <>
          // <h5 className='fw-bolder col-12 d-flex justify-content-start container text-start pt-3 mb-2' style={{ color: '#FFFFFF' }}>Source PDF</h5>
         data.pdf.map(x =>(
          <h5 className='fw-bolder col-12 d-flex justify-content-start container text-start pt-3 mb-2' style={{ color: '#FFFFFF' }}>{x}</h5>
))
// </>       
          :<></>
        }



      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Chatbot data</h3>

          <Card.Body className="d-flex flex-column" style={{}}>
            <div className='row'>
              <input className='fs-4 col-sm-8 col-lg-10 d-flex justify-content-center rounded-4  mt-4 text-center mb-3 ' type="text"
                placeholder="Search..."
                value={searchTermBot}
                onChange={handleSearchBot} />
              <Dropdown ref={refBot} drop='down-centered' className='col-sm-4 col-lg-2 mt-4 text-start mb-3 ' show={isOpenBot} onClick={toggleDropdownBot}>
                <button className='btn btn-outline-warning fw-bolder mx-3 mt-2 ' style={{}} id="dropdown-basic">
                  Sort
                </button>

                <Dropdown.Menu >
                  {/* <Dropdown.Item href="#"><button className='btn  fw-bolder px-0 mt-2 ' onClick={() => sortDataBot('asc')}>Sort Ascending</button></Dropdown.Item> */}
                  {/* <Dropdown.Item href="#"><button className='btn  fw-bolder px-0  mt-2 ' onClick={() => sortDataBot('desc')}>Sort Descending</button></Dropdown.Item> */}
                  {/* <Dropdown.Item href="#"> <button className='btn  fw-bolder px-0 mt-2 ' onClick={() => sortDataBot('')}>Clear</button></Dropdown.Item> */}

                  <Dropdown.Item href="#">
                    <button className='btn fw-bolder px-0 mt-2' onClick={() => sortDataBot('asc', 'uniCon')}>
                      Asc Conversation
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <button className='btn fw-bolder px-0 mt-2' onClick={() => sortDataBot('desc', 'uniCon')}>
                      Desc Conversation
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <button className='btn fw-bolder px-0 mt-2' onClick={() => sortDataBot('asc', 'tokenUsage')}>
                      Asc Token Usage
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <button className='btn fw-bolder px-0 mt-2' onClick={() => sortDataBot('desc', 'tokenUsage')}>
                      Desc Token Usage
                    </button>
                  </Dropdown.Item>
                  {/* <Dropdown.Item href="#">
  <button className='btn fw-bolder px-0 mt-2' onClick={() => sortDataBot('')}>
    Clear Sorting
  </button>
</Dropdown.Item> */}

                </Dropdown.Menu>
              </Dropdown>
            </div>
            {
              filteredDataBot.length === 0 ?
                <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Data Available</p>
                :
                itemsToDisplayDataBot.map(x => (
                  <div className='row col-12 mt-3' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                    <div className='col-lg-4 col-sm-7'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.date}</p>
                    </div>
                    <div className='col-lg-3 col-sm-5'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Tokens Used : {abbrNum(x.usage,2)}</p>
                    </div>
                    <div className='col-lg-3 col-sm-7'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Conversations : {abbrNum(x.ConNo,2)}</p>
                    </div>
                    <div className='col-lg-2 col-sm-5'>
                      {/* <p className=' col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</p> */}
                      {/* <Link to={`/superadminBot/${x.id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link> */}

                    </div>
                  </div>
                ))}

            <div className=' d-flex justify-content-center mt-3 fs-4'>
              <div
                onClick={() => handlePageChangeBot(currentPageBot - 1)}
                className={` ${currentPageBot === 1 ? 'disabled' : ''}`}
              >
                <BsFillArrowLeftCircleFill style={{ color: 'white' }} />
              </div>
              <p className='d-flex  justify-content-center  text-center mb-1 mt-1 mx-4' style={{ color: '#FFFFFF' }}>
                Page {currentPageBot}
              </p>
              <div
                onClick={() => handlePageChangeBot(currentPageBot + 1)}
                className={` ${endIndexBot >= filteredDataBot.length ? 'disabled' : ''}`}
              >
                <BsFillArrowRightCircleFill style={{ color: 'white' }} />
              </div>
            </div>

          </Card.Body>
        </Card>
      </div>


      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Tokens used</h3>

      <div className='fs-4 d-flex justify-content-center  text-center mt-1 mb-5'>
        <div className="input-group mb-3 mx-2 " style={{ width: '400px' }}>
          <input type="text" value={inputDateToken} onChange={handleDateChangeToken} className="form-control col-lg-6" placeholder="YYYY-MM-DD, YYYY-MM, or YYYY" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmitToken}>Generate Graph</button>
        </div>
      </div>

      <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
        {filteredDataTokenG.length === 0 ? '' :
          <ResponsiveContainer width="99%" minHeight={minHeight} >
            <LineChart width={1000} height={500} data={filteredDataTokenG} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <Line type="monotone" dataKey="usage" stroke="#8884d8" />
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

      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Unique Conversations</h3>

      <div className='fs-4 d-flex justify-content-center  text-center mt-1 mb-5'>
        <div className="input-group mb-3 mx-2 " style={{ width: '400px' }}>
          <input type="text" value={inputDateCon} onChange={handleDateChangeCon} className="form-control col-lg-6" placeholder="YYYY-MM-DD, YYYY-MM, or YYYY" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmitCon}>Generate Graph</button>
        </div>
      </div>

      <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
        {filteredDataConG.length === 0 ? '' :
          <ResponsiveContainer width="99%" minHeight={minHeight}>
            <LineChart width={1000} height={500} data={filteredDataConG} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
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
                  {x.time}
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

      <div  className='fs-4 col-12   text-center mb-0 mt-3 py-5' style={{ color: '#FFFFFF', backgroundColor:'#242439' }}>
      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Error Logs</h3>
      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
          <Card.Body className="d-flex flex-column" style={{}}>
            <div className='row' >
              <input className='fs-4 col-sm-12 col-lg-12 d-flex justify-content-center rounded-4  mt-4 text-center mb-3 ' type="text"
                placeholder="Search..."
                value={searchTermError}
                onChange={handleSearchError} />
            </div>
            {
              filteredDataError.length === 0 ?
                <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Errors</p>
                :
                itemsToDisplayDataErr.map(x => (
                  <div className='row col-12 mt-3' id='errorl'  style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                    <div className='col-lg-3 col-sm-6'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.time}</p>
                    </div>
                    <div className='col-lg-3 col-sm-6'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.err_id}</p>
                    </div>
                    <div className='col-lg-3 col-sm-6'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Bots used: {x.bot}</p>
                    </div>
                    <div className='col-lg-3 col-sm-6 container'>
                      {/* <Link to={`/superadminBot/${x.bot_id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link> */}
                      <a href="#" id={x.err_id} onClick={() => handleDetailsClick(x)} className=' text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</a>
                    </div>
                    {/* <div className='col-xl-1 col-sm-6 container'>
            <HashLink className='btn btn-link px-0 ' to={`/superadminBot/${x.bot_id}#${x.err_id}`} scroll={el => scrollWidthOffset(el)} style={{ textDecoration: 'underline', color: '#FFFFFF' }}   >Details</HashLink>
           </div> */}
                  </div>
                ))}

            <div className=' d-flex justify-content-center mt-3 fs-4'>
              <div
                onClick={() => handlePageChangeErr(currentPageErr - 1)}
                className={` ${currentPageErr === 1 ? 'disabled' : ''}`}
              >
                <BsFillArrowLeftCircleFill style={{ color: 'white' }} />
              </div>
              <p className='d-flex  justify-content-center  text-center mb-1 mt-1 mx-4' style={{ color: '#FFFFFF' }}>
                Page {currentPageErr}
              </p>
              <div
                onClick={() => handlePageChangeErr(currentPageErr + 1)}
                className={` ${endIndexErr >= filteredDataError.length ? 'disabled' : ''}`}
              >
                <BsFillArrowRightCircleFill style={{ color: 'white' }} />
              </div>
            </div>

          </Card.Body>
        </Card>
      </div>
      </div>


      {showDetails && (
        <div className="details-component py-1" style={{  backgroundColor:'#242439' }} ref={detailsRef}>

          <div className='row col-11 mx-auto my-5 pb-3 pt-5 rounded-4' style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#212529' }}>
            <div className='col-lg-6 col-12'>
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Name: {selectedItem.bot}</p>
            </div>
            <div className='col-lg-6 col-12'>
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Bot ID: {selectedItem.bot_id}</p>
            </div>
            <div className='col-lg-6 col-12'>
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Time: {selectedItem.time}</p>
            </div>
            <div className='col-lg-6 col-12'>
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Err ID: {selectedItem.err_id}</p>
            </div>
            {(() => {
              const jsxElements = [];
              for (let i = 0; i < selectedItem.err_msg.length; i++) {
                jsxElements.push(
                  <>
                    <div key={i} className='col-lg-12 col-sm-6 mt-4'>
                      <p className='col-12 d-flex justify-content-center text-center' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Error: {selectedItem.err_msg[i]}</p>
                    </div>
                    <div
                      key={i}
                      className={`message ${selectedItem.fail_msg[i * 2].sender === 'me' ? 'sent' : 'received'}`}
                      style={selectedItem.fail_msg[i * 2].sender === 'me' ? messageStyleSend : messageStyleRec}
                    >
                      <p style={{ color: 'white' }} className="message-content my-1 ">{selectedItem.fail_msg[i * 2].text}</p>
                    </div>
                    <div
                      key={i}
                      className={`message ${selectedItem.fail_msg[i * 2 + 1].sender === 'me' ? 'sent' : 'received'}`}
                      style={selectedItem.fail_msg[i * 2 + 1].sender === 'me' ? messageStyleSend : messageStyleRec}
                    >
                      <p style={{ color: 'white' }} className="message-content my-1 ">{selectedItem.fail_msg[i * 2 + 1].text}</p>
                    </div>
                  </>
                );
              }
              return jsxElements;
            })()}
            <div className='col-12'>
              <button className='btn btn-outline-warning' onClick={closeDetails}>Close Details</button>
            </div>
          </div>
        </div>
      )}


<div  className='fs-4 col-12   text-center mb-0  py-5' style={{ color: '#FFFFFF', backgroundColor:'#171725' }}>
      <h3  className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Issue Logs</h3>
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
              filteredDataIssue.length === 0 ?
                <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Issues</p>
                :
                itemsToDisplayDataIssue.map(x => (
                  <div className='row col-12 mt-3' id='issue' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                    <div className='col-lg-2 col-sm-6'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.bot}</p>
                    </div>
                    <div className='col-lg-4 col-sm-6'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.issue}</p>
                    </div>
                    <div className='col-lg-4 col-sm-6'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.time}</p>
                    </div>
                    <div className='col-lg-2 col-sm-6 container'>
                      {/* <Link to={`/superadminBot/${x.bot_id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link> */}
                      <a href={"#"} id={x.issue_id}  onClick={() => handleDetailsClickIssue(x)} className=' text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</a>

                    </div>
                  </div>
                ))}

            <div className=' d-flex justify-content-center mt-3 fs-4'>
              <div
                onClick={() => handlePageChangeIssue(currentPageIssue - 1)}
                className={` ${currentPageIssue === 1 ? 'disabled' : ''}`}
              >
                <BsFillArrowLeftCircleFill style={{ color: 'white' }} />
              </div>
              <p className='d-flex  justify-content-center  text-center mb-1 mt-1 mx-4' style={{ color: '#FFFFFF' }}>
                Page {currentPageIssue}
              </p>
              <div
                onClick={() => handlePageChangeIssue(currentPageIssue + 1)}
                className={` ${endIndexIssue >= filteredDataIssue.length ? 'disabled' : ''}`}
              >
                <BsFillArrowRightCircleFill style={{ color: 'white' }} />
              </div>
            </div>

          </Card.Body>
        </Card>
      </div>
      </div>


      {showDetailsIssue && (
        <div className="details-component" ref={detailsRefIssue}>

          <div id={selectedItemIssue.issue_id} className='row col-11 mx-auto my-5 pb-3 pt-5 rounded-4' style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#212529' }}>
            <div className='col-lg-4 col-12'>
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Bot: {selectedItemIssue.bot}</p>
            </div>
            <div className='col-lg-4 col-12'>
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Bot ID: {selectedItemIssue.bot_id}</p>
            </div>
            <div className='col-lg-4 col-12'>
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Username: {selectedItemIssue.username}</p>
            </div>
            <div className='col-lg-12 col-12 mt-4'>
              <p className='col-12 d-flex fs-5 justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Issue: {selectedItemIssue.issue}</p>
            </div>
            <div className='col-lg-12 col-12'>
              <p className='col-12 fs-5 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Details: {selectedItemIssue.detailIssue}</p>
            </div>

            <div className='col-12'>
              <button className='btn btn-outline-warning' onClick={closeDetailsIssue}>Close Details</button>
            </div>
          </div>
        </div>
      )}


<div className='fs-4 col-12 pb-5 d-flex justify-content-center text-center mb-5 mt-0' style={{ color: '#FFFFFF', backgroundColor:'#242439' }}>
      <div className='d-flex justify-content-center my-5 col-lg-8 col-11'>
            <form className='col-sm-9 mb-5 col-11 mx-auto ' style={{marginTop:'50px'}}>
            <div className="form-group d-flex justify-content-center flex-wrap mt-5 mb-5 fs-2 fw-bold ">
                <label className='text-center col-12' style={{color:'white'}} >Embed specific questions</label>
                <label className='text-center  fs-6' style={{color:'white'}} >(Works best with multiple line/ detailed answers)</label>

              </div>
              <div className="form-group">
                <label style={{color:'white'}} >Question</label>
                <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' onChange={(e)=>setQueE(e.target.value)} value={queE} placeholder='Question' />
              </div>
              <div className="form-group">
                <label style={{color:'white'}} >Answer</label>
                <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={ansE} onChange={(e)=>setAnsE(e.target.value)} placeholder='Answer' />
              </div>
              <div className='form-group d-flex mt-5 justify-content-center'>
                <button className='btn btn-outline-warning  mb-3 px-5  ' onClick={(e)=>handleEmbedQuestion(e)}>Embed Questions</button>
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
             </div> 

      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Bot Sources</h3>

      <div >
          {/* <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF', marginTop:'100px' }} >Add this Script to your website to get your chatbot</label> */}
          {/* <textarea id='textareascript' className='fs-4 d-flex justify-content-center container text-center  mb-3' readOnly style={{ height: '100px', width: '95%', }} placeholder='Script' value={`<script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js" defer id="popup" cred="${id.id}"></script>`} /> */}
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >URL used</label>
          <input className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{ width: '95%' }} readOnly placeholder='URL Used' value={data.url} />
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >PDF Used</label>
          <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center  mb-3' style={{ width: '95%', minHeight:'100px'}} readOnly placeholder='PDF Used' value={Array.isArray(data.pdf) ? data.pdf.map(String).join('\n') : ''} />
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >URLs scrapped</label>
          <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3 ' style={{ width: '95%' }} readOnly placeholder='URLs scrapped'  value={Array.isArray(data.urlsUsed) ? data.urlsUsed.join('\n') : ''} />
          <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}  >URLs Excluded</label>
          <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center  ' style={{ width: '95%', marginBottom:'50px' }} readOnly placeholder='URLs excluded'  value={Array.isArray(data.urlsEx) ? data.urlsEx.join('\n') : ''} />
          
          {data.embeddedQA && data.embeddedQA.length > 0 && (
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
                    {data.embeddedQA.map((item, index) => (
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
                <textarea id='textareasug' className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={suggestedQuery} placeholder='Suggested Prompts (seperate each with ",")' onChange={(e) => { setSPrompt(e.target.value.split(",")); }} />
              </div>
              <div className="form-group">
                <label>Prompt (Don't remove text and query from the prompt)</label>
                <textarea id="textareaprompt" className='fs-4 d-flex justify-content-center container text-center mt-1  mb-3' value={prompt} placeholder='Name of bot' onChange={(e) => { setPrompt(e.target.value); e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; console.log("scroll", e.target.scrollHeight) }} />
              </div>
              <div className='form-group'>
                <button className='btn btn-outline-warning mb-3 px-5 ' onClick={(e) => handleSubmitEditBot(e)}>Update Bot</button>
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
                  className="form-check-input me-4"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                  Scrap data from URLs found inside the above URL
                </label>
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
                  multiple
                  onChange={(e) => setPdfFile(e.target.files)}
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

          </div>
        </div>

        <div className='fs-4 col-12 pb-5  text-center mb-5 mt-3' style={{ color: '#FFFFFF', backgroundColor:'#242439' }}>

        <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Delete Bot</h3>
      <div className='form-group mt-3 d-flex justify-content-center'>
        <button className='btn btn-outline-danger px-5 ' onClick={(e) => handleDeleteToggle(e)}>Delete Bot</button>
      </div>
      {togDel ?
        <div className='form-group mt-3 d-flex justify-content-center'>
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
    </div>
  )
}

export default SectionOneBotSA