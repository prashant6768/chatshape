import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {AiFillCheckCircle ,AiFillQuestionCircle} from 'react-icons/ai'
import '../Pricing/toggle.css'

const PricingSection1 = () => {

    const [selectedOption, setSelectedOption] = useState('A');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

   
   const dataCardsMonth = [
        {
            priceTier:'Free',
            subscribe:false,
            one:'20 messages/month',
            two:'2 chatbot generations',
            three:'20,000 characters/chatbot',
            four:'Chatbot gets deleted after 5 days of inactivity',
            five:'',
            six:'',
            price:'0$/',
            month:'month'
        },
        {
            priceTier:'Hobby',
            subscribe:true,
            one:'500 messages/month',
            two:'10 chatbot generations',
            three:'500,000 characters/chatbot',
            four:'Embed chatbot on any website',
            five:'',
            six:'',
            price:'19$/',
            month:'month'
        },
        {
            priceTier:'Standard',
            subscribe:true,
            one:'4000 messages/month',
            two:'25 chatbot generations',
            three:'5,000,000 characters/chatbot',
            four:'Embed chatbot on any website',
            five:'',
            six:'',
            price:'39$/',
            month:'month'
        },
        {
            priceTier:'Pro',
            subscribe:true,
            one:'30,000 messages/month',
            two:'50 chatbot generations',
            three:'10,000,000 characters/chatbot',
            four:'Embed chatbot on any website',
            five:'Remove "Powered by Name"',
            six:'Priority Support',
            price:'300$/',
            month:'month'
        },
      
    ]

    const dataCardsYear = [
        {
            priceTier:'Free',
            subscribe:false,
            one:'20 messages/month',
            two:'2 chatbot generations',
            three:'20,000 characters/chatbot',
            four:'Chatbot gets deleted after 5 days of inactivity',
            five:'',
            six:'',
            price:'0$/',
            month:'year'
        },
        {
            priceTier:'Hobby',
            subscribe:true,
            one:'500 messages/month',
            two:'10 chatbot generations',
            three:'500,000 characters/chatbot',
            four:'Embed chatbot on any website',
            five:'',
            six:'',
            price:'200$/',
            month:'year'
        },
        {
            priceTier:'Standard',
            subscribe:true,
            one:'4000 messages/month',
            two:'25 chatbot generations',
            three:'5,000,000 characters/chatbot',
            four:'Embed chatbot on any website',
            five:'',
            six:'',
            price:'400$/',
            month:'year'
        },
        {
            priceTier:'Pro',
            subscribe:true,
            one:'30,000 messages/month',
            two:'50 chatbot generations',
            three:'10,000,000 characters/chatbot',
            four:'Embed chatbot on any website',
            five:'Remove "Powered by Name"',
            six:'Priority Support',
            price:'3000$/',
            month:'year'
        },
        ]


    return (
        <div style={{ backgroundColor: '#242439', height: '100%',width:'100vw' }}>
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

                <div className='d-flex justify-content-around row' style={{width:'100vw'}}>
                    { selectedOption === 'B'?  dataCardsMonth.map(x=>(
                        <div className=' col-xxl-2  col-xl-5 col-md-5 col-sm-8 col-12 my-2'>
                    <Card style={{  backgroundColor: '#212529', border: '1px solid #4A5AB0', height:'100%' }} className='mx-1 mx-xxl-0 mt-5 rounded-4'>
                        <Card.Body>
                            <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-3 mt-3 fs-3' style={{ color: '#FFFFFF' }} >{x.priceTier}</Card.Title>
                           <Card.Text className='fw-bolder fs-1 col-12 d-flex justify-content-center container text-start mb-3' style={{ color: '#FFFFFF' }}>{x.price}<p className='fs-5 mt-3 ' style={{color:'lightgrey',fontWeight:'normal'}}>{x.month}</p></Card.Text>
                           {x.subscribe ? <Button  className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor:'#620B84' }}  variant="primary">Subscribe</Button>:<Button disabled className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor:'#620B84',visibility:'hidden' }}  variant="primary">Subscribe</Button>}
                            <Card.Text className='fw-bolder fs-5 col-12 d-flex justify-content-start container text-start mb-5' style={{ color: '#FFFFFF' }}>
                                What is included :
                            </Card.Text>
                            <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                                <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/> {x.one}
                            </Card.Text>
                            <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                                <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.two}
                            </Card.Text>
                            <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                                <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.three}
                            </Card.Text>
                            <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                                <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.four}
                            </Card.Text>
                            { x.five === ''? '':
                                <>
                            <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                                <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.five}
                            </Card.Text>
                            <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                                <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.six}
                            </Card.Text>
                            </>
}
                        </Card.Body>
                    </Card>
                    </div>
                   )) :
                   dataCardsYear.map(x=>(
                    <div className='col-xxl-2  col-xl-5 col-md-5 col-sm-8 col-12 my-2'>
                <Card style={{  backgroundColor: '#212529', border: '1px solid #4A5AB0', height:'100%' }} className='mx-1 mx-xxl-0 mt-5 rounded-4'>
                    <Card.Body>
                        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-3 mt-3 fs-3' style={{ color: '#FFFFFF' }} >{x.priceTier}</Card.Title>
                       <Card.Text className='fw-bolder fs-1 col-12 d-flex justify-content-center container text-start mb-3' style={{ color: '#FFFFFF' }}>{x.price}<p className='fs-5 mt-3 ' style={{color:'lightgrey',fontWeight:'normal'}}>{x.month}</p></Card.Text>
                       {x.subscribe ? <Button  className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor:'#620B84' }}  variant="primary">Subscribe</Button>:<Button disabled className='fw-bolder col-sm-8 col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF', backgroundColor:'#620B84',visibility:'hidden' }}  variant="primary">Subscribe</Button>}
                        
                        <Card.Text className='fw-bolder fs-5 col-12 d-flex justify-content-start container text-start mb-5' style={{ color: '#FFFFFF' }}>
                            What is included :
                        </Card.Text>
                        <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                            <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/> {x.one}
                        </Card.Text>
                        <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                            <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.two}
                        </Card.Text>
                        <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                            <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.three}
                        </Card.Text>
                        <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                            <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.four}
                        </Card.Text>
                        { x.five === ''? '':
                            <>
                        <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                            <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.five}
                        </Card.Text>
                        <Card.Text className=' col-12 d-flex justify-content-start container text-start mb-4' style={{ color: 'lightgrey' }}t>
                            <AiFillCheckCircle className='mt-1 me-2' style={{color:'yellow'}}/>{x.six}
                        </Card.Text>
                        </>
}
                    </Card.Body>
                </Card>
                </div>
               ))
                    }
                   
                    <div className='col-xxl-2  col-xl-5 col-md-5 col-sm-8 col-12 my-2'>
                <Card style={{  backgroundColor: '#212529', border: '1px solid #4A5AB0', height:'100%' }} className='mx-xxl-0 mx-1 mt-5 rounded-4'>
                    <Card.Body>
                        <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-3 mt-3 fs-3' style={{ color: '#FFFFFF' }} >Enterprise</Card.Title>
                       <Card.Text className='fw-bolder fs-1 col-12 d-flex justify-content-center container text-start mb-3' style={{ color: '#FFFFFF' }}><p className='fs-5 mt-3 ' style={{color:'lightgrey',fontWeight:'normal'}}>For Custom chatbot tailored to your needs</p></Card.Text>
                       

                    </Card.Body>
                </Card>
                </div>
                </div>
                <div style={{ paddingTop:'50px', marginTop:'100px'}}>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pb-5' style={{ color: '#FFFFFF', borderBottom:'2px solid grey' }}>Pricing FAQ</h1>
                  <div className='col-lg-10 row col-12 d-flex justify-content-center mx-auto'>
                     <div className='col-lg-5 col-10 me-lg-4   '>
                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2 ' style={{ color: '#FFFFFF'}}>What counts as a chatbot generation?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>Anytime you add some web sources and click "Generate Bot from Sources", a link is created to your new chatbot. This counts as one chatbot generation.</p>
                        
                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>What counts as one message?</p> 
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>One message is text you send to the chatbot that receives a response.</p>

                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>Can I upgrade my plan after getting a lower tier?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>Yes! You can upgrade your plan for the next month at any time after purchase.If you would like to upgrade right away instead of at the time of next invoice, just email us at ---- and we will be happy to help.</p>




                        
                     </div>
                     <div className='col-lg-5 col-10  ms-lg-4'>
                     <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>How do I know how many characters are in my sources total?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>If you are creating a chatbot by crawling a website link, from chatshape.com/create when you click "Crawl Site" it will show you the character count and the crawled links.If you are using the chrome extension, Once you click the "Add Sources" button to add your preferred number of web sources to the bot, click the refresh icon next to "Web Sources". It will show you the character count before you click "Generate Bot from sources".</p>

                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>Can I update my bots prompt and start message before I embed it on my website?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>Yes! You can update both the prompt and start message, and tune it over time to customize your bot as you wish.</p>

                     </div>
                  </div>
                </div>

            </div>
        </div>
    )
}

export default PricingSection1