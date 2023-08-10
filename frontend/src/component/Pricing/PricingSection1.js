import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AiFillCheckCircle, AiFillQuestionCircle } from 'react-icons/ai'
import axios from 'axios';
import * as jose from 'jose';
import '../Pricing/toggle.css'
import env from 'react-dotenv'
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Cookies from 'js-cookie';


const PricingSection1 = () => {

    // const token = document.cookie.split('=')[1]
    // const decoded = jose.decodeJwt(token, 'notmysecretkey');
    const decoded = Cookies.get('accessToken');

    const [selectedOption, setSelectedOption] = useState('A');
    const BACKEND = 'http://localhost:5000/'
    // const BACKEND = 'http://3.19.246.7/'
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };


    const dataCardsMonth = [
        {
            priceTier: 'Free',
            subscribe: false,
            one: '100 Tokens Per Month',
            two: '1 Chatbot or Business Ops Function',
            three: '10,000 Character Generations Max',
            four: 'Limited Knowledge Base',
            five: '',
            six: '',
            price: '0 USD/ ',
            month: 'month',
            key: ''
        },
        {
            priceTier: 'Simple',
            subscribe: true,
            one: '10,000 Tokens Per Month',
            two: '2 ChatBots or Business Ops',
            three: 'Unlimited Character Generations',
            four: 'Unlimited File Uploads',
            five: '',
            six: '',
            price: '100 USD/ ',
            month: 'month',
            key: 'month-simple'
        },
        {
            priceTier: 'Standard',
            subscribe: true,
            one: '100,000 Tokens Per Month',
            two: '10 ChatBots or Business ops',
            three: 'Audio and Speech Capable',
            four: 'Automated Integration',
            five: '',
            six: '',
            price: '250 USD/ ',
            month: 'month',
            key: 'month-standard'
        },
        {
            priceTier: 'Enterprise',
            subscribe: true,
            one: 'Unlimited Tokens',
            two: 'Unlimited ChatBots or Business Ops',
            three: 'Dedicated Automation manager',
            four: 'White Label Functions',
            five: 'ChatBot Branding',
            six: 'Priority Support',
            price: 'Contact Us For Pricing',
            month: '',
            key: 'month-pro'
        },

    ]

    const dataCardsYear = [
        {
            priceTier: 'Free',
            subscribe: false,
            one: '100 Tokens Per Month',
            two: '1 Chatbot or Business Ops Function',
            three: '10,000 Character Generations Max',
            four: 'Limited Knowledge Base',
            five: '',
            six: '',
            price: '0 USD/ ',
            month: 'month',
            key: ''
        },
        {
            priceTier: 'Simple',
            subscribe: true,
            one: '10,000 Tokens Per Month',
            two: '2 ChatBots or Business Ops',
            three: 'Unlimited Character Generations',
            four: 'Unlimited File Uploads',
            five: '',
            six: '',
            price: '80 USD/ ',
            month: 'month',
            key: 'year-simple'
        },
        {
            priceTier: 'Standard',
            subscribe: true,
            one: '100,000 Tokens Per Month',
            two: '10 ChatBots or Business ops',
            three: 'Audio and Speech Capable',
            four: 'Automated Integration',
            five: '',
            six: '',
            price: '200 USD/ ',
            month: 'month',
            key: 'year-standard'
        },
        {
            priceTier: 'Enterprise',
            subscribe: true,
            one: 'Unlimited Tokens',
            two: 'Unlimited ChatBots or Business Ops',
            three: 'Dedicated Automation manager',
            four: 'White Label Functions',
            five: 'ChatBot Branding',
            six: 'Priority Support',
            price: 'Contact Us For Pricing',
            month: '',
            key: 'year-pro'
        },
    ]

    const handleSub = async (key) => {
        console.log(key)
        await axios.post(`${BACKEND}stripepay/create-checkout-session`, { key, decoded }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }).then(res => { window.location.replace(res.data); console.log(res) }).catch(err => console.log("handle subscribe error = ", err))
    }


    return (
        <div style={{ backgroundColor: '#242439', height: '100%', width: '100vw' }}>
            <div className='   ' style={{ paddingTop: '50px', paddingBottom: '50px' }}>
                <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF' }}>Pricing</h1>

                <div className="toggle-button rounded-pill fw-bolder  d-flex justify-content-center container text-center" style={{ width: '200px' }}>
                    <button
                        className={`option ${selectedOption === 'A' ? 'selected rounded-pill' : ''}`}
                        onClick={() => handleOptionClick('A')}
                    >
                        Yearly
                    </button>
                    <button
                        className={`option ${selectedOption === 'B' ? 'selected rounded-pill' : ''}`}
                        onClick={() => handleOptionClick('B')}
                    >
                        Monthly
                    </button>
                </div>

                <div className='d-flex justify-content-center'>
                    <div className='d-flex  justify-content-center flex-wrap flex-row sectionwidth ' style={{}}>
                        {selectedOption === 'B' ? dataCardsMonth.map(x => (
                            <div className=' px-0 my-2 d-flex justify-content-center'>
                                <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%', width: '270px' }} className='mx-1 ms-4   mt-5 rounded-4'>

                                    <Card.Body>
                                        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-3 mt-3 fs-3' style={{ color: '#FFFFFF' }} >{x.priceTier}</Card.Title>
                                        <Card.Text className='fw-bolder fs-4 col-12 d-flex justify-content-center container text-start mb-3' style={{ color: '#FFFFFF' }}>{x.price}<p className='fs-5 mt-3 mb-4 ' style={{ color: 'lightgrey', fontWeight: 'normal' }}>{x.month}</p></Card.Text>
                                        {/* {x.subscribe ? (<Button onClick={(e)=>handleSub(e.target.value)} value={x.key} className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">Subscribe</Button>) : (<Button disabled className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor: '#620B84', visibility: 'hidden' }} variant="primary">Subscribe</Button>)} */}

                                        {decoded && x.subscribe ? (
                                            <Button
                                                onClick={(e) => handleSub(e.target.value)}
                                                value={x.key}
                                                className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5'
                                                style={{ color: '#FFFFFF', backgroundColor: '#620B84' }}
                                                variant="primary"
                                            >
                                                Subscribe
                                            </Button>
                                        ) : (
                                            <>
                                                {decoded ? (
                                                    <Button
                                                        disabled
                                                        className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5'
                                                        style={{ color: '#FFFFFF', backgroundColor: '#620B84', visibility: 'hidden' }}
                                                        variant="primary"
                                                    >
                                                        Subscribe
                                                    </Button>
                                                ) : (
                                                    <Link style={{ textDecoration: 'none' }} to="/login"><Button
                                                        value={x.key}
                                                        className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5'
                                                        style={{ color: '#FFFFFF', backgroundColor: '#620B84', textDecoration: 'none' }}
                                                        variant="primary"
                                                    >
                                                        Subscribe
                                                    </Button></Link>
                                                )}
                                            </>
                                        )}

                                        <Card.Text className='fw-bolder fs-5 col-12 d-flex justify-content-start container text-start mb-5' style={{ color: '#FFFFFF' }}>
                                            What is included :
                                        </Card.Text>
                                        <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} >
                                            <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} /> {x.one}
                                        </Card.Text>
                                        <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} >
                                            <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.two}
                                        </Card.Text>
                                        <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} >
                                            <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.three}
                                        </Card.Text>
                                        <Card.Text className=' col-12  container text-start mb-4 break-words ' style={{ color: 'lightgrey' }} >
                                            <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.four}
                                        </Card.Text>
                                        {x.five === '' ? '' :
                                            <>
                                                <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} >
                                                    <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.five}
                                                </Card.Text>
                                                <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} >
                                                    <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.six}
                                                </Card.Text>
                                            </>
                                        }
                                    </Card.Body>
                                </Card>
                            </div>

                        )) :

                            dataCardsYear.map(x => (
                                <div className=' px-0 my-2 d-flex justify-content-center'>
                                    <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%', width: '270px' }} className='mx-1 ms-4   mt-5 rounded-4'>
                                        <Card.Body>
                                            <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-3 mt-3 fs-3' style={{ color: '#FFFFFF' }} >{x.priceTier}</Card.Title>
                                            <Card.Text className='fw-bolder fs-4 col-12 d-flex justify-content-center container text-start mb-3' style={{ color: '#FFFFFF' }}>{x.price}<p className='fs-5 mt-3 mb-4' style={{ color: 'lightgrey', fontWeight: 'normal' }}>{x.month}</p></Card.Text>
                                            {/* {x.subscribe ? <Button  onClick={(e)=>handleSub(e.target.value)} value={x.key} className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">Subscribe</Button> : <Button disabled className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor: '#620B84', visibility: 'hidden' }} variant="primary">Subscribe</Button>} */}


                                            {decoded && x.subscribe ? (
                                                <Button
                                                    onClick={(e) => handleSub(e.target.value)}
                                                    value={x.key}
                                                    className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5'
                                                    style={{ color: '#FFFFFF', backgroundColor: '#620B84' }}
                                                    variant="primary"
                                                >
                                                    Subscribe
                                                </Button>
                                            ) : (
                                                <>
                                                    {decoded ? (
                                                        <Button
                                                            disabled
                                                            className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5'
                                                            style={{ color: '#FFFFFF', backgroundColor: '#620B84', visibility: 'hidden' }}
                                                            variant="primary"
                                                        >
                                                            Subscribe
                                                        </Button>
                                                    ) : (
                                                        <Link style={{ textDecoration: 'none' }} to="/login"><Button
                                                            value={x.key}
                                                            className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5'
                                                            style={{ color: '#FFFFFF', backgroundColor: '#620B84', textDecoration: 'none' }}
                                                            variant="primary"
                                                        >
                                                            Subscribe
                                                        </Button></Link>
                                                    )}
                                                </>
                                            )}

                                            <Card.Text className='fw-bolder fs-5 col-12 d-flex justify-content-start container text-start mb-5' style={{ color: '#FFFFFF' }}>
                                                What is included :
                                            </Card.Text>
                                            <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} t>
                                                <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} /> {x.one}
                                            </Card.Text>
                                            <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} t>
                                                <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.two}
                                            </Card.Text>
                                            <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} t>
                                                <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.three}
                                            </Card.Text>
                                            <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} t>
                                                <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.four}
                                            </Card.Text>
                                            {x.five === '' ? '' :
                                                <>
                                                    <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} t>
                                                        <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.five}
                                                    </Card.Text>
                                                    <Card.Text className=' col-12  container text-start mb-4 break-words' style={{ color: 'lightgrey' }} t>
                                                        <AiFillCheckCircle className='mb-1 me-2' style={{ color: 'yellow' }} />{x.six}
                                                    </Card.Text>
                                                </>
                                            }
                                        </Card.Body>
                                    </Card>
                                </div>

                            ))

                        }

                        {/* <div className=' px-0 my-2 d-flex justify-content-center'>
                    <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%', width:'270px' }} className='mx-1 ms-4   mt-5 rounded-4'>
                            <Card.Body>
                                <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-3 mt-3 fs-3' style={{ color: '#FFFFFF' }} >Enterprise</Card.Title>
                                <Card.Text className='fw-bolder fs-1 col-12 d-flex justify-content-center container text-start mb-3' style={{ color: '#FFFFFF' }}><p className='fs-5 mt-3 ' style={{ color: 'lightgrey', fontWeight: 'normal' }}>For Custom chatbot tailored to your needs</p></Card.Text>


                            </Card.Body>
                        </Card>
                    </div> */}
                    </div>
                </div>
                <div style={{ paddingTop: '50px', marginTop: '100px' }}>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pb-5' style={{ color: '#FFFFFF', borderBottom: '2px solid grey' }}>Pricing FAQ</h1>
                    <div className='col-lg-10 row col-12 d-flex justify-content-center mx-auto'>
                        <div className='col-lg-5 col-10 me-lg-4   '>
                            <p className='fw-bold fs-5 col-12 container  break-words text-start mt-2 ' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />What is counted towards a Token?</p>
                            <p className=' col-12 d-flex justify-content-start container text-start' style={{ color: '#FFFFFF' }}>A Token is a combination of the Knowledgebase documents and websites ingested combined with number of queries and interaction using that knowledgebase.</p>

                            <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />What happens if I exceed my Token Limit for the month?</p>
                            <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>You can buy additional tokens by adding same number of Tokens in that plan for 80% of the cost of the Plan.</p>

                            <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />Can I upgrade my plan after getting a lower tier?</p>
                            <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Yes, you can upgrade to the next level for the next month. </p>





                        </div>
                        <div className='col-lg-5 col-10  ms-lg-4'>
                            <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />How do I know how many tokens I have remaining and when I should be buying more?</p>
                            <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>We will constantly showcase inside your profile the Token Usage on a real time basis and will warn you by email when you are 80% near the limit so you can go in and fill up your tokens.</p>

                            <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />Can I update my bots prompt and start message before I embed it on my website?</p>
                            <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Yes! You can update both the prompt and start message, and tune it over time to customize your bot as you wish.</p>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default PricingSection1