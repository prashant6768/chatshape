import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

const AccountSection1 = () => {
    return (
        <div className='pb-5' style={{ backgroundColor: '#242439', height: '100%',width:'100vw' }}>
            <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-5' style={{ color: '#FFFFFF' }}>Account</h1>
            <p className=' col-12 d-flex justify-content-center container fs-5 text-center mb-5' style={{ color: '#FFFFFF' }}>Your Account</p>
            <div className=' mt-2 d-flex justify-content-center pb-3'>
                <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%' }} className='mx-3 mt-3 rounded-4 col-lg-6 col-11'>
                    <Card.Body className=' d-flex row justify-content-between'>
                        <div className='d-flex col-lg-8 col-12 justify-content-start row '>
                            <Card.Text className='fw-bolder fs-5 col-sm-8 col-12 d-flex justify-content-lg-start justify-content-center container text-start me-auto mb-3' style={{ color: '#FFFFFF' }}>Manage subscription</Card.Text>
                            <Card.Text className=' fs-5 col-sm-8 col-12 d-flex justify-content-lg-start justify-content-center container text-lg-start text-center mb-3' style={{ color: '#FFFFFF' }}>Update your subscription to Chatbot
                                You are currently on the basic plan
                                Email: aniketshival007@gmail.com</Card.Text>
                        </div>
                        <Button className='fw-bolder  fs-3 col-sm-4 col-12 d-flex justify-content-center container text-center py-5 my-auto mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">GO PRO</Button>
                    </Card.Body>
                </Card>  
            </div>

            <div className=' mt-2 d-flex justify-content-center pb-5'>
                <Card style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0', height: '100%' }} className='mx-3 mt-5 p-2 rounded-4 col-lg-6 col-11'>
                    <p className='fw-bolder fs-5 col-12 d-flex justify-content-center container text-center mb-3 pb-3' style={{ color: '#FFFFFF' }}>Manage your Chatbots</p>
                    <div className='row d-flex justify-content-between'>
                   <Link to='/create' style={{textDecoration:'none'}}> <Button className='fw-bolder fs-4 col-sm-4 col-8 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">Create Chatbot</Button></Link>
                   <Link to='/mychatbots' style={{textDecoration:'none'}}><Button className='fw-bolder fs-4 col-sm-4 col-8 d-flex justify-content-center container text-center py-2 mb-1' style={{ color: '#FFFFFF', backgroundColor: '#620B84' }} variant="primary">View Chatbot</Button></Link>
                    
                    </div>
                </Card> 
            </div>
            <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5' style={{ color: '#FFFFFF' }}>After Extension Install :</h1>
            <p className=' col-12 d-flex justify-content-center container fs-5 text-center mb-2' style={{ color: '#FFFFFF' }}>1. Open the extension by clicking on the pinned chrome extension icon</p>
            <p className=' col-12 d-flex justify-content-center container fs-5 text-center pb-5' style={{ color: '#FFFFFF' }}>2. Click on the robot emoji in the extension popup, while you are on your chatshape account page. Thats it!</p>
            
        </div>
    )
}

export default AccountSection1