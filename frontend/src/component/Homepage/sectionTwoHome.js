import React from 'react'
import {AiFillCheckCircle ,AiFillQuestionCircle} from 'react-icons/ai'

const sectionTwoHome = () => {
  return (
   <div style={{backgroundColor:'#242439', height:'100%', width:'100vw'}}>
      <div style={{ paddingTop:'100px', paddingBottom:'100px' }}>
            <h2  className='fw-bolder col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>TRUSTED CUSTOMERS</h2>
            <div className='row' style={{width:'100vw'}}>
            <div className='pt-5 col-lg-4 col-12'>
                <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight:'1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
            </div>
            <div className='pt-5 col-lg-4 col-12'>
                <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight:'1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
            </div>
            <div className='pt-5 col-lg-4 col-12'>
                <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight:'1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
            </div>
            </div>
      </div>


      <div style={{ paddingTop:'50px', marginTop:'100px'}}>
                    <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pb-5' style={{ color: '#FFFFFF', borderBottom:'2px solid grey' }}>FAQ</h1>
                  <div className='col-lg-10 row col-12 d-flex justify-content-center  mx-auto'>
                     <div className='col-lg-5 col-10 me-lg-4 flex-wrap  '>
                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2 ' style={{ color: '#FFFFFF'}}>What is chatbot?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>chatbot lets you build AI powered chatbots for your website. Just go to chatbot.com/create, add your website link which will be crawled, and the text will be used to train a chatbot that you can embed on your website to answer customer queries and save you hundreds of hours of time.</p>
                        
                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>What happens when I use my website link to create a bot? What info does the bot read?</p> 
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>Using chatbot.com/create , The crawler will grab all the visible, copyable text that is available on the current web page. The crawler will show you all the links it extracted, and if you are satisfied, there will be a button you can click to generate your chatbot from those sources. This will output a script tag that you can add to your websites HTML, and your chatbot will now be added to your website.</p>

                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>Where is my web page stored?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>chatbot does not store your webpage, only the text content of the web page is stored in an encrypted format on secure AWS servers.</p>
 
                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>Does chatbot chrome extension work on any web page?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>It works on most pages tested. It even works on private wiki pages like Quip, Confluence, Jira, and Notion. chatbot does not work with Google Docs.</p>     

                     </div>
                     <div className='col-lg-5 col-10  ms-lg-4'>
                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>Can I view chatbot analytics and how many people chat with the bot?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>Yes you can! All chatbot messages are recorded in your chatbot dashboard and can be viewed.</p>

                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>Can I update how my bot responds to customer requests before I embed it on my website?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>Yes! You can update both the prompt and start message, and tune it over time to customize your bot to respond to customers as you wish.</p>
                         
                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>What is the maximum number of sources I can create a bot from?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>The max number of web sources depends on your plan, each pages text character count is used to measure the size of a web source.</p>
                         
                        <p className='fw-bold fs-5 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF'}}>Can I add custom data to my bot beyond just scraping my website?</p>
                        <p className=' col-12 d-flex justify-content-start container text-startr ' style={{ color: '#FFFFFF'}}>You can add some custom data to your chatbot by adding the info you want the bot to know to your prompt on the chatbot manage settings page. If you would like to add a large amount of data or a custom integration for your datasource, please email james@chatbot.com.</p>
                        {/* <AiFillQuestionCircle size={20} className='me-2 mt-1'/> */}
                     </div>
                  </div>
                </div>

                <div style={{ paddingTop:'100px', paddingBottom:'100px' }}>
            <h2  className='fw-bolder col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>TRUSTED CUSTOMERS</h2>
            <div className='row px-0' style={{width:'100vw'}}>
            <div className='pt-5 px-0' >
                <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight:'1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
            </div>
            <div className='pt-5 '>
                <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight:'1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
            </div>
            <div className='pt-5 '>
                <p className='fs-3 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}>"This is Great"</p>
                <div className='fs-4 col-12 d-flex justify-content-center container text-center' style={{ color: '#FFFFFF' }}><p className='px-3' style={{ borderRight:'1px solid white' }}>Name</p><p className='mx-3'>Company</p></div>
            </div>
            </div>
      </div>

   </div>
  )
}

export default sectionTwoHome