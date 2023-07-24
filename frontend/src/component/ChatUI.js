import React, { useEffect, useState } from 'react';
import '../css/chatCss.css'
// import * as jose from 'jose';
import axios  from 'axios'
import {ThreeDots} from 'react-loader-spinner';
import sendIcon from '../assets/send.png'
import { ToastContainer, toast } from 'react-toastify';
import * as jose from 'jose';
import env from 'react-dotenv'


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
  const [chatbotMsg,setChatbotMsg]= useState('')
  const[plan,setPlan]=useState('')
  const[mark,setMark]=useState(false)
  const[loading, setLoading] = useState(false);
  const BACKEND = 'http://localhost:5000/'

  // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token,'notmysecretkey');
  

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
    axios.post(`${BACKEND}/api/msg`,{inputValue,botID},{
        'Content-type':'application/json', 
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
  }).then(res =>{if(res.data === 'SubE'){ setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade")}else if(res.data == 'noid'){setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted")} else{setChatbotMsg(res.data[0][0]);setPlan(res.data[1]); console.log(res.data); setLoading(false) }})
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

useEffect(()=>{
   if(plan === 'year-pro' || plan === 'month-pro' || plan === ''){
      setMark(false)
   }else{
    setMark(true)
   }
   console.log("mark = ",mark," and plan ",plan)
},[plan])


const [fontData, setFontData] = useState({
  font: 'arial',
  userFontColor: '#0070DA',
  userFontTextColor: '#FFFFFF',
  cpuFontColor: '#3D4648',
  cpuFontTextColor: '#FFFFFF',
  backgroundColor: '#242439',
  fontSize: '12px',
});



useEffect(()=>{
  axios.get(`${BACKEND}/api/fontdata/${botID.botID}`).then(res => {setFontData(res.data); setChatbotMsg(res.data.initialMsg)}).catch(err => console.log(err))
console.log(botID.botID)
},[])

const messageStyleSend = {
  backgroundColor: fontData.userFontColor,
  fontSize: fontData.fontSize,
  color: fontData.userFontTextColor,
  fontFamily: fontData.font


};
const messageStyleRec = {
  backgroundColor: fontData.cpuFontColor,
  fontSize: fontData.fontSize,
  color: fontData.cpuFontTextColor,
  fontFamily: fontData.font

};

const fontOptions = [
  'Arial',
  'Times New Roman',
  'Helvetica',
  'Courier New',
  'Verdana',
];

  return (
    <div className='d-flex' style={{ position:'relative',height:'100vh' ,maxWidth:'540px', width:'100%', borderTopWidth:'1px',borderBottomWidth:'0px' ,borderLeftWidth:'0px' ,borderRightWidth:'0px' ,  borderColor:'black',borderStyle:"solid" }}>
      {
        mark ? 
        <h1 className='bg-primary mx-3' style={{position:'absolute', opacity:'15%', left:'20px' ,bottom:'50px'}}>Powered by Zema</h1>:<p></p>
      }
    <div className="chat-container" style={{  backgroundColor: fontData.backgroundColor, height:'95vh',paddingBottom:'100px',maxWidth:'540px', width:'100%', borderWidth:'0px'}}>
      <div className="chat-messages " >
        {messages.map((message) => (
            message.text === ''|| null || undefined ? '':
          <div
            key={message.id}
            className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
            style={message.sender === 'me' ? messageStyleSend : messageStyleRec}
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
    <form className="chat-input mt-5" style={{ minHeight:'50px',height:'50px',maxWidth:'540px', width:'100%',bottom:'0px', position:'fixed', backgroundColor:fontData.backgroundColor, borderColor:'black', borderWidth:'2px'}} onSubmit={handleSubmit}>
        <input
          type="text"
          style={{minWidth:'50%'}}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit" ><img src={sendIcon} alt='Send' style={{ height:'25px', width:'40px', backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/></button>
        {/* <button type="submit" ><img src="https://icons.veryicon.com/png/o/internet--web/iview-3-x-icons/ios-send.png" style={{ height:'25px', width:'40px', backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/></button> */}
      </form>
    </div>
  );
};

export default ChatUI;
