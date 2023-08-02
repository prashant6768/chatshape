import React,{useState, useEffect} from 'react'
import { AiFillCheckCircle, AiFillQuestionCircle } from 'react-icons/ai'
import Accordion from 'react-bootstrap/Accordion';

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
        <div style={{ backgroundColor: '#242439', height: '100%', width: '100vw' }} >
            <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                <h2 className='fw-bolder col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>TRUSTED CUSTOMERS</h2>

<div className='row mx-0 d-flex ' style={{ width: '100vw', minHeight:'400px' }}>
  <div className='row mx-0 d-flex ' >
  <div className='pt-5 col-xxl-4 col-12 d-flex justify-content-center' >
    <div className="d-flex flex-column h-100 py-3 rounded-4" style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', maxWidth:'550px' }}>
      <p className='fs-3 col-12 d-flex justify-content-center container text-center ' style={{ color: '#FFFFFF' }}>"Works seamlessly as advertised."</p>
      <div className='fs-4 col-12 d-flex justify-content-center container text-center mt-auto' style={{ color: '#FFFFFF' }}>
        <p className='px-3 col-6 mt-auto' >Arden Milsowick</p>
        <p className='mx-3 col-6 mt-auto' style={{ borderLeft: '1px solid white' }}>Dallas based Insurance Agency</p>
      </div>
    </div>
  </div>
  <div className='pt-5 col-xxl-4 col-12 d-flex justify-content-center '>
    <div className="d-flex flex-column h-100 py-3 rounded-4" style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', maxWidth:'550px' }}>
      <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"Chatbot works for my customers and supports our non-profit in answering basic questions"</p>
      <div className='fs-4 col-12 d-flex justify-content-center container text-center mt-auto' style={{ color: '#FFFFFF' }}>
        <p className='px-3 col-6 mt-auto' >Aisha Duncan</p>
        <p className='mx-3 col-6 mt-auto' style={{ borderLeft: '1px solid white' }}>Orlando Non-Profit in Womens/ Childrens space</p>
      </div>
    </div>
  </div>
  <div className='pt-5 col-xxl-4 col-12 d-flex justify-content-center'>
    <div className="d-flex flex-column h-100 py-3 rounded-4" style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0' , maxWidth:'550px'}}>
      <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"Excited to learn what else Zema will launch in the coming months"</p>
      <div className='fs-4 col-12 d-flex justify-content-center container text-center mt-auto' style={{ color: '#FFFFFF' }}>
        <p className='px-3 col-6 mt-auto' >Sharon Kingsley</p>
        <p className='mx-3 col-6 mt-auto' style={{ borderLeft: '1px solid white' }}>Miami based PR Agency</p>
      </div>
    </div>
  </div>
</div>
</div>
            </div>


            {/* <div style={{ paddingTop: '50px', marginTop: '100px' }}>
                <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pb-5' style={{ color: '#FFFFFF', borderBottom: '2px solid grey' }}>FAQ</h1>
                <div className='col-lg-10 row col-12 d-flex justify-content-center  mx-auto'>
                    <div className='col-lg-5 col-10 me-lg-4 flex-wrap  '>
                        <p className='fw-bold fs-5 col-12 container  break-words text-start mt-2 ' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />What is chatbot?</p>
                        <p className=' col-12 d-flex justify-content-start container text-start' style={{ color: '#FFFFFF' }}>chatbot lets you build AI powered chatbots for your website. Just go to chatbot.com/create, add your website link which will be crawled, and the text will be used to train a chatbot that you can embed on your website to answer customer queries and save you hundreds of hours of time.</p>

                        <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />What happens when I use my website link to create a bot? What info does the bot read?</p>
                        <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Using chatbot.com/create , The crawler will grab all the visible, copyable text that is available on the current web page. The crawler will show you all the links it extracted, and if you are satisfied, there will be a button you can click to generate your chatbot from those sources. This will output a script tag that you can add to your websites HTML, and your chatbot will now be added to your website.</p>

                        <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />Where is my web page stored?</p>
                        <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>chatbot does not store your webpage, only the text content of the web page is stored in an encrypted format on secure AWS servers.</p>

                        <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />Does chatbot chrome extension work on any web page?</p>
                        <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>It works on most pages tested. It even works on private wiki pages like Quip, Confluence, Jira, and Notion. chatbot does not work with Google Docs.</p>

                    </div>
                    <div className='col-lg-5 col-10  ms-lg-4'>
                        <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />Can I view chatbot analytics and how many people chat with the bot?</p>
                        <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Yes you can! All chatbot messages are recorded in your chatbot dashboard and can be viewed.</p>

                        <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />Can I update how my bot responds to customer requests before I embed it on my website?</p>
                        <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Yes! You can update both the prompt and start message, and tune it over time to customize your bot to respond to customers as you wish.</p>

                        <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />What is the maximum number of sources I can create a bot from?</p>
                        <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>The max number of web sources depends on your plan, each pages text character count is used to measure the size of a web source.</p>

                        <p className='fw-bold fs-5 col-12 container break-words  text-start mt-2' style={{ color: '#FFFFFF' }}><AiFillQuestionCircle className='me-2 mb-1' />Can I add custom data to my bot beyond just scraping my website?</p>
                        <p className=' col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>You can add some custom data to your chatbot by adding the info you want the bot to know to your prompt on the chatbot manage settings page. If you would like to add a large amount of data or a custom integration for your datasource, please email james@chatbot.com.</p>
                       
                    </div>
                </div>
            </div> */}

<div className='fs-4 col-12 row d-flex justify-content-center text-center  mt-3 mx-1' style={{ color: '#FFFFFF', paddingBottom:'100px' }}>
<h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pb-5' style={{ color: '#FFFFFF' }}>FAQ</h1>

      {zemaFAQ.map((x) => (
        <Accordion
          key={x.key}
          activeKey={activeKey}
          onSelect={handleAccordionChange}
          className='col-11 my-2 custom-accordion'
        >
          <Accordion.Item eventKey={x.key} style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0' }}>
            <Accordion.Header>
              <h4>{x.question}</h4>
            </Accordion.Header>
            <Accordion.Body style={{ color: 'white' }}>
              <p style={{ color: 'white' }} className="my-1">
                {x.answer}
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>

            {/* <div style={{ paddingTop: '100px', paddingBottom: '100px', width: '100vw' }}>
                <h2 className='fw-bolder col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>TRUSTED CUSTOMERS</h2>
                <div className='row px-0 mx-0' style={{ width: '100vw' }}>
                    <div className='pt-5 px-0' >
                        <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                        <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight: '1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
                    </div>
                    <div className='pt-5 '>
                        <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                        <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight: '1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
                    </div>
                    <div className='pt-5 '>
                        <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                        <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight: '1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default SectionTwoHome