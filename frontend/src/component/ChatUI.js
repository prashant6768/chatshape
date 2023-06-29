import React, { useEffect, useState } from 'react';
import '../css/chatCss.css'
// import * as jose from 'jose';
import axios  from 'axios'
import {ThreeDots} from 'react-loader-spinner';


function TypingEffect({ text }) {
  const delay = 20;

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prevText => prevText + text.charAt(currentIndex));
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text]);

  return <div>{displayedText}</div>;
}


const ChatUI = (botID) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatbotMsg,setChatbotMsg]= useState('Ask what you want')
  const[loading, setLoading] = useState(false);

  const handleInputChange = async(e) => {
    await setInputValue(e.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'me',
    };

     setMessages((prevMessages) => [...prevMessages, newMessage]);
     setLoading(true); 
    axios.post("http://127.0.0.1:5000/api/msg",{inputValue,botID},{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  }).then(res => {setChatbotMsg(res.data[0]); setLoading(false) })
  };

useEffect(()=>{   
        const newMessage = {
            id: messages.length + 1,
            text: chatbotMsg,
            sender: '',
          }; 
          if(chatbotMsg === '' && chatbotMsg === null && chatbotMsg === []){
            console.log("W")
          }else{
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
          setInputValue('');
          setChatbotMsg('')
 
},[chatbotMsg])


  return (
    <>
    <div className="chat-container" style={{ backgroundColor:'#242439', height:'95vh',paddingBottom:'100px'}}>
      <div className="chat-messages " >
        {messages.map((message) => (
            message.text === ''|| null || undefined ? '':
          <div
            key={message.id}
            className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
          >
               {/* <div id="text-container" className="message-content typing">{message.text}</div> */}
               <TypingEffect  id="text-container" className="message-content " text={message.text} />
          </div>
        ))}
         {loading ? (
            <ThreeDots  type="Oval" position="top-center" color="#3D4648" height={50} width={50} />
           
          ) : (
            ''
          )}
      </div> 
    </div>
    <form className="chat-input mt-5" style={{ minHeight:'50px',height:'50px',width:'100%',bottom:'0px', position:'fixed', backgroundColor:'#242439'}} onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ChatUI;
