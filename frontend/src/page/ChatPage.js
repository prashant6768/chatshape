import React,{useState, useEffect } from 'react'
import ChatUI from '../component/ChatUI'
import { useParams} from 'react-router-dom'

const ChatPage = () => {

  const {id}= useParams()

  useEffect(()=>{
        console.log("params is = ",id)
  },[])
 
  console.log("param from page is",)

  return (
    <div className="card col-12" style={{ maxWidth:'500px' }}>
        <ChatUI botID={id} />
    </div>
  )
}

export default ChatPage