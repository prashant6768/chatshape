import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import '../GuidePage/Deco.css'

import { Link } from 'react-router-dom';
import logo from '../../assets/Zema_Logo_Transperent.png'
import logo2 from '../../assets/Zema_Logo_Original.png'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const SectionOneGuide = () => {

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


            <div className='guideNav' style={{ backgroundColor: '#212529', position: 'fixed', borderRight: '1px solid #FFE459', minWidth: '300px', maxWidth: '300px' }}>

                <ul style={{ minHeight: 'calc(100vh - 10px)', height: 'calc(100vh - 10px)', paddingLeft: '0px' }} className='d-flex-column justify-content-center'>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center mt-3 justify-content-center'>
                        <Link to='/' style={{}}><img src={gradientC ? logo2 : logo} alt='ZEMA' style={{ height: '80px' }} /></Link>
                    </li>

                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#intro' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Introduction</h5></a>
                    </li>

                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#create' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Create Bot</h5></a>
                    </li>

                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#embeddingthechatbot' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Embedding the Chatbot</h5></a>
                    </li>

                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#embeddingthechatbothtml' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Embedding in HTML websites</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#embeddingthechatbotshopify' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Embedding in Shopify</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#embeddingthechatbotwordpress' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Embedding in Wordpress</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#usingchatbot' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Using the Chatbot</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#payment' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Payment and Subscription</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#accounts' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Accounts</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#signup' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Signup</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#login' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Login</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#forgetpassword' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Forget Password</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#managebots' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Manage Bots</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#botsource' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chatbot's Knowledge Base</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#botanal' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Analytics</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#tokenusage' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Token Usage</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#uniquecon' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Unique Conversations</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#chathistory' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chat History</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#feedback' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Submit Issue / Feedback</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#demochat' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Demo Chat</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#modifybot' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Modify Bots</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#retrainbot' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Retrain Bots</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#embedquestion' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Edit Knowledge Base</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#deletebot' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Delete Bot</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#modifybotprop' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Modify Bot Properties</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#modifybotui' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Modify Bot Look</h6></a>
                        </li>
        

        
                    </ul>

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
                        <a href='#create' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Create Bot</h5></a>
                    </li>

                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#embeddingthechatbot' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Embedding the Chatbot</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#embeddingthechatbothtml' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Embedding in HTML websites</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#embeddingthechatbotshopify' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Embedding in Shopify</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#embeddingthechatbotwordpress' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Embedding in Wordpress</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#usingchatbot' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Using the Chatbot</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#payment' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Payment and Subscription</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#accounts' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Accounts</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#signup' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Signup</h5></a>
                    </li>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#login' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Login</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#forgetpassword' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Forget Password</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#managebots' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Manage Bots</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#botsource' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chatbot's Knowledge Base</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#botanal' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Analytics</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#tokenusage' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Token Usage</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#uniquecon' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Unique Conversations</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#chathistory' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Chat History</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#feedback' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Submit Issue / Feedback</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#demochat' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Demo Chat</h6></a>
                        </li>
                    </ul>
                    <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                        <a href='#modifybot' style={{ textDecoration: 'none' }}> <h5 style={{ color: 'white' }}>Modify Bots</h5></a>
                    </li>
                    <ul className='col-11 my-2'>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#retrainbot' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Retrain Bots</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#embedquestion' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Edit Knowledge Base</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#deletebot' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Delete Bot</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#modifybotprop' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Modify Bot Properties</h6></a>
                        </li>
                        <li style={{ textDecoration: 'black' }} className='d-flex text-center align-items-center  justify-content-start'>
                            <a href='#modifybotui' style={{ textDecoration: 'none' }}> <h6 style={{ color: 'white' }}>Modify Bot Look</h6></a>
                        </li>
                
                
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>

            <div className='guide pageContent pb-5' style={{}}>

                <h1 className='fw-bolder  col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Guide</h1>

                <div className='mx-4' id='intro'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Introduction</h1>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>Zema is an AI Co-pilot designed to assist small business owners, entrepreneurs, coaches, consultants, start-up founders, and executives in enterprise companies. We are currently starting with Chatbots for websites, utilizing web copy and ingested PDFs as the source.</p>
                </div>

                <div id='create' className='mx-4'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Create Bot</h1>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>Zema is used to create chatbots that can be embedded into your websites. The chatbot can be used to answer user queries.
                    </p>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>Zema currently offers web URLs and PDF support which it uses to create knowledge base for your chatbot.
                    </p>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        We can create a chatbot by first navigating to create chatbot page. The create chatbot page can be found by first clicking on 'My Chatbots' in the navbar, you will be navigated to My Chatbots page where you can find a button "Create Chatbots", on clicking on this button you will be navigated to "Create Chatbots page". There we will find a form asking for:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Name of the chatbot</li>
                            <li className='my-2'>URL of the website you want the chatbot about - This Url is used by Zema for data collection. We can either collect data from only this Url or use this Url to find more Urls inside the provided Url and then collect data from all those Urls and the provided Url.</li>
                            <li className='my-2'> Scrap data from Urls found inside the above url - This switch is turned Off by default. When in Off state, the chatbot will only scrap or fetch data from the Url inputed by the user. When in On state, Zema will first search the Url inputed by the user for other Urls, after finding the Urls, it will use the inputed Url and the Urls it found for data collection.</li>
                            <li className='my-2'>URLs to exclude when creating the knowledge base - When Zema is set to find other Urls inside the given Url, there could be Urls we don't want to include in our knowledge base. These Urls can be filled inside the form, each Url in a seperate line. Zema will then not include these Urls during data collection process. </li>
                            <li className='my-2'>PDF file you want the chatbot about.</li>
                        </ul>
                        We can either use both URL and PDF together or only one of them separately. It might take some time dependng on the amount of data to be usd as knowledge base. After your chatbot is created successfully, you will recieve an email about the chatbots creation.
                        Creating a chatbot uses up one bot from your subscription tier.
                    </p>

                </div>

                <div className='mx-4' id='embeddingthechatbot'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Embedding the Chatbot</h1>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>Once the chatbot has been created successfully, we can embed it inside our websites to give our website a chatbot functionality. Embedding Zema chatbot is very easy.</p>
                    <h3 id='embeddingthechatbothtml' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Embedding into HTML based websites
                    </h3>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Go to My Chatbots page by clicking on My Chatbots in the Navbar. There you will find all your created bots. Click on details button on the bot you want to embed. You will be navigated to Manage Chatbots page.
                            </li>
                            <li className='my-2'>
                                Manage Chatbots will show the name and other details of your created chatbot. Below the name you will find "Add this Script to your website to get your chatbot". Click on the script inside the white box, this will copy the chatbots script into your clipboard
                            </li>
                            <li className='my-2'>
                                Go inside your websites code, open your websites "Index.html" file. There you just have to paste the script inside the "Head" tag and save your 'Index.html' file. This will embed our chatbot into your website
                            </li>
                        </ul>
                    </p>

                    <h3 id='embeddingthechatbotshopify' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Embedding into your Shopify Store
                    </h3>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Go to My Chatbots page by clicking on My Chatbots in the Navbar. There you will find all your created bots. Click on details button on the bot you want to embed. You will be navigated to Manage Chatbots page.
                            </li>
                            <li className='my-2'>
                                Manage Chatbots will show the name and other details of your created chatbot. Below the name you will find "Add this Script to your website to get your chatbot". Click on the script inside the white box, this will copy the chatbots script into your clipboard
                            </li>
                            <li className='my-2'>
                                Login to your Shopify Admin.
                                To login, go to your Shopify store's admin panel by visiting https://admin.shopify.com/
                            </li>
                            <li className='my-2'>
                                In the Shopify admin, go to “Online Store” and then click on “Themes.” Then Click on “Customize” the theme you are using for your store.
                            </li>
                            <li className='my-2'>
                                In the left sidebar of the theme editor, you will see “Add section” under the “Header” section. Click on this and choose “Custom Liquid”.
                            </li>
                            <li className='my-2'>
                                Just add the script tag inside the "Head" tag and set the Padding for both to be 0px.
                            </li>
                            <li className='my-2'>
                                After adding the script tag, click the “Save” button at the top right of the Theme Editor to save your changes. This will embed our chatbot into your website.
                            </li>
                        </ul>
                    </p>

                    <h3 id='embeddingthechatbotwordpress' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>
                        Embedding into your Wordpress website.
                    </h3>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Go to My Chatbots page by clicking on My Chatbots in the Navbar. There you will find all your created bots. Click on details button on the bot you want to embed. You will be navigated to Manage Chatbots page.
                            </li>
                            <li className='my-2'>
                                Manage Chatbots will show the name and other details of your created chatbot. Below the name you will find "Add this Script to your website to get your chatbot". Click on the script inside the white box, this will copy the chatbots script into your clipboard
                            </li>
                            <li className='my-2'>
                                First, you will need to log in to your WordPress settings and then add a plugin to install the Zema chatbot code into your site.
                            </li>
                            <li className='my-2'>
                                Go to Plugins section  --&gt;  Search Simple Custom CSS and JS  --&gt;  Click Settings.
                            </li>
                            <li className='my-2'>
                                Click Add HTML Code button.
                            </li>
                            <li className='my-2'>
                                Go to WordPress plugins and click on Settings for Simple Custom CSS and JS.
                            </li>
                            <li className='my-2'>
                                Save your progress by clicking the Publish button in the right corner. This will embed our chatbot into your website.
                            </li>
                        </ul>
                    </p>

                </div>

                <div className='mx-4' id='usingchatbot'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Using the Chatbot</h1>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        After you have embedded the chatbot on your website, Zema's logo will appear at the bottom right corner of your webpages. On clicking on the logo, a popup will open with a chat interface. This is our chatbot popup. You or anyone opening your website can ask questions to the chatbot about the website, the chatbot will using LLM to figure out the answer from the provided knowledge base and give the answer. The chatbots interface is as follows:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>
                                Initially the chatbot will give you an introductory message. This message can be modified from the Manage Bots section.
                            </li>
                            <li className='my-2'>
                                Below will be a few chat bubbles at the bottom of the chat area, these are suggested queries. Clicking on any of these will ask the query to the chatbot. The rest of the suggested prompts will then disappear. These queries can be modified or removed from the Manage bots section.
                            </li>
                            <li className='my-2'>
                                The input area is used for typing your query, the query can then be asked to the chatbot by clicking on the send button ( arrow shaped icon ).
                            </li>
                            <li className='my-2'>
                                The chatbot will have a somewhat transparent "Powered by Zema" written inside the chatarea. This message can be removed by purchasing the "Enterprise tier" subscription.
                            </li>
                            <li className='my-2'>
                                Zema chatbots also support both 'speech to text' and 'text to speech' functionalities. These functionalities are unlocked on purchasing the 'Standard tier' subscription or above.
                            </li>
                            <li className='my-2'>
                                Speech to text can be used for asking queries to our chatbot. In order for the chatbot to listen to your audio, you will need to click on the "Mic icon with a slash". This icon signifies that the chatbot is yet to get permission to listen to the audio. On clickinh on the icon, the browser will ask for your permission to use microphone. Click 'yes'. Then the icon will change to "Mic". The mic icon signifies that the chatbot has permission to listen but isn't listening to your audio right now. Click on the "Mic icon", the icon will change to circular "Stop" icon. This signifies that the chatbot is listening to your audio. On clicking on the "Stop" icon will stop the recording and the icon will revert back to "Mic" icon. The audio it recorded will be processed from "Speech to Text" and the query will be automatically asked to the chatbot.
                            </li>
                            <li className='my-2'>
                                Text to Speech can be used to listen to the answers given by the chatbot. In order for the chatbot to implement "Text to Speech", click on the "Speaker Cross" icon. The speaker cross icon signifies that the "Text to Speech" is off. On turning it on by clicking the icon will change to "Speaker". Now the chatbot will synthesis speech from the answered text.
                            </li>
                        </ul>
                    </p>
                </div>

                <div className='mx-4' id='payment'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Payment and Subscription</h1>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Zema offers various tiers of subscription each offering additional quirks and features including amount of usable tokens, amount of usable chatbots, audio and speech capabilities, etc. Subscriptions can be bought on Yearly or Monthly basis as desired by the user. Subscription tiers include:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Free Tier</li>
                            <li className='my-2'>Simple Tier</li>
                            <li className='my-2'>Standard Tier</li>
                            <li className='my-2'>Enterprise Tier</li>
                        </ul>
                        To subscribe the user needs to navigate to pricing page, to navigate click on Pricing in navbar, then choose if they want a yearly or monthly subscription and choose the tier you want. Zema uses Stripe as its payment gateway. On clicking on subscribe the user will be navigated to Stripe's checkout page were we fill in the necessary details and pay for the subscription. On successful payment the user is navigated to Zema's successful payment page were they are shown some details about the transaction.
                        On successfully subscribing to a subscription there will be a few changes along with change in subscription tier:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Bought date changes to the day the subscription is bought</li>
                            <li className='my-2'>Expiry date changes according to plan</li>
                            <li className='my-2'>Plan is upgraded according to the plan bought</li>
                            <li className='my-2'>Number of usable tokens is upgraded/ refilled according to the plan</li>
                            <li className='my-2'>Bots left is updated according to plan bought but not refilled. The number of bots will be total bots given by the subscription tier minus the number of bots being used by the user.</li>
                        </ul>
                        All the data about expiry date, bots left, tokens left, etc. can be found on the Accounts page. If the user wants to check their transaction history they can go to Payments history page. To navigate to payments history page one should go to Accounts page using the 'Accounts' in navbar and click on 'Transactions' button. The transaction page contains data about all transactions/subscriptions bought by the user. Some data available at Payment history page include:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Date of payment</li>
                            <li className='my-2'>Plan bought</li>
                            <li className='my-2'>Amount paid</li>
                            <li className='my-2'>Zema user's email id</li>
                            <li className='my-2'>Name of the person mentioned during Stripe payment</li>
                            <li className='my-2'>Payment Id</li>
                        </ul>
                    </p>
                </div>

                <div className='mx-4' id='accounts'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Accounts</h1>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>Whenever user creates an account by signing up with Zema, a few data points are stored in Zema,s database. These datapoints include:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Name of the user</li>
                            <li className='my-2'>Phone number of the user</li>
                            <li className='my-2'>Email id of the user</li>
                            <li className='my-2'>Password of the user</li>
                            <li className='my-2'>A default subscription (free tier subscription) is given to the user on signing up.</li>
                        </ul>
                        All this data is available for us to view in the Accounts page. To navigate to the Accounts page, click on Accounts in the navbar. We can view a variety of data about our Zema account:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Client Email</li>
                            <li className='my-2'>Subscription plan</li>
                            <li className='my-2'>Date the current plan was bought on</li>
                            <li className='my-2'>Date the current plan will expire</li>
                            <li className='my-2'>Usable chatbots left</li>
                            <li className='my-2'>Usable tokens left</li>
                        </ul>
                        You can also edit your accounts profile data by clicking on the "Edit Profile Details" button. A window will appear which will let you change your registered name and phone number.
                    </p>
                </div>

                <div className='mx-4' id='signup'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Signup</h1>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>To create bots and embed them into your website you will first need to create a Zema profile/account. You can create an account by signing up. To signup click on "Try Zema" in the navbar, you will be navigated to a login page with and login form. Click on "Signup" link. You will be navigated to the signup page with a signup form. Fill the required details (Name, phone number, email id, password) and click submit. </p>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Another form will appear asking for an OTP. Zema has sent an OTP on your email ID, check it and fill the OTP inside the form and submit. Congratulations, your Profile has been registered with Zema. You will then be navigated to the "Login" page, were you will need to login to get your admin controls for your chatbot creation, modification, analysis, etc.
                    </p>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Zema also allows Google Login/Signup. You can find a "Google" button on both Login and Signup page. This button allows for either Signup or Login depending on if you already have a Account or not.
                    </p>
                </div>

                <div className='mx-4' id='login'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Login</h1>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        To login, you need to navigate to the login page by clicking on the "Try Zema" in navbar. Fill in the neccessary details and click on submit. Congratulations, you have now logged in to your Zema profile.
                    </p>

                    <h3 id='forgetpassword' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Forget Password</h3>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Forget password feature can be used by the Clients to set a new password in case they have forgotten thier existing password. To set a new password for your Zema profile, you need to navigate to the Forget Passowrd page. Click on Try Zema button in the navbar, you will be navigated to the Login page, under the login button you fill find a link "Forget Password", click on it to navigate to the Forget Password page.
                    </p>
                    <p className=' col-11 d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        On the forget password page, you will find a form named "Forget Password", fill in your email id which was used for creating the Zema profile and then click submit. Another form will appear below this form asking for an OTP. You can check your inbox for OTP from Zema. Fill in the OTP and press submit. Another form will appear below this OTP form, this form will prompt you to fill in your "New Password". Fill in your new password and click submit. Congratulations, you have successfully changed your Zema profile's password.
                    </p>
                </div>

                <div className='mx-4' id='managebots'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Manage Bots and Analytics</h1>
                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Zema chatbots upon their creation have a few properties. These properties can both be viewed and modified inside the Manage Bots section. 
                    </p>

                    <h3 id='botsource' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Chatbot Knowledge Base</h3>
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
                      These sources can be viewed by the client in Manage chatbot page. To navigate click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card which you want to check the sources of. You will be navigated to the "Manage Bots page". The data here includes:
                      <ul className='col-11 my-2'>
                            <li className='my-2'>URL of the website scrapped</li>
                            <li className='my-2'>Name of the PDF file from which data was scrapped</li>
                            <li className='my-2'>URLs scrapped - Zema can either scrape only the URL you provide it or scrape the URL you provided for additional URLs and then scrape all of them together. In URLs scrapped in the latter case are displayed in this section.</li>
                            <li className='my-2'>URLs excluded - Zema provides you the choice to exclude certain URLs from getting scrapped. These excluded URLs are displayed in this section </li>
                            <li className='my-2'>Embedded Q/A - Embedded Q/A pair are the Q/A pairs that were embedded into the knowledge base by the Client.</li>
                        </ul>
                    </p>

                    <h3 id='botanal' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Analytics</h3>

                    <p className=' col-11 d-flex flex-wrap justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Zema chatbots will be used by the users of Client's website. A lot of usage data will thus be generated that could provide useful insites to the Client. Due to this very reason Zema collects a variety of data from the chatbots and provided it to the Clients for their use.
                        Zema provides a few analytics for you to help track your chatbots usage. It includes:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Line graph for Token usage per day for every bot</li>
                            <li className='my-2'>Line graph for Unique conversations held per day for every bot</li>
                            <li className='my-2'> Chat history of every bot</li>
                        </ul>
                    </p>

                    <h3 id='tokenusage' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Tokens Usage</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Tokens are used by the chatbots for answering queries. The amount of tokens used by the chatbots depend on:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>Amount of data used for answering the query</li>
                            <li className='my-2'>Length of answer given by the chatbot</li>
                        </ul>
                        The tokens used from your chatbot for answering queries is registered and stored by Zema for every bot. This data is then stored in the database on a daily basis. So tokens used per day are tracked by Zema. This data can be visualized in the form of a line graph. This line graph of Tokens used per day can be found in Manage Bots page, Bot Analytics section.
                        To navigate click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card which you want to check the analytics about. You will be navigated to the "Manage Bots page". Click on the "Bot Analytics" and you will be at the Bot Analytics section.
                    </p>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The "Tokens used" is used for visualizing the Token usage of that particular bot per day. The graph initially will not be displayed.
                        The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>YYYY-MM-DD: Display data from that specific day</li>
                            <li className='my-2'>YYYY-MM: Display data from that specific month</li>
                            <li className='my-2'>YYYY: Display data from that specific year</li>
                            <li className='my-2'>Empty: Display all the data available</li>
                        </ul>
                        This technique helps filter and visualize relevant data.
                    </p>

                    <h3 id='uniquecon' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Unique Conversations</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Everytime a user visits the Client's website and uses thier chatbot for a conversation, it triggers the start of the conversation. When the user closes the bot, then 1 unique conversation is counted. Unqiue conversations can be useful for finding the aount of people using the chatbot when they visit the client's website.
                        The unique conversation data is registered and stored by Zema for every bot. This data is then stored in the database on a daily basis. So Unique conversations per day are tracked by Zema. This data can be visualized in the form of a line graph. This line graph of Unique conversations per day can be found in Manage Bots page, Bot Analytics section.
                        To navigate click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card which you want to check the analytics about. You will be navigated to the "Manage Bots page". Click on the "Bot Analytics" and you will be at the Bot Analytics section.
                    </p>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The "Unqiue Conversations" is used for visualizing the number of Unique conversations that occured on that particular bot per day. The graph initially will not be displayed.
                        The graph comes with a form which acts as the input or filter for the graph. The inputs can be YYYY-MM-DD or YYYY-MM or YYYY or empty. After filling the graph click on Generate graph button to generate a line graph.Let's explain the inputs in the generate graph form:
                        <ul className='col-11 my-2'>
                            <li className='my-2'>YYYY-MM-DD: Display data from that specific day</li>
                            <li className='my-2'>YYYY-MM: Display data from that specific month</li>
                            <li className='my-2'>YYYY: Display data from that specific year</li>
                            <li className='my-2'>Empty: Display all the data available</li>
                        </ul>
                        This technique helps filter and visualize relevant data.
                    </p>

                    <h3 id='chathistory' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Chat History</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Zema also stores chat history of the chats or Q/A sessions that occurred on the chatbot. Chat history stored is based on Unique Conversations held on the chatbot. Chat history is stored with it's date and time of occurrence. The chats can be viewed by the User in Manage bots page, Bot analytics section. To navigate click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card which you want to check the chat history of. You will be navigated to the "Manage Bots page". Click on the "Bot Analytics" and you will be at the Bot Analytics section.
                    </p>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        The chat history section will initially show a list of date and time of the respective conversations. Click on the one you want to read and it will open the accordian with the chat shown as a chat interface. The chats are paginated into groups of 10 chats. To view the other chats you can navigate the paginated chat history section by using the arrow buttons below. Page number of chat history is also available.
                        You can also filter and search for the chat history using date and time. Just put the required date/time in the search bar and it will filter the relevant data.
                        This technique helps filter and visualize relevant data.
                    </p>

                    <h3 id='feedback' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Submit Issue / Feedback</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        We can also submit issues / feedback to Zema. To submit an issue or feedback, navigate to manage bots page, to the Demo chat section. To navigate click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card which you want to submit an issue for. You will be navigated to the "Manage Bots page". Click on the "Demo Chat" and you will be at the Demo chat section.There you will find the form for Feedback / Issue.
                        Just fill the title of the issue and details of the issue and click on submit. The issue / feedback will be sent to the Zema team who will view the issue and take the appropriate action.
                    </p>

                    <h3 id='demochat' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Demo Chat</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Demo chat is a working demo of the chatbot on manage bots page, demo chat section. To navigate click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card which you want to use Demo Chat for. You will be navigated to the "Manage Bots page". Click on the "Demo Chat" and you will be at the Demo chat section. This demo chat is great for observing: 
                    <ul className='col-11 my-2'>
                            <li className='my-2'>How changes in the UI / appearance of the chatbot would look and feel like</li>
                            <li className='my-2'>How changing Prompts of the chatbot is effecting the answers of the chatbot</li>
                            <li className='my-2'>Answers given by the chatbot on using the suggested queries of the chatbot</li>
                            <li className='my-2'>Check if the chatbot is unable to answer to a specific question and then use Embed question form to embed it's answer into the chatbots knowledge base.</li>
                        </ul>       
                    </p>

                </div>

                <div className='mx-4' id='modifybot'>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Modify Bots</h1>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>Zema provides a lot of customizability for their chatbots, both in appearance and functionality. These customizations can help Clients achieve their desired output and feel from our chatbots. The various ways in which we can modify our chatbot include:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>Retrain Chatbot</li>
                            <li className='my-2'>Edit Knowledge base / Embed Q/A</li>
                            <li className='my-2'>Modify properites of the bot</li>
                            <li className='my-2'>Modify appearance of the bot</li>
                            <li className='my-2'>Delete bot</li>
                        </ul>
                        Let us discuss each one of them one by one.
                        </p>

                        <h3 id='retrainbot' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Retrain Bots</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                   Zema chatbots can be retrained from scratch with new data, using the Retrain bot functionality. On retraining the chatbot, previous knowledge base is replaced by new Knowledge base. The retraining of chatbot canbe done with URL and Pdf, or either one of them. Your Bots left in your subscription tier remains unchanged for it is modification in already existing bot. To retrain your bot, click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card of the chatbot which you want to retrain. You will be navigated to the "Manage Bots page". Scroll down and you will find Retrain Bot form. It takes in URL, PDF and exclude URL as parameters.
                    </p>

                    <h3 id='embedquestion' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Edit Knowledge Base</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                        Sometimes, the knowledge base of a chatbot needs little modifications or additions instead of retraining it from the scratch.
                   Zema chatbots let new data be added into the knowledge base using the Embed Q/A functionality. This feature is useful when the LLM fails to recognize the answer or doesn't give optimal or desired answer to a specific question.
                To edit the knowledge base your bot, click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card of the chatbot which you want to retrain. You will be navigated to the "Manage Bots page". Click on Demo chats section and scroll down and you will find Embed Q/A form.
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

                    <h3 id='deletebot' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Delete Bots</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    To delete a bot simply delete it from Manage bots page, Bots property section. To delete your bot, click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card of the chatbot which you want to delete. You will be navigated to the "Manage Bots page". Scroll down and you will find Delete Bot button. Confirm the deletion to delete your chatbot. This frees up one bot from your allowed bots in your subscription tier.
                    </p>

                    <h3 id='modifybotprop' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Modify Bot Properties</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Various properties of a chatbot can be modified by the Client to customize it's working and user experience:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>Name of the Chatbot - Only used for recognizing the chatbot in Client's Admin Panel</li>
                            <li className='my-2'>The initial message which is shown by the chatbot on opening it.</li>
                            <li className='my-2'>Suggested Queries which are shown on by the chatbot when we initiallly open it. On clicking on one of these Queries, the query is sent to the chatbot and the chatbot answers it. The suggested queries then disappear. Suggested queries have to be separated by comma “,” to be recognized as a separate query. </li>
                            <li className='my-2'>Prompt of the chatbot. The prompt is the question that is way in which the question is framed and asked to the chatbot. An effective query can increase the chatbots likelihood of answering what we want and the way we want. During modifying prompt, care should be taken to not to change or remove “text” or “query” as these 2 are keywords important for the chatbot to function. “Text” is the relevant document found by the LLM used for answering the question and "Query" is the user's query.</li>
                        </ul>
                        To modify your bot properties, click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card of the chatbot which you want to modify. You will be navigated to the "Manage Bots page". Scroll down and you will find "You can update these properties ". Modify the properties as per instructions and then click on submit.
                    </p>

                    <h3 id='modifybotui' className='fw-bolder col-12 d-flex justify-content-start  text-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>Modify Bot Look</h3>
                    <p className=' col-11 flex-wrap d-flex justify-content-start me-auto  text-start pt-2 mb-2' style={{ color: '#FFFFFF' }}>
                    Zema Chabots appearance can be modified or customized in various ways in order to suit the client's taste and suit the websites appearance it will be embedded into. The chatbots can be modified in various ways including:
                    <ul className='col-11 my-2'>
                            <li className='my-2'>Font Style</li>
                            <li className='my-2'>Font Size</li>
                            <li className='my-2'>Background colour of the chatbots UI</li>
                            <li className='my-2'>Text colour of Users queries</li>
                            <li className='my-2'>Text colour of Chatbots responses</li>
                            <li className='my-2'>Background colour of chat bubble of users queries</li>
                            <li className='my-2'>Background colour of chat bubble of chatbots responses</li> 
                        </ul>
                        All these changes can be made from Manage Bots page, Demo chat section.
                        To modify the look of your bot, click on "My Chatbots" in the navbar. You will be navigated to my chatbots page which displays all the chatbots created by you. Click on "Details" button on the card of the chatbot which you want to modify the look of. You will be navigated to the "Manage Bots page". Go to the "Demo chat" section by clicking on it. Modify the properties as per instructions and then click on submit.The changes made can be previewed live from a demo bot UI present in the page. When the user is satisfied with the appearance changes, they can submit the changes to finalize them.
                    </p>

                </div>


            </div>

        </div>
    )
}

export default SectionOneGuide