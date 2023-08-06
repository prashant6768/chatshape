import React from 'react'
import {AiOutlineDatabase, AiOutlineApi} from 'react-icons/ai'
import {RiVoiceprintLine} from 'react-icons/ri'
import {BsShare} from 'react-icons/bs'
import {BiCustomize} from 'react-icons/bi'
import {MdOutlineIntegrationInstructions , MdOutlinePrivacyTip , MdSentimentVerySatisfied} from 'react-icons/md'
import {MdLanguage} from 'react-icons/md'
import Card from 'react-bootstrap/Card';
import f1 from '../../assets/feature1.PNG'
import f2 from '../../assets/feature2.PNG'
import f3 from '../../assets/feature3.PNG'

const SectionOneFeature = () => {
  return (
    <div div className='pb-5 px-3 ' style={{ backgroundColor: '#171725', height: '100%',minHeight:'100vh',width:'100vw' }}>
    <h1 className='fw-bolder col-12 d-flex justify-content-center  text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Key Features</h1>

{/* images and text */}

    <div className='d-flex justify-content-center row' style={{marginTop:'100px'}}>

    <div className='row col-lg-10 col-12 my-5'>
        <div className='col-lg-6 col-12'>
<img src={f1} style={{ width:'100%', height:'100%'}} alt="loading"/>
        </div>
        <div className='col-lg-6 col-12'>
        <h1 className=' col-12 d-flex justify-content-center justify-content-lg-start container text-center text-lg-start mt-4 mb-4' style={{ color: '#FFFFFF' }}><AiOutlineDatabase/> </h1>    
    <h1 className='fw-bolder col-12 d-flex justify-content-center justify-content-lg-start container text-center text-lg-start  mb-4' style={{ color: '#FFFFFF' }}>Create Powerful AI Knowledge Bases</h1>
    <p className=' col-12 d-flex justify-content-center justify-content-lg-start container text-center text-lg-start  mb-4' style={{ color: '#FFFFFF' }}>Upload multiple file types, websites, images and videos</p>
        </div>
    </div>

    <div className='row col-lg-10 col-12 my-5 '>
        <div className='col-lg-6 col-12 d-lg-block d-none'>
        <h1 className=' col-12 d-flex justify-content-center justify-content-lg-end container text-center text-lg-end mt-4 mb-4' style={{ color: '#FFFFFF' }}><RiVoiceprintLine/> </h1>    
    <h1 className='fw-bolder col-12 d-flex justify-content-center justify-content-lg-end container text-center text-lg-end  mb-4' style={{ color: '#FFFFFF' }}>Accessible and easy to use</h1>
    <p className=' col-12 d-flex justify-content-center justify-content-lg-end container text-center text-lg-end  mb-4' style={{ color: '#FFFFFF' }}>Speak to Zema rather than type, and listen to the responses as voice</p>
        </div>
        <div className='col-lg-6 col-12'>
<img src={f2} style={{ width:'100%', height:'100%'}} alt="loading"/>
        </div>
        <div className='col-lg-6 col-12 d-lg-none'>
        <h1 className=' col-12 d-flex justify-content-center justify-content-lg-end container text-center text-lg-end mt-4 mb-4' style={{ color: '#FFFFFF' }}><RiVoiceprintLine/> </h1>    
    <h1 className='fw-bolder col-12 d-flex justify-content-center justify-content-lg-end container text-center text-lg-end  mb-4' style={{ color: '#FFFFFF' }}>Accessible and easy to use</h1>
    <p className=' col-12 d-flex justify-content-center justify-content-lg-end container text-center text-lg-end  mb-4' style={{ color: '#FFFFFF' }}>Speak to Zema rather than type, and listen to the responses as voice</p>
        </div>
    </div>

    <div className='row col-lg-10 col-12 my-5'>
        <div className='col-lg-6 col-12'>
<img src={f3} style={{ width:'100%', height:'100%'}} alt="loading"/>
        </div>
        <div className='col-lg-6 col-12'>
        <h1 className=' col-12 d-flex justify-content-center justify-content-lg-start container text-center text-lg-start mt-4 mb-4' style={{ color: '#FFFFFF' }}><BsShare/> </h1>    
    <h1 className='fw-bolder col-12 d-flex justify-content-center justify-content-lg-start container text-center text-lg-start  mb-4' style={{ color: '#FFFFFF' }}>Share your AI chatbot</h1>
    <p className=' col-12 d-flex justify-content-center justify-content-lg-start container text-center text-lg-start  mb-4' style={{ color: '#FFFFFF' }}>One-click to share with friends, embed on your website, or create a chat bubble</p>
        </div>
    </div>
    </div>

{/* cards 1-3 */}

    <div className='d-flex justify-content-center row' style={{marginTop:'50px'}}>

    <h2 className='fw-bolder col-10 d-flex justify-content-center justify-content-lg-start  text-center text-lg-start pt-5 mb-4' style={{ color: '#FFFFFF' }}>And more</h2>

<div className='d-flex justify-content-center row'>

    <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459'  }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><BiCustomize/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>Customize the look and feel of your chatbot</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>Use custom logos, colors, fonts and styling on your unique chatbot</div>
      </div>
    </Card.Body>
  </Card>

  <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459' }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><MdOutlineIntegrationInstructions/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>Integration friendly</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>Connect with a wide range of applications</div>
      </div>
    </Card.Body>
  </Card>

  <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459' }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><MdLanguage/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>Powered by latest LLM technology</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>OpenAI’s most advanced LLM</div>
      </div>
    </Card.Body>
  </Card>

  <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459'  }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><MdOutlinePrivacyTip/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>Privacy & Security</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>At Zema, your data is secured using robust AWS encryption and privacy standards</div>
      </div>
    </Card.Body>
  </Card>

  <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459' }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><AiOutlineApi/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>API</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>Embed Zema’s power directly into your products</div>
      </div>
    </Card.Body>
  </Card>

  <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459' }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><MdSentimentVerySatisfied/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>Sentiment</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>Extract the meaning and emotion from your data</div>
      </div>
    </Card.Body>
  </Card>

  </div>


   </div>

{/* cards 4-6 */}

   {/* <div className='d-flex justify-content-center row' style={{marginTop:'100px'}}>

    <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459'  }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><MdOutlinePrivacyTip/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>Privacy & Security</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>At Zema, your data is secured using robust AWS encryption and privacy standards</div>
      </div>
    </Card.Body>
  </Card>

  <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459' }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><AiOutlineApi/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>API</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>Embed Zema’s power directly into your products</div>
      </div>
    </Card.Body>
  </Card>

  <Card style={{ backgroundColor: '#212529', border: '1px solid #FFE459' }} className='mx-xxl-2 mx-2 my-3 col-xl-3 col-lg-6 col-sm-8 col-11 d-flex rounded-4'>
    <Card.Body className="d-flex flex-column" style={{}}>
    <h1 className=' col-12 d-flex justify-content-center  container text-center  mt-4 mb-4' style={{ color: '#FFFFFF' }}><MdSentimentVerySatisfied/> </h1>        
      <Card.Title className='fw-bolder col-12 d-flex justify-content-center container text-center mb-1 mt-3 fs-3 text-break' style={{ color: '#FFFFFF' }}>Sentiment</Card.Title>      
      <div className="mt-auto">
      <div className=' col-12 d-flex justify-content-center container text-center mb-3 mt-5 fs-5 text-break' style={{ color: '#FFFFFF' }}>Extract the meaning and emotion from your data</div>
      </div>
    </Card.Body>
  </Card>

  </div> */}

  </div>
  )
}

export default SectionOneFeature