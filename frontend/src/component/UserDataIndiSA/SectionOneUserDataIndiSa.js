import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { Button, Dropdown } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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

const SectionOneUserDataIndiSa = (id) => {

  const decoded = Cookies.get('accessToken');
  const adminToken = Cookies.get('adminToken')

  const [dataSub, setDataSub] = useState([])
  const [dataPay, setDataPay] = useState([])
  const [dataBot, setDataBot] = useState([])
  const[dataUsername,setDataUsername]= useState('')

  const [apiload,setApiload] = useState(false)


  // const BACKEND = 'http://localhost:5000/'
  const BACKEND = 'https://zemaapi.zema.io/'

  useEffect(() => {
    setApiload(true)
    axios.post(`${BACKEND}api/admin/dataIndi/${id.id}`, { decoded, adminToken }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => {
        console.log(res.data,"all the data");
        setDataSub(res.data[0][0]); setDataPay(res.data[1]); setDataBot(res.data[2]);setDataUsername(res.data[3]);setApiload(false)
      })
      .catch(err => {console.log(err); setApiload(false)})
  }, [])

  const [tBot, setTBot] = useState('')
  useEffect(() => {
    setTBot(dataBot.length)
    setFilteredDataBot(dataBot)
    console.log(dataBot)
  }, [dataBot])

  const [tPay, setTPay] = useState('')
  useEffect(() => {
    setTPay(dataPay.length)
    console.log("===", dataPay)
  }, [dataPay])

  const [searchTermBot, setSearchTermBot] = useState([]);
  const [filteredDataBot, setFilteredDataBot] = useState([])
  const [filteredDataBotSum, setFilteredDataBotSum] = useState([])
  const [sortOrderBot, setSortOrderBot] = useState('asc');
  const [isOpenBot, setIsOpenBot] = useState(false);
  const refBot = useRef()

  const toggleDropdownBot = () => {
    setIsOpenBot(!isOpenBot);
  };

  const handleSearchBot = (e) => {
    const input = e.target.value;
    setSearchTermBot(input);

    const filtered = dataBot.filter((item) => {
      const regex = new RegExp(input, 'i');
      for (const key in item) {
        if (item.hasOwnProperty(key) && regex.test(item[key])) {
          return true;
        }
      }
      return false;
    });
    setFilteredDataBot(filtered);
    console.log("filtered", filteredDataBot)
  };

  const sortDataBot = (order, sortBy) => {
    const sorted = [...filteredDataBot].sort((a, b) => {
      let valueA, valueB;

      if (sortBy === 'uniCon') {

        valueA = a.uniCon.reduce((sum, x) => sum + x.ConNo, 0);
        valueB = b.uniCon.reduce((sum, x) => sum + x.ConNo, 0);
      } else if (sortBy === 'tokenUsage') {
        valueA = a.tokenData.reduce((sum, x) => sum + x.usage, 0);
        valueB = b.tokenData.reduce((sum, x) => sum + x.usage, 0);
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


  const [botToken, setBotToken] = useState('')
  const [tTokens, setTTokens] = useState('')
  const [tCon, setTCon] = useState('')

  useEffect(() => {
    // setFilteredDataBot(dataBot)


    if (filteredDataBot.length > 0) {
      const newDataArray = filteredDataBot.map(item => {
        const tokensUsedSum = item.tokenData.reduce((tokensAccumulator, token) => {
          return tokensAccumulator + token.usage;
        }, 0);

        const uniqueConversationsSum = item.uniCon.reduce((conversationsAccumulator, conversation) => {
          return conversationsAccumulator + conversation.ConNo;
        }, 0);

        return {
          bot: item.bot,
          sourcePdf: item.sourcePdf,
          sourceUrl: item.sourceUrl,
          tokenData: item.tokenData,
          uniCon: item.uniCon,
          username: item.username,
          totalTokensUsed: tokensUsedSum,
          totalUniqueConversations: uniqueConversationsSum,
          id:item.id,
        };
      });

      console.log(newDataArray, "=================9999999");
      setFilteredDataBotSum(newDataArray);
    }

  }, [filteredDataBot])

  useEffect(() => {
    console.log("filt  ", filteredDataBotSum)

    const totalCon = filteredDataBotSum.reduce((conversationsAccumulator, conversation) => {
      return conversationsAccumulator + conversation.totalUniqueConversations;
    }, 0);
    const totalTok = filteredDataBotSum.reduce((tokAccumulator, tok) => {
      return tokAccumulator + tok.totalTokensUsed;
    }, 0);

    setTTokens(totalTok)
    setTCon(totalCon)

  }, [filteredDataBotSum])


  const [totalUniConPerDate, setTotalUniConPerDate] = useState([]);
  const [totalTokenUsagePerDate, setTotalTokenUsagePerDate] = useState([]);

  useEffect(() => {

    const uniConMap = {};
    const tokenUsageMap = {};

    console.log("----185--", filteredDataBot)

    filteredDataBot.forEach((item) => {
      item.uniCon.forEach((x) => {
        const { date, ConNo } = x;
        uniConMap[date] = (uniConMap[date] || 0) + ConNo;
      });
    })

    filteredDataBot.forEach((item) => {
      item.tokenData.forEach((x) => {
        const { date, usage } = x;
        tokenUsageMap[date] = (tokenUsageMap[date] || 0) + usage;
      })

    });

   
    const uniConArray = Object.entries(uniConMap).map(([date, total]) => ({
      date,
      totalUniCon: total,
    }));

    const tokenUsageArray = Object.entries(tokenUsageMap).map(([date, total]) => ({
      date,
      totalTokenUsage: total,
    }));

    
    setTotalUniConPerDate(uniConArray);
    setTotalTokenUsagePerDate(tokenUsageArray);
    console.log(totalUniConPerDate, " 555555")
    console.log(totalTokenUsagePerDate)
  }, [filteredDataBot]);

  const [inputDateCon, setInputDateCon] = useState('');
  const [filteredDataConG, setFilteredDataConG] = useState([]);

  const handleDateChangeCon = (e) => {
    setInputDateCon(e.target.value);
  };

  const handleSubmitCon = (e) => {
    e.preventDefault();
    // console.log("con ",totalUniConPerDate)
    const filtered = totalUniConPerDate.filter((item) => {
      const itemDate = item.date;
      return itemDate.startsWith(inputDateCon);
    });
    setFilteredDataConG(filtered);
    console.log("filtered  ", filtered)
  };


  const [inputDateToken, setInputDateToken] = useState('');
  const [filteredDataTokenG, setFilteredDataTokenG] = useState([]);

  const handleDateChangeToken = (e) => {
    setInputDateToken(e.target.value);
  };

  const handleSubmitToken = (e) => {
    e.preventDefault();
    const filtered = totalTokenUsagePerDate.filter((item) => {
      const itemDate = item.date;
      return itemDate.startsWith(inputDateToken);
    });
    setFilteredDataTokenG(filtered);
    console.log("chk  ", filtered)
  };

  // /////////////////////////////////////////////////////////////////////////////////////// Payment history

 const[handleSearchTermPay,setHandleSearchTermPay]=useState([])
 const [searchTermPay, setSearchTermPay] = useState([]);
 const [filteredDataPay, setFilteredDataPay] = useState([])
 const [filteredDataPaySum,setFilteredDataPaySum]=useState('')

 useEffect(()=>{
   setFilteredDataPay(dataPay)
  //  setFilteredDataPayG(dataPay)
 },[dataPay])

 useEffect(()=>{

  const totalPay = filteredDataPay.reduce((pa, p) => {
    return pa + p.amount;
  }, 0);
  setFilteredDataPaySum(totalPay/100)
   
 },[filteredDataPay])

  const handleSearchPay = (e) => {
    const input = e.target.value;
    setSearchTermPay(input);

    const filtered = dataPay.filter((item) => {
      const regex = new RegExp(input, 'i');
      for (const key in item) {
        if (item.hasOwnProperty(key) && regex.test(item[key])) {
          return true;
        }
      }
      return false;
    });
    setFilteredDataPay(filtered);
    console.log("filtered pay yes ", filteredDataPay)
  };

  const [isOpenPay, setIsOpenPay] = useState(false);
  const refPay = useRef()

  const toggleDropdownPay = () => {
    setIsOpenPay(!isOpenPay);
  };


  const [inputDatePay, setInputDatePay] = useState('');
  const [filteredDataPayG, setFilteredDataPayG] = useState([]);

  const handleDateChangePay = (e) => {
    setInputDatePay(e.target.value);
  };

  const handleSubmitPay = (e) => {
    e.preventDefault();
    // console.log("con ",totalUniConPerDate)
    const filtered = filteredDataPay.filter((item) => {
      const itemDate = item.created;
      return itemDate.startsWith(inputDatePay);
    });
    const filtered100 = filtered.map((item) => ({
      ...item,
      amount: item.amount / 100,
    }));
    setFilteredDataPayG(filtered100);
    console.log("filtered  ", filtered100)
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


  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrollToElement, setScrollToElement] = useState(null);
  const detailsRef = useRef(null);

  const handleDetailsClick = (item, index) => {
    setSelectedItem(item);
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
    console.log("Delete",dataUsername)
    await axios.post(`${BACKEND}api/admin/deleteUser`, { decoded, adminToken,dataUsername }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }).then((res) => {console.log(res.data,"========9999") ;if (res.data === 'Del') { toast.success('User Deleted'); setLoadingdel(false); } else if (res.data === 'UA') { toast.success('User is an Admin'); setLoadingdel(false); }else{ toast.error('Some Error occured');console.log(res.data); setLoadingdel(false)} })
    .then(setTimeout(() => { navigate(`/superadminUserData`) }, 5000))  
    .catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoadingdel(false); })
    //  await navigate('/mychatbots');
  }

  const itemsPerPage = 10;
  const [currentPageSum, setCurrentPageSum] = useState(1);
  
  useEffect(() => {
    setCurrentPageSum(1)
  }, [filteredDataBotSum]);
  
  const startIndexSum = (currentPageSum - 1) * itemsPerPage;
  const endIndexSum = startIndexSum + itemsPerPage;
  
  const itemsToDisplayDataSum = filteredDataBotSum.slice(startIndexSum, endIndexSum);
  
  const handlePageChangeSum = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredDataBotSum.length / itemsPerPage)) {
      setCurrentPageSum(page);
    }
  };

  const [currentPagePay, setCurrentPagePay] = useState(1);

