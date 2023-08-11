import React, { useState } from 'react'
// import { AiFillCheckCircle, AiFillQuestionCircle } from 'react-icons/ai'
import Accordion from 'react-bootstrap/Accordion';
import './gradientCss.css'
import ChatUIDe from '../ChatUiDe';

const SectionTwoHome = () => {


  const zemaFAQ = [
    {
      key: 1,
      question: "What is Zema?",
      answer: "Zema is an AI CoPilot designed to assist small business owners, entrepreneurs, coaches, consultants, startup founders, and executives in enterprise companies. Our platform provides AI tools and widgets to streamline your day-to-day operational tasks, making them effortless and completed on time. We are currently starting with ChatBots for your website, utilizing your webcopy and ingested PDFs as the source. Additionally, we have plans to release at least one new widget every two months for the next year."
    },
    {
      key: 2,
      question: "Does Zema securely hold my data?",
      answer: "At Zema, we prioritize the security of your content and data. We store all information on secure and encrypted AWS servers. If you require an even higher level of security, we can customize the setup to work with your AWS servers or preferred storage locations as part of a Custom project."
    },
    {
      key: 3,
      question: "Who uses Zema?",
      answer: "Zema is currently being utilized by various businesses, including Insurance Agencies in Dallas, Dental offices in Houston, Law offices in Jersey City, and many others. If your business requires efficient customer query handling, we can connect with you and reduce the effort required to address those queries. We are also working on Twilio integration to make it easier using your Business phone Number."
    },
    {
      key: 4,
      question: "How is Zema different from other AI wrappers and chatbots available?",
      answer: "Zema is a product company that prioritizes customer satisfaction. We adopt a customer-first mentality and are flexible in customizing our product to meet your specific needs. We constantly refactor AI Tools' outcomes and inputs to focus on your success, one customer at a time."
    },
    {
      key: 5,
      question: "What is on the Roadmap for Zema after chatbots?",
      answer: "Zema will collaborate with the community to identify the most desired features and functions. Based on this feedback, we will define our roadmap accordingly. Our approach involves giving our customers and the community what they want, and we will crowdsource future feature development."
    },
    {
      key: 6,
      question: "Can I talk to a real human being if I have questions about Zema?",
      answer: "Absolutely! We set aside specific hours every week for our founders and development teams to address customer queries. Additionally, we plan to hold weekly town halls to answer questions and discuss the reasoning behind features and functions. As we continue to scale, we aim to have community ambassadors who will support and assist customers with their needs."
    }
  ];

  const [activeKey, setActiveKey] = useState(null);

  const handleAccordionChange = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <div style={{ backgroundColor: '#171725', height: '100%', width: '100vw' }} >
      <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      
      <h2 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-2' style={{ color: '#FFFFFF' }}>This chatbot's trained to answer questions about Zema.
Ask a question to get started.</h2>

          <ChatUIDe botID={'64d3821e75a48e9178d49106..'} />


        <h2 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF' }}>TRUSTED CUSTOMERS</h2>

        <div className='row mx-0 d-flex ' style={{ width: '100vw' }}>
          <div className='row mx-0 d-flex justify-content-around' >
            <div className='d-flex justify-content-around col-xxl-3 col-lg-7 col-sm-9 col-11 my-5'>
            <div className="card px-1" style={{width:'500px'}}>
              <div className="circular-image-container">
                <img className="circular-image" src='https://img.freepik.com/premium-photo/business-education-office-concept-portrait-smiling-businessman_380164-65299.jpg' alt="loading" />
              </div>
              <div className="card-content px-1 " style={{ height: '100%' }}>
                <p className='fs-4 col-12  d-flex justify-content-center container text-center'>"Works seamlessly as advertised."</p>
              </div>
              <div className='fs-4 col-12 d-flex justify-content-center  text-center ' style={{}}>
                <p className='fs-6   fw-bold ' style={{ color: 'orange' }} >Arden Milsowick </p>
                <p className=' fs-6 ms-3 ' >Dallas based Insurance Agency</p>
              </div>
            </div>
            </div>
<div className='d-flex justify-content-around col-xxl-3 col-lg-7 col-sm-9 col-11 my-5'>
            <div className="card px-1" style={{width:'500px'}}>
              <div className="circular-image-container">
                <img className="circular-image" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAtDFxX2Rehk2Jlnh-ALXcZqTQ2npj0kMNdQ&usqp=CAU' alt="loading" />
              </div>
              <div className="card-content px-1">
                <p className='fs-4 col-12 mb-4 d-flex justify-content-center container text-center'>"Chatbot works for my customers and supports our non-profit in answering basic questions"</p>
              </div>
              <div className='fs-4 col-12 d-flex justify-content-center container text-center mt-auto' style={{}}>
                <p className='fs-6   fw-bold' style={{ color: 'orange' }} >Aisha Duncan </p>
                <p className=' fs-6 ms-3 ' >Orlando Non-Profit in Womens/ Childrens space</p>
              </div>
            </div>
            </div>
            <div className='d-flex justify-content-around col-xxl-3 col-lg-7 col-sm-9 col-11 my-5'>
            <div className="card px-1 " style={{width:'500px'}}>
              <div className="circular-image-container">
                <img className="circular-image" src='https://format.creatorcdn.com/0eb8003e-5c43-4658-b86b-5fa281c59ad6/0/0/0/23,0,485,617,580,772/0-0-0/c4b47866-a545-4ce2-bc9f-dcf943b289c2/1/2/HS04.jpg?fjkss=exp=2005158694~hmac=aac5dff8f66a9a6112c79632ec508c456aefe00eef4328615b0f604a9b4a300e' alt="loading" />
              </div>
              <div className="card-content px-1">
                <p className='fs-4 col-12 mb-4 d-flex justify-content-center container text-center'>"Excited to learn what else Zema will launch in the coming months"</p>

              </div>
              <div className='fs-4 col-12 d-flex justify-content-center container text-center mt-auto' style={{}}>
                <p className='fs-6   fw-bold' style={{ color: 'orange' }} >Sharon Kingsley </p>
                <p className=' fs-6 ms-3 ' >Miami based PR Agency</p>
              </div>
            </div>
            </div>

          </div>
        </div>
      </div>


      <div className='fs-4 col-12 row d-flex justify-content-center text-center  mt-3 mx-1' style={{ color: '#FFFFFF', paddingBottom: '100px' }}>
        <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pb-5' style={{ color: '#FFFFFF' }}>FAQ</h1>

        {zemaFAQ.map((x) => (
          <Accordion
            key={x.key}
            activeKey={activeKey}
            onSelect={handleAccordionChange}
            className='col-11 my-3 custom-accordion '
          >
            <Accordion.Item eventKey={x.key} className='accordhov' style={{ backgroundColor: '#212529', border: 'none' }}>
              <Accordion.Header className=''>
                <h4>{x.question}</h4>
                <span style={{
                  color: '#FFE459',
                  position: 'absolute',
                  right: '25px', // Adjust this value to fine-tune the position
                  top: '50%',
                  fontSize: '34px',
                  transform: 'translateY(-50%)',
                }}>
                  {activeKey === x.key ? '-' : '+'}
                </span>
              </Accordion.Header>
              <Accordion.Body className='' style={{ color: 'white' }}>
                <p style={{ color: 'white' }} className="my-1">
                  {x.answer}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>

    </div>
  )
}

export default SectionTwoHome