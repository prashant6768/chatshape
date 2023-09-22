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

  const BACKEND = 'http://localhost:5000/'
  // const BACKEND = 'https://api.zema.io/'
  // const BACKEND = 'http://3.138.169.250/'


  const [comData, setComData] = useState([])


  const [data, setData] = useState([])
  const [inputDateToken, setInputDateToken] = useState('');

  useEffect(() => {
    console.log("id ", id.id)
    axios.post(`${BACKEND}api/admin/dataBot/${id.id}`, { decoded, adminToken }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => {
        console.log(res.data, "all the data");
        setData(res.data)
      })
      .catch(err => console.log(err))
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
      .then(res => {
        console.log(res.data, "all the error data");
        setErrData(res.data)
      })
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
    }).then((res) => { if (res.data === 'suc') { toast.success('Bot Deleted'); setLoadingdel(false); } else if (res.data === 'fail') { toast.success('Some Error Occured, Try Again'); setLoadingdel(false); } })
      .then(setTimeout(() => { navigate(`/superadminUserData`) }, 2000))
      .catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoadingdel(false); })
    //  await navigate('/mychatbots');
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

  return (
    <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>
      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Bot - {data.name}</h3>

      <h5 className='fw-bolder col-12 d-flex justify-content-start container text-start pt-3 mb-2' style={{ color: '#FFFFFF' }}>Source Url- {data.url}</h5>
      <h5 className='fw-bolder col-12 d-flex justify-content-start container text-start pt-3 mb-2' style={{ color: '#FFFFFF' }}>Source Pdf- {data.pdf}</h5>


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
              filteredDataBot.length === 0 ?
                <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Data Available</p>
                :
                itemsToDisplayDataBot.map(x => (
                  <div className='row col-12 mt-3' style={{ borderBottom: '1px solid white', display: 'flex', flexWrap: 'wrap' }}>
                    <div className='col-lg-4 col-sm-7'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>{x.date}</p>
                    </div>
                    <div className='col-lg-3 col-sm-5'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Tokens Used : {x.usage}</p>
                    </div>
                    <div className='col-lg-3 col-sm-7'>
                      <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>Conversations : {x.ConNo}</p>
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


      <h3 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 pb-4 mb-4' style={{ color: '#FFFFFF' }}>Error Logs</h3>

      <div className='row col-11 mx-auto mt-4 d-flex '>
        <Card style={{ backgroundColor: '#212529' }} className='  d-flex rounded-4'>
          <Card.Body className="d-flex flex-column" style={{}}>
            <div className='row'>
              <input className='fs-4 col-sm-12 col-lg-12 d-flex justify-content-center rounded-4  mt-4 text-center mb-3 ' type="text"
                placeholder="Search..."
                value={searchTermError}
                onChange={handleSearchError} />
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
              filteredDataError.length === 0 ?
                <p className='col-12 d-flex justify-content-start text-start' style={{ color: '#FFFFFF', wordBreak: 'break-all' }}>No Errors</p>
                :
                itemsToDisplayDataErr.map(x => (
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
                      {/* <Link to={`/superadminBot/${x.bot_id}`} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</Nav.Link></Link> */}
                      <a href="#" onClick={() => handleDetailsClick(x)} className='col-12 d-flex justify-content-start text-start text-decoration-underline' style={{ color: '#FFFFFF' }}>Details</a>

                    </div>
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


      {showDetails && (
        <div className="details-component" ref={detailsRef}>

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
  )
}

export default SectionOneBotSA