useEffect(() => {
  setCurrentPagePay(1)
}, [filteredDataPay]);

const startIndexPay = (currentPagePay - 1) * itemsPerPage;
const endIndexPay = startIndexPay + itemsPerPage;

const itemsToDisplayDataPay = filteredDataPay.slice(startIndexPay, endIndexPay);

const handlePageChangePay = (page) => {
  if (page >= 1 && page <= Math.ceil(filteredDataPay.length / itemsPerPage)) {
    setCurrentPagePay(page);
  }
};

const [name, setName] = useState('')
const [phone, setPhone] = useState('')
const [loading, setLoading] = useState(false);

const handleProfile = (e) => {
  e.preventDefault()
  setLoading(true)
  axios.put(`${BACKEND}api/profiledata`, { name, phone, decoded }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
  }).then(res => { if (res.data === 'Update Successful') { toast.success(res.data); console.log("AAA", res.data); setLoading(false) } else { toast.error("Updation Failed"); console.log("AAA", res.data); setLoading(false) } }).catch(err => { toast.error(err); setLoading(false) })
}


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

  return (
    <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>
      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>User Data</h3>
      <div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>
      <h5 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-3 mb-4' style={{ color: '#FFFFFF' }}>{dataUsername}</h5>
     
      <div className='row col-11 d-flex  mx-auto'>
        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Plan</Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>  {dataSub.plan}</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Bots</Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{abbrNum(tBot,2)}</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Tokens </Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{abbrNum(tTokens,2)}</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}>Conversations </Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{abbrNum(tCon,2)}</Card.Title>

            </Card.Body>
          </Card>
        </div>
      </div>


      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
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
              filteredDataBotSum.length === 0?
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Data Available</p>
              :
              itemsToDisplayDataSum.map(x => (
                <div className='row col-12 mt-3' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                  <div className='col-lg-4 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.bot}</p>
                  </div>
                  <div className='col-lg-3 col-sm-5'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Tokens Used : {abbrNum(x.totalTokensUsed,2)}</p>
                  </div>
                  <div className='col-lg-3 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Conversations : {abbrNum(x.totalUniqueConversations,2)}</p>
                  </div>
                  <div className='col-lg-2 col-sm-5'>
                    {/* <p className=' col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</p> */}
                    <Link to={`/superadminBot/${x.id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link>

                  </div>
                </div>
              ))}
              <div className=' d-flex justify-content-center mt-3 fs-4'>
              <div
                onClick={() => handlePageChangeSum(currentPageSum - 1)}
                className={` ${currentPageSum === 1 ? 'disabled' : ''}`}
              >
                <BsFillArrowLeftCircleFill style={{ color: 'white' }} />
              </div>
              <p className='d-flex  justify-content-center  text-center mb-1 mt-1 mx-4' style={{ color: '#FFFFFF' }}>
                Page {currentPageSum}
              </p>
              <div
                onClick={() => handlePageChangeSum(currentPageSum + 1)}
                className={` ${endIndexSum >= filteredDataBotSum.length ? 'disabled' : ''}`}
              >
                <BsFillArrowRightCircleFill style={{ color: 'white' }} />
              </div>
            </div>
          </Card.Body>
        </Card>
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
              <Line type="monotone" dataKey="totalUniCon" stroke="#8884d8" />
              <XAxis dataKey="date"
                minTickGap={10}
                style={{fontSize:'14px'}}
              />
              <YAxis style={{fontSize:'14px'}} allowDataOverflow={true} />
              <Tooltip content={<CustomTooltip2 />} />
            </LineChart>
          </ResponsiveContainer>
        }
      </div>


      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Tokens Used</h3>

      <div className='fs-4 d-flex justify-content-center  text-center mt-1 mb-5'>
        <div className="input-group mb-3 mx-2 " style={{ width: '400px' }}>
          <input type="text" value={inputDateToken} onChange={handleDateChangeToken} className="form-control col-lg-6" placeholder="YYYY-MM-DD, YYYY-MM, or YYYY" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmitToken}>Generate Graph</button>
        </div>
      </div>

      <div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
        {filteredDataTokenG.length === 0 ? '' :
          <ResponsiveContainer width="99%" minHeight={minHeight}>
            <LineChart width={1000} height={500} data={filteredDataTokenG} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <Line type="monotone" dataKey="totalTokenUsage" stroke="#8884d8" />
              <XAxis dataKey="date"
                minTickGap={10}
                style={{fontSize:'14px'}}
              />
              <YAxis style={{fontSize:'14px'}} allowDataOverflow={true} />
              <Tooltip content={<CustomTooltip2 />} />
            </LineChart>
          </ResponsiveContainer>
        }
      </div>





      <div className='row col-11 d-flex  mx-auto'>

      <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Plan</Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>  {dataSub.plan}</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Payments</Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>  {abbrNum(tPay,2)}</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Total Payment </Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{abbrNum(filteredDataPaySum,2)} USD</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}>Conversations </Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{abbrNum(tCon,2)}</Card.Title>

            </Card.Body>
          </Card>
        </div>
      </div>


      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
          <Card.Body className="d-flex flex-column" style={{}}>
            <div className='row'>
              <input className='fs-4 col-sm-12 col-lg-12 d-flex justify-content-center rounded-4  mt-4 text-center mb-3 ' type="text"
                placeholder="Search..."
                value={searchTermPay}
                onChange={handleSearchPay} />
              {/* <Dropdown ref={refPay} drop='down-centered' className='col-sm-4 col-lg-2 mt-4 text-start mb-3 ' show={isOpenPay} onClick={toggleDropdownPay}>
                <button className='btn btn-outline-warning fw-bolder mx-3 mt-2 ' style={{}} id="dropdown-basic">
                  Sort
                </button>

                <Dropdown.Menu >
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
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
            {
              filteredDataPay.length === 0?
              <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Data Available</p>
              :
              itemsToDisplayDataPay.map(x => (
                <div className='row col-12 mt-3'  style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                  <div className='col-lg-4 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.created}</p>
                  </div>
                  <div className='col-lg-3 col-sm-5'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.product_id}</p>
                  </div>
                  <div className='col-lg-3 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.amount/100} {x.payment.currency}</p>
                  </div>
                  <div className='col-lg-2 col-sm-5'>
                    {/* <p className=' col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</p> */}
                    {/* <Link to={``} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link> */}
                    <a href="#" onClick={() => handleDetailsClick(x)} className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</a>
                  </div>
                </div>
              ))}
                 <div className=' d-flex justify-content-center mt-3 fs-4'>
              <div
                onClick={() => handlePageChangePay(currentPagePay - 1)}
                className={` ${currentPagePay === 1 ? 'disabled' : ''}`}
              >
                <BsFillArrowLeftCircleFill style={{ color: 'white' }} />
              </div>
              <p className='d-flex  justify-content-center  text-center mb-1 mt-1 mx-4' style={{ color: '#FFFFFF' }}>
                Page {currentPagePay}
              </p>
              <div
                onClick={() => handlePageChangePay(currentPagePay + 1)}
                className={` ${endIndexPay >= filteredDataPay.length ? 'disabled' : ''}`}
              >
                <BsFillArrowRightCircleFill style={{ color: 'white' }} />
              </div>
            </div>
          </Card.Body>
        </Card>

        {showDetails && (
        <div  className="details-component" ref={detailsRef}>
         
          <div className='row col-12 my-5 pb-3 pt-5 rounded-4' style={{  display: 'flex', flexWrap: 'wrap' , backgroundColor:'#212529'}}>
                  <div className='col-lg-4 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Created: {selectedItem.created}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Product ID: {selectedItem.product_id}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Amount: {selectedItem.amount/100} {selectedItem.payment.currency}</p>
                  </div>
                  <div className='col-lg-4 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Zema A/C: {selectedItem.username}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Email for payment: {selectedItem.payment.email}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>ID: {selectedItem.payment.id}</p>
                  </div>
                  <div className='col-lg-4 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Created: {selectedItem.payment.created}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Invoice Prefix: {selectedItem.payment.invoice_prefix}</p>
                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Name: {selectedItem.payment.name}</p>
                  </div>
                  <div className='col-lg-2 col-sm-6'>
                  <button className='btn btn-outline-warning' onClick={closeDetails}>Close Details</button>
                  </div>
                </div>
          {/* Add more details here */}
        </div>
      )}

        <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Payments</h3>

<div className='fs-4 d-flex justify-content-center  text-center mt-1 mb-5'>
  <div className="input-group mb-3 mx-2 " style={{ width: '400px' }}>
    <input type="text" value={inputDatePay} onChange={handleDateChangePay} className="form-control col-lg-6" placeholder="YYYY-MM-DD, YYYY-MM, or YYYY" aria-label="Recipient's username" aria-describedby="button-addon2" />
    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmitPay}>Generate Graph</button>
  </div>
</div>

<div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
  {filteredDataPayG.length === 0 ? '' :
    <ResponsiveContainer width="99%" minHeight={minHeight}>
      <LineChart width={1000} height={500} data={filteredDataPayG} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        <XAxis dataKey="created"
          minTickGap={10}
          style={{fontSize:'14px'}}
        />
        <YAxis style={{fontSize:'14px'}} allowDataOverflow={true} />
        <Tooltip content={<CustomTooltip2 />} />
      </LineChart>
    </ResponsiveContainer>
  }
</div>
      </div>


      <Card style={{ backgroundColor: '#171725', height: '100%' }} className='mx-auto mt-3 rounded-4  col-11'>
      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Edit User Profile</h3>
                    <Card.Body className=' d-flex row justify-content-between'>
                        <label className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-1 ' style={{ color: 'white' }}>Enter/Edit Profile Name</label>
                        <input className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-3 ' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                        <label className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-1' style={{ color: 'white' }}>Enter/Edit Profile Phone Number</label>
                        <input className='fs-5 d-flex justify-content-center container col-10 mt-1 text-center mb-3' value={phone.replace(/[^0-9+]/g, '')} placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} />
                        <button onClick={(e) => handleProfile(e)} className=' btn btn-outline-warning col-sm-4 col-8 d-flex justify-content-center container text-center py-2 mb-1' style={{}} >Update</button>
                        <div className='form-group d-flex justify-content-center'>
                            {loading ? (
                                <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
                            ) : (
                                ''
                            )}
                        </div>
                    </Card.Body>
                </Card>



      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Delete User - {dataUsername}</h3>
<div className='form-group mt-3 d-flex justify-content-center'>
              <button className='btn btn-outline-danger px-5 ' onClick={(e) => handleDeleteToggle(e)}>Delete User</button>
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
  )
}

export default SectionOneUserDataIndiSa