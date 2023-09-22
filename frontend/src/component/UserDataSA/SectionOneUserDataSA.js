import React, { useState, useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
// import '../../css/chartCss.css'

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


const SectionOneUserDataSA = () => {





  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const[data3,setData3]=useState([])
  const [tUser, setTUser] = useState('')
  const [tBots, setTBots] = useState('')
  const [tTokens, setTTokens] = useState('')
  const [tCon, setTCon] = useState('')
  const [tArr, setTArr] = useState([])

  const decoded = Cookies.get('accessToken');
  const adminToken = Cookies.get('adminToken')

  const BACKEND = 'http://localhost:5000/'
  // const BACKEND = 'https://api.zema.io/'
  // const BACKEND = 'http://3.138.169.250/'

  useEffect(() => {
    axios.post(`${BACKEND}api/admin/data`, { decoded, adminToken }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => { console.log(res.data," all data"); setData(res.data[0]); setData2(res.data[1]);setData3(res.data[2]); console.log("llll", res.data[0].length) })
      .catch(err => console.log(err))
  }, [])


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    const filtered = data.filter((item) => {
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

  const sortData = (order) => {
    const sorted = [...filteredData].sort((a, b) => {
      if (order === 'asc') {
        return a.bots - b.bots;
      } else {
        return b.bots - a.bots;
      }
    });
    setFilteredData(sorted);
    setSortOrder(order);
  };

  useEffect(() => {
    setFilteredData(data)
    setTUser(data.length)
    setTBots(data.reduce((accumulator, item) => accumulator + item.bots, 0))
  }, [data])

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ref = useRef()
  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpen])



  useEffect(() => {
    if (data2.length > 0) {
      const totalTokens = data2.reduce((accumulator, item) => {
        const tokensUsedSum = item.tokensUsed.reduce((tokensAccumulator, token) => {
          return tokensAccumulator + token.usage;
        }, 0);
        return accumulator + tokensUsedSum;
      }, 0);
      setTTokens(totalTokens);

      const totalConversations = data2.reduce((accumulator, item) => {
        const uniqueConversationsSum = item.UniqueCon.reduce((conversationsAccumulator, conversation) => {
          return conversationsAccumulator + conversation.ConNo;
        }, 0);
        return accumulator + uniqueConversationsSum;
      }, 0);
      setTCon(totalConversations);
    }
  }, [data2]);



  const [dateTokensArray, setDateTokensArray] = useState([]);

  useEffect(() => {
    const dateTokenMap = {};

    data2.forEach((item) => {
      item.tokensUsed.forEach((token) => {
        const date = token.date;
        const usage = token.usage;

        if (dateTokenMap[date]) {
          dateTokenMap[date] += usage;
        } else {
          dateTokenMap[date] = usage;
        }
      });
    });

    const resultArray = Object.keys(dateTokenMap).map((date) => ({
      date,
      totalTokens: dateTokenMap[date],
    }));


    setDateTokensArray(resultArray);
    console.log("----", resultArray)
  }, [data2]);

  const [conArray, setConArray] = useState([]);

  useEffect(() => {

    const conMap = {};

    data2.forEach((item) => {
      item.UniqueCon.forEach((token) => {
        const date = token.date;
        const usage = token.ConNo;

        if (conMap[date]) {
          conMap[date] += usage;
        } else {
          conMap[date] = usage;
        }
      });
    });

 
    const resultArray = Object.keys(conMap).map((date) => ({
      date,
      totalCon: conMap[date],
    }));

 
    setConArray(resultArray);
    console.log("----", resultArray)
  }, [data2]);


  const [inputDateCon, setInputDateCon] = useState('');
  const [filteredDataCon, setFilteredDataCon] = useState([]);

  const handleDateChangeCon = (e) => {
    setInputDateCon(e.target.value);
  };

  const handleSubmitCon = (e) => {
    e.preventDefault();
    console.log("con ",conArray)
    const filtered = conArray.filter((item) => {
      const itemDate = item.date;
      return itemDate.startsWith(inputDateCon);
    });
    setFilteredDataCon(filtered);
  };

  const [inputDateToken, setInputDateToken] = useState('');
  const [filteredDataToken, setFilteredDataToken] = useState([]);

  const handleDateChangeToken = (e) => {
    setInputDateToken(e.target.value);
  };

  const handleSubmitToken = (e) => {
    e.preventDefault();
    const filtered = dateTokensArray.filter((item) => {
      const itemDate = item.date;
      console.log("input date token ",inputDateToken)
      return itemDate.startsWith(inputDateToken);
    });
    setFilteredDataToken(filtered);
  };


// ///////////////////////////////  Payments  //////////////////////

const[tPay,setTPay]=useState('')
const [inputDatePay, setInputDatePay] = useState('');
const [filteredDataPay, setFilteredDataPay] = useState([]);
const [searchTermPay, setSearchTermPay] = useState([]);
const [filteredDataPaySum,setFilteredDataPaySum]=useState('')
const [filteredDataPayG, setFilteredDataPayG] = useState([]);

useEffect(()=>{
   setTPay(data3.length)
   setFilteredDataPay(data3)
},[data3])


const handleSearchPay = (e) => {
  const input = e.target.value;
  setSearchTermPay(input);

  const filtered = data3.filter((item) => {
    const regex = new RegExp(input, 'i');
    for (const key in item) {
      if (item.hasOwnProperty(key) && regex.test(item[key])) {
        return true;
      }
    }
    return false;
  });
  setFilteredDataPay(filtered);
  console.log("filtered pay", filteredDataPay)
};

useEffect(()=>{

  const totalPay = filteredDataPay.reduce((pa, p) => {
    return pa + p.amount;
  }, 0);
  setFilteredDataPaySum(totalPay/100)
   
 },[filteredDataPay])

const [isOpenPay, setIsOpenPay] = useState(false);
const refPay = useRef()

const toggleDropdownPay = () => {
  setIsOpenPay(!isOpenPay);
};


const handleDateChangePay = (e) => {
  setInputDatePay(e.target.value);
};

const handleSubmitPay = (e) => {
  e.preventDefault();

  const newArray = [];
  const monthMap = {};
  
  data3.forEach((item) => {
    const { date, amount } = item;
    const month = date.substring(0, 10); 
    console.log("month  ",month)
  
    if (monthMap[month] === undefined) {
      monthMap[month] = amount;
    } else {
      monthMap[month] += amount;
    }
  });
  
  for (const month in monthMap) {
    newArray.push({ month, amount: monthMap[month] });
  }
  
  console.log(newArray,'+66666');

  const filtered = newArray.filter((item) => {
    const itemDate = item.month;
    console.log("input date pay ",item)
    return itemDate.startsWith(inputDatePay);
  });
  const filtered100 = filtered.map((item) => ({
    ...item,
    amount: item.amount / 100,
  }));
  setFilteredDataPayG(filtered100);
  console.log("filter 100 ",filtered100)
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


const itemsPerPage = 10;
const [currentPageUser, setCurrentPageUser] = useState(1);

useEffect(() => {
  setCurrentPageUser(1)
}, [filteredData]);

const startIndexUser = (currentPageUser - 1) * itemsPerPage;
const endIndexUser = startIndexUser + itemsPerPage;

const itemsToDisplayDataUser = filteredData.slice(startIndexUser, endIndexUser);

const handlePageChangeUser = (page) => {
  if (page >= 1 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
    setCurrentPageUser(page);
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


  return (
    <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>
      <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>User Data</h1>

      <div className='row col-11 d-flex  mx-auto'>
        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Users</Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>  {tUser}</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Bots</Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{tBots}</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Tokens </Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{tTokens}</Card.Title>

            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
          <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
            <Card.Body className="d-flex flex-column" style={{}}>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}>Conversations </Card.Title>
              <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{tCon}</Card.Title>

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
                value={searchTerm}
                onChange={handleSearch} />
              <Dropdown ref={ref} drop='down-centered' className='col-sm-4 col-lg-2 mt-4 text-start mb-3 ' show={isOpen} onClick={toggleDropdown}>
                <button className='btn btn-outline-warning fw-bolder mx-3 mt-2 ' style={{}} id="dropdown-basic">
                  Sort
                </button>

                <Dropdown.Menu >
                  <Dropdown.Item href="#"><button className='btn  fw-bolder px-0 mt-2 ' onClick={() => sortData('asc')}>Sort Ascending</button></Dropdown.Item>
                  <Dropdown.Item href="#"><button className='btn  fw-bolder px-0  mt-2 ' onClick={() => sortData('desc')}>Sort Descending</button></Dropdown.Item>
                  {/* <Dropdown.Item href="#"> <button className='btn  fw-bolder px-0 mt-2 ' onClick={() => sortData('')}>Clear</button></Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {
                 filteredData.length === 0?
                 <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Data Available</p>
                 :
                 itemsToDisplayDataUser.map(x => (
                <div className='row col-12 mt-3' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                  <div className='col-lg-4 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.username}</p>
                  </div>
                  <div className='col-lg-3 col-sm-5'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.plan}</p>
                  </div>
                  <div className='col-lg-3 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Bots used: {x.bots}</p>
                  </div>
                  <div className='col-lg-2 col-sm-5'>
                    {/* <p className=' col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</p> */}
                  <Link to={`/superadminUserDataIndi/${x.id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link>
 
                  </div>
                </div>
              ))}

<div className=' d-flex justify-content-center mt-3 fs-4'>
              <div
                onClick={() => handlePageChangeUser(currentPageUser - 1)}
                className={` ${currentPageUser === 1 ? 'disabled' : ''}`}
              >
                <BsFillArrowLeftCircleFill style={{ color: 'white' }} />
              </div>
              <p className='d-flex  justify-content-center  text-center mb-1 mt-1 mx-4' style={{ color: '#FFFFFF' }}>
                Page {currentPageUser}
              </p>
              <div
                onClick={() => handlePageChangeUser(currentPageUser + 1)}
                className={` ${endIndexUser >= filteredData.length ? 'disabled' : ''}`}
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
        {filteredDataCon.length === 0 ? '' :
          <ResponsiveContainer width="99%" minHeight={minHeight}>
            <LineChart width={1000} height={500} data={filteredDataCon} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <Line type="monotone" dataKey="totalCon" stroke="#8884d8" />
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
        {filteredDataToken.length === 0 ? '' :
          <ResponsiveContainer width="99%" minHeight={minHeight}>
            <LineChart width={1000} height={500} data={filteredDataToken} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <Line type="monotone" dataKey="totalTokens" stroke="#8884d8" />
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
        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Tokens Used</Card.Title>
        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}> {tTokens} </Card.Title>

      </Card.Body>
    </Card>
  </div>

  <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
    <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
      <Card.Body className="d-flex flex-column" style={{}}>
        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Payments</Card.Title>
        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}> {tPay} </Card.Title>

      </Card.Body>
    </Card>
  </div>

  <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
    <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
      <Card.Body className="d-flex flex-column" style={{}}>
        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}> Total Payment </Card.Title>
        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{filteredDataPaySum} USD</Card.Title>

      </Card.Body>
    </Card>
  </div>

  <div className='col-lg-3 col-sm-6 col-11 my-3 d-flex mx-auto justify-content-center'>
    <Card style={{ backgroundColor: '#212529', width: '270px' }} className='mx-xxl-2 mx-2  d-flex rounded-4'>
      <Card.Body className="d-flex flex-column" style={{}}>
        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-5 text-break' style={{ color: '#FFFFFF' }}>Conversations </Card.Title>
        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>{tCon}</Card.Title>

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
                <div className='row col-12 mt-3' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                  <div className='col-lg-2 col-sm-5'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.date}</p>
                  </div>
                  <div className='col-lg-3 col-sm-7'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.plan}</p>
                  </div>
                  <div className='col-lg-3 col-sm-5'>
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.amount/100} USD</p>
                  </div>
                  <div className='col-lg-4 col-sm-7'>
                    {/* <p className=' col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</p> */}
                    <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.username}</p>
                    {/* <Link to={`/superadminUserDataIndi/${x.id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>{x.username}</Nav.Link></Link> */}

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


      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Payments</h3>

<div className='fs-4 d-flex justify-content-center  text-center mt-1 mb-5'>
  <div className="input-group mb-3 mx-2 " style={{ width: '400px' }}>
    <input type="text" value={inputDatePay} onChange={handleDateChangePay} className="form-control col-lg-6" placeholder="YYYY-MM-DD, YYYY-MM, or YYYY" aria-label="Recipient's username" aria-describedby="button-addon2" />
    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmitPay}>Generate Graph</button>
  </div>
</div>

<div className='fs-4 col-12 d-flex justify-content-center container text-center mb-5 mt-3' style={{ color: '#FFFFFF' }}>
  {filteredDataPayG.length === 0 ? '' :
    <ResponsiveContainer className="chart-container" width="99%" minHeight={minHeight} >
      <LineChart width={1000} height={500} data={filteredDataPayG} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        <XAxis dataKey="month"
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

    </div>
  )
}

export default SectionOneUserDataSA