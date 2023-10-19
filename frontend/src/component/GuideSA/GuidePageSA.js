import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import '../GuidePage/Deco.css'

import { Link } from 'react-router-dom';
import logo from '../../assets/Zema_Logo_Transperent.png'
import logo2 from '../../assets/Zema_Logo_Original.png'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const GuidePageSA = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY;

            if (currentScrollPosition > lastScrollPosition) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setLastScrollPosition(currentScrollPosition);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);


    const gradientC = false


    return (
        <div className='' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>

            <div className='guideNav' style={{ backgroundColor: '#212529', position: 'fixed', borderRight: '1px solid #FFE459', minWidth: '300px', maxWidth: '300px', overflowY: 'auto' }}>

                <ul style={{ minHeight: 'calc(100vh - 10px)', height: 'calc(100vh - 10px)', paddingLeft: '0px' }} className='d-flex-column justify-content-center'>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center mt-3 justify-content-center'>
                        <Link to='/' style={{}}><img src={gradientC ? logo2 : logo} alt='ZEMA' style={{ height: '80px' }} /></Link>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#intro' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Introduction</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#userdatapage' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>User Data Page</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udpcard' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Data Cards</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udptable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>User data table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udcong' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Unique Conversation Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udtokg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Token Usage Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udpdc' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Cards</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udpptable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udpg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Graph</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#userdataindipage' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>User Data Individual Page</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udipcard' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Data Cards</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udiptable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>User Data Individual Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udicong' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Unique Conversation Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#uditokg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Token Usage Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udipdc' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Cards</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udipptable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udipg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udiprofile' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Edit Client Profile</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udiprofiledel' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Delete Client</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#userdatabotpage' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Chatbot Page</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                       
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbtable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chatbot Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbcong' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Unique Conversation Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbtokg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Token Usage Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbhistory' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chat History</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udberrortable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Error Logs Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbissuetable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Issue Logs Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbembeddquestion' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Edit Knowledge Base</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbbotsource' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chatbot Knowledge Base</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbmodifybotprop' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Modify Bot Properties</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbretrain' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Retrain Bot</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbdeletebot' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Delete Bot</h6></a>
                        </li>
                        
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center pb-5  justify-content-start'>
                        <a href='#managellm' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Manage LLM</h5></a>
                    </li>
                </ul>

            </div>

            <div className={`scrollable-component bg-black guideMenu row ${isHidden ? 'hidden' : ''}`} style={{}}>
                <Link to='/' className='col-6' style={{}}><img src={gradientC ? logo2 : logo} className='m-2 ' alt='ZEMA' style={{ height: '80px' }} /></Link>
                <h3 className='p-2 mt-4 col-6' style={{ color: 'white' }} onClick={handleShow}>
                    Menu
                </h3>
            </div>

            <Offcanvas style={{ backgroundColor: '#212529', borderRight: '1px solid #FFE459' }} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{}}>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#intro' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Introduction</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#userdatapage' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>User Data Page</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udpcard' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Data Cards</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udptable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>User data table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udcong' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Unique Conversation Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udtokg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Token Usage Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udpdc' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Cards</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udpptable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udpg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Graph</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#userdataindipage' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>User Data Individual Page</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udipcard' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Data Cards</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udiptable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>User Data Individual Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udicong' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Unique Conversation Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#uditokg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Token Usage Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udipdc' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Cards</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udipptable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udipg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Payments Data Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udiprofile' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Edit Client Profile</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udiprofiledel' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Delete Client</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#userdatabotpage' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Chatbot Page</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbtable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chatbot Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbcong' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Unique Conversation Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbtokg' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Token Usage Graph</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbhistory' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chat History</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udberrortable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Error Logs Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbissuetable' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Issue Logs Table</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbembeddquestion' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Edit Knowledge Base</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbbotsource' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chatbot Knowledge Base</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbmodifybotprop' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Modify Bot Properties</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbretrain' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Retrain Bot</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#udbdeletebot' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Delete Bot</h6></a>
                        </li>
                        
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#managellm' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Manage LLM</h5></a>
                    </li>
                </Offcanvas.Body>
            </Offcanvas>

            <div className='guide pageContent pb-5' style={{}}>

                <h1 className='fw-bolder  col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Super Admin Guide</h1>

                <div className='mx-4' id='intro'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Introduction</h1>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Zema Super Admin panel is used by developers for handling the working of Zema. It provides variety of data and insights for smooth working of Zema. The Super Admin panel contains variety of pages including:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>User Data page - Contains various data about users, their chatbots, payment information, etc</li>
                            <li className='my-2'>Super Admin page - Contains various data about Super Admins, Error Logs, Issue Logs, etc</li>
                            <li className='my-2'>Manage page - Contains various data and settings about LLM</li>
                        </ul>
                    </p>
                </div>

                <div className='mx-4' id='userdatapage'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>User Data Page</h1>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                       User Data Page contains various information regarding the Zema clients including subscription plan, chatbots used, etc. This page also has lets us navigate to Individual user's data page which contains more information about one specific user.
                       </p> 
                       <h3 id='udpcard' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Data Cards
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The cards contains the information about cumilative stats of Zema i.e. total across all Zema clients:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Users - Total number of Clients that are currently signup up with Zema
                            </li>
                            <li className='my-2'>
                                Bots - Total number of chatbots that have been issued by Zema to it's clients
                            </li>
                            <li className='my-2'>
                                Tokens - Total number of tokens used by chatbots issued by Zema
                            </li>
                            <li className='my-2'>
                                Conversations - Total number of Unique conversations that occured across all Zema chatbots.
                            </li>
                        </ul>
                      Whenever a chatbot is opened by the user and a query is asked, a new Unique conversation starts. Now whenever the user closes the chatbot, that unique conversation will end.
                    </p>

                    <h3 id='udptable' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        User data table
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table contains the information about cumilative stats of Zema Clients:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Users Email - It shows the Email Id used by clients to register with Zema
                            </li>
                            <li className='my-2'>
                                Subscription - The name of the subscription plan the client is subscribed to.
                            </li>
                            <li className='my-2'>
                                Bots Used - Total number of chatbots the Client has created
                            </li>
                            <li className='my-2'>
                                Details - Navigates to User Data Individual page, which contains more detailed data about the specific Client.
                            </li>
                        </ul>
                     The table is paginated with page number and navigation options at the bottom of the table.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table has a search input at the top. This search can be used both as a search and filter. Type the data you are looking for, Zema will use Regex to find the pattern and display only the relevant data. The table also has a sort button used for sorting data in ascending or descending order. In this case it uses number of chatbots as metric for sorting.
                    </p>

                    <h3 id='udcong' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Unique Conversation Graph
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Everytime a user visits the Client's website and uses thier chatbot for a conversation, it triggers the start of the conversation. When the user closes the bot, then 1 unique conversation is counted. Unqiue conversations can be useful for finding the aount of people using the chatbot when they visit the client's website. The unique conversation data is registered and stored by Zema for every bot. This data is then stored in the database on a daily basis. So Unique conversations per day for every bot is tracked by Zema. This data can be visualized in the form of a line graph. This graph shows the total number of unique conversations that took place across all the chatbots issued by Zema per day.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    The graph initially will not be displayed. The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            YYYY-MM-DD: Display data from that specific day
                            </li>
                            <li className='my-2'>
                            YYYY-MM: Display data from that specific month
                            </li>
                            <li className='my-2'>
                            YYYY: Display data from that specific year
                            </li>
                            <li className='my-2'>
                            Empty: Display all the data available
                            </li>
                        </ul>
                    </p>

                    <h3 id='udtokg' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Token Usage Graph
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Tokens are used by the chatbots for answering queries. The amount of tokens used by the chatbots depend on:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            Amount of data used for answering the query
                            </li>
                            <li className='my-2'>
                            Length of answer given by the chatbot
                            </li>
                        </ul>
                    The tokens used from your chatbot for answering queries is registered and stored by Zema for every bot. This data is then stored in the database on a daily basis. So tokens used per day for every chatbot is tracked by Zema. This data can be visualized in the form of a line graph. This graph shows total number of tokens used across all the chtabots issued by zZema per day.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    The graph initially will not be displayed. The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            YYYY-MM-DD: Display data from that specific day
                            </li>
                            <li className='my-2'>
                            YYYY-MM: Display data from that specific month
                            </li>
                            <li className='my-2'>
                            YYYY: Display data from that specific year
                            </li>
                            <li className='my-2'>
                            Empty: Display all the data available
                            </li>
                        </ul>
                    </p>

                    <h3 id='udpdc' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Payments Data Cards
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The cards contains the information about cumilative stats of Payments made by Clients of Zema i.e. total across all Zema clients:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Tokens Used - Total number of tokens used by chatbots issued by Zema
                            </li>
                            <li className='my-2'>
                               Payments - Total number of payment that have been made by Clients
                            </li>
                            <li className='my-2'>
                                Total Payments - Total Sum of Payments made by Clients
                            </li>
                            <li className='my-2'>
                                Conversations - Total number of Unique conversations that occured across all Zema chatbots.
                            </li>
                        </ul>
                    </p>     

                     <h3 id='udpptable' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Payments Data Table
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table contains the information about cumilative stats of Payments made by the Zema Clients. Payments are made in Zema to buy or renew subscription plans of Zema. The fields shown in the table are:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Date - It shows the date when the respective payment was made
                            </li>
                            <li className='my-2'>
                                Subscription Plan - The name of the subscription plan the client is subscribed to.
                            </li>
                            <li className='my-2'>
                                Amount payed - The amount in USD payed for buying the respective subscription plan
                            </li>
                            <li className='my-2'>
                                Email Id - Email ID of the respective Client.
                            </li>
                        </ul>
                     The table is paginated with page number and navigation options at the bottom of the table.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table has a search input at the top. This search can be used both as a search and filter. Type the data you are looking for, Zema will use Regex to find the pattern and display only the relevant data.
                    </p>

                    <h3 id='udpg' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Payments Data Graph
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    This graph shows information about the Total amount (in USD) of payments made on a particular day.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    The graph initially will not be displayed. The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            YYYY-MM-DD: Display data from that specific day
                            </li>
                            <li className='my-2'>
                            YYYY-MM: Display data from that specific month
                            </li>
                            <li className='my-2'>
                            YYYY: Display data from that specific year
                            </li>
                            <li className='my-2'>
                            Empty: Display all the data available
                            </li>
                        </ul>
                    </p>
               
                </div>

                <div className='mx-4' id='userdataindipage'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>User Data Individual Page</h1>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                       User Data Individual Page contains various information regarding one specific Client including subscription plan, chatbots used, etc. This page also lets the Super Admins to edit certain parts of the Clients profile and to Delete a Clients profile from Zema. To navigate to this page go to Users Data page, in the first table showing data about Client's profile, click on details to navigate to User Data Individual Page of that specific Client's Profile.
                       </p> 
                       <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                      On the top of the page is the Email ID of the Client whose profile we are viewing about.
                       </p> 

                       <h3 id='udipcard' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Data Cards
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The cards contains the cumilative stats about a specific Zema Client:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Plan - The subscription plan our Client is currently subscribed to
                            </li>
                            <li className='my-2'>
                                Bots - Total number of chatbots that have been issued by Zema to this client
                            </li>
                            <li className='my-2'>
                                Tokens - Total number of tokens used by chatbots issued by Zema for this particular Client
                            </li>
                            <li className='my-2'>
                                Conversations - Total number of Unique conversations that occured across all the chatbots of this particular Client.
                            </li>
                        </ul>
                      Whenever a chatbot is opened by the user and a query is asked, a new Unique conversation starts. Now whenever the user closes the chatbot, that unique conversation will end.
                    </p>

                    <h3 id='udiptable' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        User Data Individual Table
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table contains the information about cumilative stats of Zema Clients:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Name of the Chatbot - It shows the name of the chatbot
                            </li>
                            <li className='my-2'>
                                Tokens Used - Total number of tokens used by that specific chatbot
                            </li>
                            <li className='my-2'>
                                Conversations - Total number of Unique Conversations that occured on that specific chatbot
                            </li>
                            <li className='my-2'>
                                Details - Navigates to Bot Data page, which contains more detailed data about the specific Chatbot.
                            </li>
                        </ul>
                     The table is paginated with page number and navigation options at the bottom of the table.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table has a search input at the top. This search can be used both as a search and filter. Type the data you are looking for, Zema will use Regex to find the pattern and display only the relevant data. The table also has a sort button used for sorting data in ascending or descending order. In this case it uses number of chatbots as metric for sorting.
                    </p>

                    <h3 id='udicong' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Unique Conversation Graph
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Everytime a user visits the Client's website and uses thier chatbot for a conversation, it triggers the start of the conversation. When the user closes the bot, then 1 unique conversation is counted. Unqiue conversations can be useful for finding the aount of people using the chatbot when they visit the client's website. The unique conversation data is registered and stored by Zema for every bot. This data is then stored in the database on a daily basis. So Unique conversations per day for every bot is tracked by Zema. This data can be visualized in the form of a line graph. This graph shows the total number of unique conversations that took place across all the chatbots issued by Zema for one specific Client per day.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    The graph initially will not be displayed. The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            YYYY-MM-DD: Display data from that specific day
                            </li>
                            <li className='my-2'>
                            YYYY-MM: Display data from that specific month
                            </li>
                            <li className='my-2'>
                            YYYY: Display data from that specific year
                            </li>
                            <li className='my-2'>
                            Empty: Display all the data available
                            </li>
                        </ul>
                    </p>

                    <h3 id='uditokg' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Token Usage Graph
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Tokens are used by the chatbots for answering queries. The amount of tokens used by the chatbots depend on:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            Amount of data used for answering the query
                            </li>
                            <li className='my-2'>
                            Length of answer given by the chatbot
                            </li>
                        </ul>
                    The tokens used from your chatbot for answering queries is registered and stored by Zema for every bot. This data is then stored in the database on a daily basis. So tokens used per day for every chatbot is tracked by Zema. This data can be visualized in the form of a line graph. This graph shows total number of tokens used across all the chtabots issued by Zema for one specific Client per day.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    The graph initially will not be displayed. The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            YYYY-MM-DD: Display data from that specific day
                            </li>
                            <li className='my-2'>
                            YYYY-MM: Display data from that specific month
                            </li>
                            <li className='my-2'>
                            YYYY: Display data from that specific year
                            </li>
                            <li className='my-2'>
                            Empty: Display all the data available
                            </li>
                        </ul>
                    </p>

                    <h3 id='udipdc' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Payments Data Cards
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The cards contains the information about cumilative stats of Payments made by one specific Client of Zema:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Plan - Subscription plan the Client is subscribed to
                            </li>
                            <li className='my-2'>
                               Payments - Total number of payment that have been made by the Client
                            </li>
                            <li className='my-2'>
                                Total Payments - Total Sum of Payments made by the Client
                            </li>
                            <li className='my-2'>
                                Conversations - Total number of Unique conversations that occured across all the chatbots issued for this Client.
                            </li>
                        </ul>
                    </p>     

                     <h3 id='udipptable' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Payments Data Table
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table contains the information about cumilative stats of Payments made by one specific Zema Client. Payments are made in Zema to buy or renew subscription plans of Zema. The fields shown in the table are:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Date - It shows the date when the respective payment was made
                            </li>
                            <li className='my-2'>
                                Subscription Plan - The name of the subscription plan the client is subscribed to.
                            </li>
                            <li className='my-2'>
                                Amount payed - The amount in USD payed for buying the respective subscription plan
                            </li>
                            <li className='my-2'>
                               Details - When we click on this "Detail", a card is made visisble with details about the transaction. The card can be closed by clicking on "Close" button. The Details card has the following data:
                               <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Date - It shows the date when the respective payment was made
                            </li>
                            <li className='my-2'>
                                Product ID - It shows the subscription plan
                            </li>
                            <li className='my-2'>
                                Amount - It shows the amount payed
                            </li>
                            <li className='my-2'>
                                Zema A/c - It shows the email ID registered with Zema by whom the payment was made
                            </li>
                            <li className='my-2'>
                                Email for payment - It shows the email ID used for making payment on Stripe
                            </li>
                            <li className='my-2'>
                                ID
                            </li>
                            <li className='my-2'>
                               Created
                            </li>
                            <li className='my-2'>
                               Invoice prefix
                            </li>
                            <li className='my-2'>
                               Name - Name of the person who made the payment
                            </li>
                           
                        </ul>
                            </li>
                        </ul>
                     The table is paginated with page number and navigation options at the bottom of the table.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table has a search input at the top. This search can be used both as a search and filter. Type the data you are looking for, Zema will use Regex to find the pattern and display only the relevant data.
                    </p>

                    <h3 id='udipg' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Payments Data Graph
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    This graph shows information about the Total amount (in USD) of payments made by a single Client on a particular day.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    The graph initially will not be displayed. The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph. Let's explain the inputs in the generate graph form:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            YYYY-MM-DD: Display data from that specific day
                            </li>
                            <li className='my-2'>
                            YYYY-MM: Display data from that specific month
                            </li>
                            <li className='my-2'>
                            YYYY: Display data from that specific year
                            </li>
                            <li className='my-2'>
                            Empty: Display all the data available
                            </li>
                        </ul>
                    </p>

                    <h3 id='udiprofile' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Edit Client Profile
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                   This form can be used to modify details of Client's profile i.e. name and phone number.
                    </p>

                    <h3 id='udiprofiledel' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Delete Client
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                   This can be used to delete all data of a Client's profile from Zema, including their Chatbots, Payment data, etc.
                    </p>

                </div>

                <div className='mx-4' id='userdatabotpage'>

                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Chatbot Page</h1>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                       Chatbot Page contains various information regarding one specific chatbot. This page contains information on various topics including Token usage, Unique Conversations, Chat History, Issue Logs, Error Logs, Bot data, etc.
                        To navigate to this page go to Users Data page, in the first table showing data about Client's profile, click on details to navigate to User Data Individual Page of that specific Client's Profile. There in the first table you will see information about various chatbots of that specific client. Click on "Details" on the one you would like to know more about. You will be navigated to Chatbot page for that specific Chatbot.
                       </p> 
                       <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                      The title at the top of that page shows the name of the chatbot whose data is being shown on the page. Next it shows the name of the sources used as knowledge base for the chatbot.
                       </p>

                       <h3 id='udbtable' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Chatbot Table
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>s
                        The table contains the information about cumilative stats of a specific chatbot per day:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Date - Date when data was stored
                            </li>
                            <li className='my-2'>
                                Tokens Used - Total number of tokens used by that specific chatbot
                            </li>
                            <li className='my-2'>
                                Conversations - Total number of Unique Conversations that occured on that specific chatbot
                            </li>
                        </ul>
                     The table is paginated with page number and navigation options at the bottom of the table.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table has a search input at the top. This search can be used both as a search and filter. Type the data you are looking for, Zema will use Regex to find the pattern and display only the relevant data. The table also has a sort button used for sorting data in ascending or descending order. In this case it uses conversations and tokens as metric for sorting.
                    </p>
                       
                    <h3 id='udbcong' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Unique Conversation Graph
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Everytime a user visits the Client's website and uses thier chatbot for a conversation, it triggers the start of the conversation. When the user closes the bot, then 1 unique conversation is counted. Unqiue conversations can be useful for finding the aount of people using the chatbot when they visit the client's website. The unique conversation data is registered and stored by Zema for every bot. This data is then stored in the database on a daily basis. So Unique conversations per day for every bot is tracked by Zema. This data can be visualized in the form of a line graph. This graph shows the total number of unique conversations that took place on a chatbot per day.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    The graph initially will not be displayed. The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            YYYY-MM-DD: Display data from that specific day
                            </li>
                            <li className='my-2'>
                            YYYY-MM: Display data from that specific month
                            </li>
                            <li className='my-2'>
                            YYYY: Display data from that specific year
                            </li>
                            <li className='my-2'>
                            Empty: Display all the data available
                            </li>
                        </ul>
                    </p>

                    <h3 id='udbtokg' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Token Usage Graph
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Tokens are used by the chatbots for answering queries. The amount of tokens used by the chatbots depend on:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            Amount of data used for answering the query
                            </li>
                            <li className='my-2'>
                            Length of answer given by the chatbot
                            </li>
                        </ul>
                    The tokens used from your chatbot for answering queries is registered and stored by Zema for every bot. This data is then stored in the database on a daily basis. So tokens used per day for every chatbot is tracked by Zema. This data can be visualized in the form of a line graph. This graph shows total number of tokens used by a chtabot per day.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    The graph initially will not be displayed. The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>
                            YYYY-MM-DD: Display data from that specific day
                            </li>
                            <li className='my-2'>
                            YYYY-MM: Display data from that specific month
                            </li>
                            <li className='my-2'>
                            YYYY: Display data from that specific year
                            </li>
                            <li className='my-2'>
                            Empty: Display all the data available
                            </li>
                        </ul>
                    </p>

                    <h3 id='udbhistory' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Chat History
                        </h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Zema also stores chat history of the chats or Q/A sessions that occurred on the chatbot. Chat history stored is based on Unique Conversations held on the chatbot. Chat history is stored with it's date and time of occurrence. The chats can be viewed by the User in Manage bots page, Bot analytics section. .
                    </p>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The chat history section will initially show a list of date and time of the respective conversations. Click on the one you want to read and it will open the accordian with the chat shown as a chat interface. The chats are paginated into groups of 10 chats. To view the other chats you can navigate the paginated chat history section by using the arrow buttons below. Page number of chat history is also available.
                        You can also filter and search for the chat history using date and time. Just put the required date/time in the search bar and it will filter the relevant data.
                        This technique helps filter and visualize relevant data.
                    </p>

                    <h3 id='udberrortable' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Error Logs Table
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>

                        The table contains the information about Errors caught by the chatbot during it's working. The different types of error caught are as follows:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Chatbot failed to answer a query as it could not find the answer in the knowledge base
                            </li>
                            <li className='my-2'>
                               Chatbot although gave an answer but did not use knowledge base, it gave the answer by hallucinating
                            </li>
                            <li className='my-2'>
                                Error occured in API of chatbot
                            </li>
                        </ul>
                        The error is logged whenever any one of these errors occur 5 consecutive times.
                     The table is paginated with page number and navigation options at the bottom of the table.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table has a search input at the top. This search can be used both as a search and filter. Type the data you are looking for, Zema will use Regex to find the pattern and display only the relevant data. The table also has a sort button used for sorting data in ascending or descending order. In this case it uses conversations and tokens as metric for sorting.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table contains the following information about the error:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Date and Time - Date and time when the error occured
                            </li>
                            <li className='my-2'>
                               Error ID - Id of the error from the database
                            </li>
                            <li className='my-2'>
                                Name of the Bot - Name of the bot in which the error occured
                            </li>
                            <li className='my-2'>
                                Details - On clicking on Details, a card will appear showing more details about the error
                            </li>
                        </ul>
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The details table contains the following information about the error:
                        <ul className='col-11 my-2'>
                        <li className='my-2'>
                                Name of the Bot - Name of the bot in which the error occured
                            </li>
                            <li className='my-2'>
                               Error ID - Id of the error from the database
                            </li>
                            <li className='my-2'>
                               Bot ID - Id of the chatbot from the database
                            </li>
                            <li className='my-2'>
                                Date and Time - Date and time when the error occured
                            </li>
                             
                            <li className='my-2'>
                                Error and chat - The error is displayed and at the bottom is the user's query and the answer given by our chatbot
                            </li>
                        </ul>
                        Below is a Close details button used for closing this section.
                    </p>

                    <h3 id='udbissuetable' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Issue Logs Table
                    </h3>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>

                        The table contains the information about issues / feedbacks submitted by the Clients. The information shown is:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                               Name of the Bot - Name of the Bot the issue / feedback was submitted from
                            </li>
                            <li className='my-2'>
                               Title - Title of the issue
                            </li>
                            <li className='my-2'>
                               Date and time - Date and time when the issue / feedback was submitted
                            </li>
                            <li className='my-2'>
                                Details - On clicking on Details, a card will appear showing more details about the issue / feedback
                            </li>
                        </ul>
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The table has a search input at the top. This search can be used both as a search and filter. Type the data you are looking for, Zema will use Regex to find the pattern and display only the relevant data. The table also has a sort button used for sorting data in ascending or descending order. In this case it uses conversations and tokens as metric for sorting.
                     The table is paginated with page number and navigation options at the bottom of the table.
                    </p>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The details table contains the following information about the error:
                        <ul className='col-11 my-2'>
                        <li className='my-2'>
                                Name of the Bot - Name of the bot 
                            </li>
                            <li className='my-2'>
                               Bot ID - Id of the chatbot from the database
                            </li>
                            <li className='my-2'>
                                Username - Email ID of the Client who submitted the issue / feedback
                            </li>
                            <li className='my-2'>
                                Issue - Title of the issue
                            </li>
                            <li className='my-2'>
                                Details - Details of the issue
                            </li>
                        </ul>
                        Below is a Close details button used for closing this section.
                    </p>

                    <h3 id='udbembeddquestion' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Edit Knowledge Base
                        </h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Sometimes, the knowledge base of a chatbot needs little modifications or additions instead of retraining it from the scratch.
                   Zema chatbots let new data be added into the knowledge base using the Embed Q/A functionality. This feature is useful when the LLM fails to recognize the answer or doesn't give optimal or desired answer to a specific question.
                    </p>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        When the Client embbeds a Q/A pair into the chatbot a few additional sections appear.
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Embedded Q/A section in Bot Properties section. It shows the Q/A pairs that have been embbeded into the chatbot</li>
                            <li className='my-2'>Embedded Q/A section in Chat Demo section. It shows the Q/A pairs that have been embbeded into the chatbot</li>
                            <li className='my-2'>Embedded Q/A Saved section in Bot Properties section. It shows the Q/A pairs that were once embbeded into the chatbot. When we Retrain our bot, a brand new knowledge base is created from the provided PDF/URL. In this process the Embedded Q/A are removed. But these removed Q/A pair are saved inside the Zema database and can be re-embedded into our knowledge base using the Embedded Q/A Saved section. It contains the Embedded Q/A pair along with 2 buttons:-- "Embedd Question" to embedd this Q/A into the knwledge base, and "Remove Question" to remove that question from the list.
                            </li>
                        </ul>

                    </p>

                    <h3 id='udbbotsource' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Chatbot Knowledge Base
                        </h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                       A chatbot answers questions in the context of it's knowledge base. The knowledge base of a chatbot can comprise of:
                       <ul className='col-11 my-2'>
                            <li className='my-2'>Website's data - Zema can scrape data from your desired website and use it as it's knowledge base</li>
                            <li className='my-2'>PDF - Zema can scrape data from PDF file and use it as it's knowledge base</li>
                            <li className='my-2'> Zema allows the Clients to Embedd Q/A pair into the website for more precise answering.</li>
                        </ul>
                        While PDF source and URL source can be used standalone or together, Embedd Q/A needs to have atleast one of these.
                    </p>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                      The data here includes:
                      <ul className='col-11 my-2'>
                            <li className='my-2'>URL of the website scrapped</li>
                            <li className='my-2'>Name of the PDF file from which data was scrapped</li>
                            <li className='my-2'>URLs scrapped - Zema can either scrape only the URL you provide it or scrape the URL you provided for additional URLs and then scrape all of them together. In URLs scrapped in the latter case are displayed in this section.</li>
                            <li className='my-2'>URLs excluded - Zema provides you the choice to exclude certain URLs from getting scrapped. These excluded URLs are displayed in this section </li>
                            <li className='my-2'>Embedded Q/A - Embedded Q/A pair are the Q/A pairs that were embedded into the knowledge base by the Client.</li>
                        </ul>
                    </p>

                    <h3 id='udbmodifybotprop' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Modify Bot Properties
                        </h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Various properties of a chatbot can be modified by the Client to customize it's working and user experience:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>Name of the Chatbot - Only used for recognizing the chatbot in Client's Admin Panel</li>
                            <li className='my-2'>The initial message which is shown by the chatbot on opening it.</li>
                            <li className='my-2'>Suggested Queries which are shown on by the chatbot when we initiallly open it. On clicking on one of these Queries, the query is sent to the chatbot and the chatbot answers it. The suggested queries then disappear. Suggested queries have to be separated by comma “,” to be recognized as a separate query. </li>
                            <li className='my-2'>Prompt of the chatbot. The prompt is the question that is way in which the question is framed and asked to the chatbot. An effective query can increase the chatbots likelihood of answering what we want and the way we want. During modifying prompt, care should be taken to not to change or remove “text” or “query” as these 2 are keywords important for the chatbot to function. “Text” is the relevant document found by the LLM used for answering the question and "Query" is the user's query.</li>
                        </ul>
                         Modify the properties as per instructions and then click on submit.
                    </p>

                    <h3 id='udbretrain' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Retrain Bots
                        </h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                   Zema chatbots can be retrained from scratch with new data, using the Retrain bot functionality. On retraining the chatbot, previous knowledge base is replaced by new Knowledge base. The retraining of chatbot canbe done with URL and Pdf, or either one of them. Your Bots left in your subscription tier remains unchanged for it is modification in already existing bot. It takes in URL, PDF and exclude URL as parameters.
                    </p>

                    <h3 id='udbdeletebot' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Delete Bots
                        </h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Used to delte a chatbot. This frees up one bot from your allowed bots in your subscription tier.
                    </p>


                       </div>

                       <div className='mx-4' id='managellm'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Manage LLM</h1>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        This page is used for modifying some properties of the LLM:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Embedd Script - This script is used for embedding our chatbot into the Client's websites. The script property called "cred" which is the unique Id of the chatbot in the database. The script in itself is a CDN jsDelivr script.</li>
                            <li className='my-2'>Model Temperature - Used to change / modify the creativity of the LLM. 0  is least while 1 is most creative</li>
                            <li className='my-2'>No of Document - Number of documents used by the chatbot / LLM to answer. This parameter is the number of documents that vector search fetches which in turn are used as context to answer queries.</li>
                            <li className='my-2'>Sematic Search Similarity Metric - Change the SSSM used by the chatbot. We have L2, Cosine, IP SSSM availabe.</li>
                        </ul>
                    </p>
                </div>


            </div>

        </div>
    )
}

export default GuidePageSA