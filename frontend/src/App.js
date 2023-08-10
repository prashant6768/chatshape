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
import PaymentHistoryPage from './page/PaymentHistoryPage'
import FeaturePage from './page/FeaturesPage'
import ScrollToTop from './component/ScrollToTop'; 
// import jwt from 'jsonwebtoken'
import * as jose from 'jose'


import { decodeToken, getAccessToken } from './component/Auth'
import ManageBotPage from './page/ManageBotPage';
import TermsOfService from './page/TermsOfService';
import PrivacyPolicy from './page/PrivacyPolicy';



const App = () => {

  // useEffect(()=>{
  //   const currentPath = window.location.pathname;
  // console.log("aaaaaaaaaaaaaaaaaa",currentPath)
  
  
  // const specificPagePath = '/chatPage/64ca2d70c6e8de9e5d052d56';
  
  
  // if (currentPath === specificPagePath) {
  //   // Get the script element
  //   console.log("UUUUUUUu")
  //   const script = document.querySelector('script[src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-try-13/popup.js"]');
  //   console.log("yyyyyyyyyyyyyyyyyyyyyyy",script)
  //   if (script) {
  //     console.log("aaremove")
  //     script.remove();
  //   }else{
  //     console.log("NNNN")
  //   }
  // }
  // },[])

  return (
   <div>
     <BrowserRouter>
     <ScrollToTop/>
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
           <Route path ='/paymenthistory' element={<PrivateRoute><PaymentHistoryPage/></PrivateRoute>}/>
           <Route path ='/feature' element={<FeaturePage/>}/>


          
        </Routes>
        </BrowserRouter>
   </div>
  )
}

export default App
