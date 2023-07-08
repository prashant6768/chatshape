import React, { useState, useEffect } from 'react'
import  { useContext } from 'react';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Home from './page/Home'
import ChatPage from './page/ChatPage'
import PricingPage from './page/PricingPage'
import AccountPage from './page/AccountPage'
import CreateBot from './page/CreateBot'
import MyChatbotsPage from './page/MyChatbotsPage'
import Login from './page/Login';
import Signup from './page/Signup';
import BlogPage from './page/BlogPage';
import PrivateRoute from './component/PrivateRoute';
import BlogIndiPage from './page/BlogIndiPage';
import SuccessPage from './page/SuccessPage';
import CancelPage from './page/CancelPage';
// import jwt from 'jsonwebtoken'
import * as jose from 'jose'


import { decodeToken, getAccessToken } from './component/Auth'
import ManageBotPage from './page/ManageBotPage';
import TermsOfService from './page/TermsOfService';
import PrivacyPolicy from './page/PrivacyPolicy';



const App = () => {

useEffect(()=>{

 console.log(document.cookie.split('=')[1])

})

  return (
   <div>
     <BrowserRouter>
           <Routes>
           <Route path='/' element={<Home/>}  />
           <Route path='/pricing' element={<PricingPage/>}/>
           <Route path='/account' element={<PrivateRoute><AccountPage/></PrivateRoute>}/>
           <Route path='/chatpage/:id' element={<ChatPage/>}/>
           <Route path='/create' element={<PrivateRoute><CreateBot/></PrivateRoute>}/>
           <Route path='/mychatbots' element={<PrivateRoute><MyChatbotsPage/></PrivateRoute>}/>
           <Route path='/managebots/:id' element={<PrivateRoute><ManageBotPage/></PrivateRoute>}/> 
           <Route path='/blog' element={<BlogPage/>}/> 
           <Route path='/blog/:id' element={<BlogIndiPage/>}/> 
           <Route path='/terms' element={<TermsOfService/>}/> 
           <Route path='/privacy' element={<PrivacyPolicy/>}/> 
           <Route path ='/login' element={<Login/>}/>
           <Route path ='/signup' element={<Signup/>}/>
           <Route path ='/SuccessPage' element={<PrivateRoute><SuccessPage/></PrivateRoute>}/>
           <Route path ='/CancelPage' element={<PrivateRoute><CancelPage/></PrivateRoute>}/>

          
        </Routes>
        </BrowserRouter>
   </div>
  )
}

export default App
