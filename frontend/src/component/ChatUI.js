import React, { useEffect, useState, useRef } from 'react';
import '../css/chatCss.css'
// import * as jose from 'jose';
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner';
import sendIcon from '../assets/send.png'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { BsStopCircle } from 'react-icons/bs'
import {HiSpeakerWave, HiSpeakerXMark} from 'react-icons/hi2'
import { ToastContainer, toast } from 'react-toastify';
import * as jose from 'jose';
import env from 'react-dotenv'
import socketIO from 'socket.io-client';


function TypingEffect({ text }) {
  // const delay = 20;

  // const [displayedText, setDisplayedText] = useState('');
  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (currentIndex < text.length) {
  //       setDisplayedText(prevText => prevText + text.charAt(currentIndex));
  //       setCurrentIndex(prevIndex => prevIndex + 1);
  //     }
  //   }, delay);

  //   return () => clearTimeout(timer);
  // }, [currentIndex, text]);

  return <div>{text}</div>;
}


const ChatUI = (botID) => {

  useEffect(() => {
    console.log("CHKKKKKKKKK", botID)
  }, botID)

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatbotMsg, setChatbotMsg] = useState('')
  const [suggestedPrompt, setSPrompt] = useState([])
  const [spromptHide, setSpromptHide] = useState(false)
  const [plan, setPlan] = useState('')
  const [mark, setMark] = useState(false)
  const [loading, setLoading] = useState(false);
  const [uniqueCon, setUniqueCon] = useState(1)
  const [now, setNow] = useState('')
  const[chkk,setChkk] = useState([])
  const[ck,setCk]=useState([])
  const[consecFail,setConsecFail]=useState(0)
  const[consecFailMsg,setConsecFailMsg]=useState([])
  const [chatUiDe,setChatUiDe] = useState("None")

  // <script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js" defer id="popup" cred="65427cf9e8dcb18a5750fb1e"></script>

  // const BACKEND = 'http://localhost:5000/'
  // const BACKEND = 'https://zemaapi.zema.io/'
  const BACKEND = process.env.REACT_APP_BACKEND

  // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token,'notmysecretkey');

  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState('');
 

  useEffect(() => {
      const newSocket = socketIO.connect(BACKEND);

  
      setSocket(newSocket);
  
      return () => {
        newSocket.disconnect();
      };
    }, []);
  
    const joinRoom = (roomName) => {
      if (socket) {
        socket.emit('join', { room: roomName });
        setRoom(roomName);
      }
    };
  
    const leaveRoom = () => {
      if (socket) {
        socket.emit('leave', { room });
        setRoom('');
        setI(1)
        
      }
    };
  
    const sendMessage = (message) => {
      if (socket) {
        socket.emit('message', { room, msg: message });
      }else{
          console.log("no room joined")
      }
    };

    socket?.on('welcome_message', (data) => {
      console.log('Received welcome message:', data.message);
    });
    
    const[i,setI]=useState(1)
    var t = 0

    socket?.on('message-chat', data => {  
      setI(prevI => prevI + 1);    
      if (i === 1) {    
          setI(prevI => prevI + 1);         
         setCk(data.message)          
      }else{
      }
      if(ck !== ''){
          setChkk(prevChkk => [...prevChkk, ck])
      }else{
          setChkk(ck)
      }  
    });


  const handleSubmitP = (x) => {

    if (x.trim() === '') {
      return;
    }
    setSpromptHide(true)
    joinRoom(botID.botID)

    const newMessage = {
      id: messages.length + 1,
      text: x,
      sender: 'me',
    };
    let inputValue = x
    console.log(spromptHide)
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    scrollToBottom()
    axios.post(`${BACKEND}api/msg`, { inputValue, botID, uniqueCon, chatUiDe }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    .then(res => {
      if (res.data === 'SubE') { setLoading(false); setUniqueCon(0); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") }
      else if (res.data == 'noid') { setLoading(false);setUniqueCon(0);  setChatbotMsg("Sorry, This Bot has been deleted") }
      else if (res.data[0] == 'Some Error Occured !!!!') { setLoading(false);console.log("-------111111-----",res.data);setUniqueCon(0);  setChatbotMsg("Some Error Occured !!!5!"); setConsecFailMsg(prev => [...prev, res.data[1]]); setConsecFail(consecFail + 1) }
      else if (res.data == 'RDNF') { setLoading(false); setChatbotMsg("Relevant Data Not Found.");setUniqueCon(0);  setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
      else if (res.data[1] == 'RDN') { setLoading(false); setChatbotMsg(res.data[0]);setUniqueCon(0);  setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
      else { setChatbotMsg(res.data[0]); setConsecFail(0); setUniqueCon(0); console.log(messages, " === from backend"); setLoading(false) }
  })
      .catch(err => { setLoading(false); console.log(err); setConsecFail(consecFail + 1); setConsecFailMsg(prev => [...prev, err]); setChatbotMsg("Sorry, Some Error has Occured !!!! ") })
  scrollToBottom()
  }

  const handleInputChange = async (e) => {
    await setInputValue(e.target.value);
  };

  useEffect(() => {
    if (uniqueCon === 1) {
      setNow(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString())
    }
  }, [uniqueCon])

  const handleSubmit = async (e) => {
    if(e){
      e.preventDefault();
    }
    joinRoom(botID.botID)
    
    setSpromptHide(true)
    if (inputValue.trim() === '') {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'me',
    };

    console.log( inputValue, botID, uniqueCon,chatUiDe)
    // curl -X POST https://zemaapi.zema.io/api/msg      -H "Content-Type: application/json"      -d '{"inputValue": "your input value", "botID": {"botID": "65782d638816080b8eb22d1b"}, "uniqueCon": 1, "chatUiDe":None}'
    // curl -X POST -H "Content-type: application/json" -H "Accept: application/json" -d '{"inputValue": "yourInputValue", "botID": "65782d638816080b8eb22d1b", "uniqueCon": 1, "chatUiDe": None}' https://zemaapi.zema.io/api/msg


// ////////////////////////////
// initiate a post request using this data data = {
//   "inputValue": "explain the topic in 30 words",
//   "botID": {"botID": "65782d638816080b8eb22d1b"},
//   "uniqueCon": 1,
//   "chatUiDe": None
// }

// ////////////////////////////////
// openapi: 3.0.0
// info:
//   title: Zema API
//   description: API for interacting with Zema messaging service.
//   version: 1.0.0
// servers:
//   - url: https://zemaapi.zema.io
//     description: Zema API server
// paths:
//   /api/msg:
//     post:
//       operationId: sendMessage
//       summary: Send a message to the Zema API
//       requestBody:
//         required: true
//         content:
//           application/json:
//             schema:
//               type: object
//               properties:
//                 inputValue:
//                   type: string
//                   description: The input value to be sent
//                   example: zema in 1 word
//                 botID:
//                   type: object
//                   properties:
//                     botID:
//                       type: string
//                       description: Unique identifier for the bot
//                       example: 6576dff6616c8f79f8e7286c
//                 uniqueCon:
//                   type: integer
//                   format: int32
//                   description: A unique condition identifier
//                   exapmle: 1
//                 chatUiDe:
//                   type: string
//                   nullable: true
//                   description: Chat UI identifier, can be null
//                   example: null
//       responses:
//         default:
//           description: Default response for various outcomes
//           content:
//             application/json:
//               schema:
//                 oneOf:
//                   - type: string
//                     enum:
//                       - SubE
//                       - RDNF
//                   - type: array
//                     items:
//                       type: string
//                   - type: object
//                     properties:
//                       summaries:
//                         type: string
//                       planname:
//                         type: string
//                       uniqueCon:
//                         type: integer
//                       error:
//                         type: string
//                         description: Error message if an error occurred



/////////////////////////////////////////////  working at 10 pm json form  (gave only one post and one get error message in ubuntu, no 100s of socket io)
// {
//   "openapi": "3.0.0",
//   "info": {
//     "title": "Zema Chatbot API",
//     "description": "API for interacting with Zema's chatbot service.",
//     "version": "1.0.0"
//   },
//   "servers": [
//     {
//       "url": "https://zemaapi.zema.io",
//       "description": "Zema API server"
//     }
//   ],
//   "paths": {
//     "/api/msg": {
//       "post": {
//         "operationId": "postMessage",
//         "summary": "Send a message and receive a response from the chatbot.",
//         "requestBody": {
//           "required": true,
//           "content": {
//             "application/json": {
//               "schema": {
//                 "type": "object",
//                 "properties": {
//                   "inputValue": {
//                     "type": "string"
//                   },
//                   "botID": {
//                     "type": "object",
//                     "properties": {
//                       "botID": {
//                         "type": "string"
//                       }
//                     }
//                   },
//                   "uniqueCon": {
//                     "type": "boolean"
//                   },
//                   "chatUiDe": {
//                     "type": "string",
//                     "nullable": true
//                   }
//                 }
//               }
//             }
//           }
//         },
//         "responses": {
//           "200": {
//             "description": "Successful response",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "oneOf": [
//                     {
//                       "type": "string"
//                     },
//                     {
//                       "type": "array",
//                       "items": {
//                         "type": "string"
//                       }
//                     }
//                   ]
//                 }
//               }
//             }
//           },
//           "400": {
//             "description": "Bad request, such as missing required fields"
//           },
//           "500": {
//             "description": "Internal server error indicating an issue with the server"
//           }
//         }
//       }
//     }
//   }
// }




// //////////////////////////////  only working, checked at 9 pm
// openapi: 3.0.0
// info:
//   title: Zema Chatbot API
//   description: API for interacting with Zema's chatbot service.
//   version: 1.0.0
// servers:
//   - url: https://zemaapi.zema.io
//     description: Zema API server
// paths:
//   /api/msg:
//     post:
//       operationId: postMessage
//       summary: Send a message and receive a response from the chatbot.
//       requestBody:
//         required: true
//         content:
//           application/json:
//             schema:
//               type: object
//               properties:
//                 inputValue:
//                   type: string
//                 botID:
//                   type: object
//                   properties:
//                     botID:
//                       type: string
//                 uniqueCon:
//                   type: integer
//                 chatUiDe:
//                   type: string
//                   nullable: true
//       responses:
//         '200':
//           description: Successful response
//           content:
//             application/json:
//               schema:
//                 oneOf:
//                   - type: string
//                   - type: array
//                     items:
//                       type: string
//         '400':
//           description: Bad request, such as missing required fields
//         '500':
//           description: Internal server error indicating an issue with the server

///////////////////////////////////
// openapi: 3.0.0
// info:
//   title: AI Trading Spy API
//   description: API for AI Trading Spy services.
//   version: 1.0.0
// servers:
//   - url: https://api.aitradingspy.com
//     description: AI Trading Spy API server
// paths:
//   /getg/:
//     get:
//       operationId: getSampleString
//       summary: Retrieves a fixed sample string
//       responses:
//         '200':
//           description: A simple string response
//           content:
//             text/plain; charset=utf-8:
//               schema:
//                 type: string
//                 example: SAMPLE STRING

/////////////////////////////////
// {
//   "openapi": "3.0.0",
//   "info": {
//     "title": "AI Trading Spy API",
//     "description": "API for AI Trading Spy services.",
//     "version": "1.0.0"
//   },
//   "servers": [
//     {
//       "url": "https://api.aitradingspy.com",
//       "description": "AI Trading Spy API server"
//     }
//   ],
//   "paths": {
//     "/getg/": {
//       "get": {
//         "operationId": "getSampleString",
//         "summary": "Retrieves a fixed sample string",
//         "responses": {
//           "200": {
//             "description": "A simple string response",
//             "content": {
//               "text/plain; charset=utf-8": {
//                 "schema": {
//                   "type": "string",
//                   "example": "SAMPLE STRING"
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }




    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    scrollToBottom()
    axios.post(`${BACKEND}api/msg`, { inputValue, botID, uniqueCon,chatUiDe }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    .then(res => {
      if (res.data === 'SubE') { setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade"); setUniqueCon(0) }
       else if (res.data == 'noid') { setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted"); setUniqueCon(0) } 
       else if (res.data[0] == 'Some Error Occured !!!!') { setLoading(false); setChatbotMsg("Some Error Occured !!!!"); setConsecFail(consecFail + 1); setUniqueCon(0); setConsecFailMsg(prev => [...prev, res.data[1]]) } 
       else if (res.data == 'RDNF') { setLoading(false); setChatbotMsg("Relevant Data Not Found."); setUniqueCon(0); setConsecFailMsg(prev => [...prev, "Relevant Data Not Found"]); setConsecFail(consecFail + 1) }
      else if (res.data[1] == 'RDN') { setLoading(false); setChatbotMsg(res.data[0]); setUniqueCon(0); setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
      else { setChatbotMsg(res.data[0]); setConsecFail(0); console.log(messages, "=== backend www", res.data); setUniqueCon(0); setLoading(false); }
  }).catch(err => { setLoading(false); setConsecFail(consecFail + 1); console.log(err); setChatbotMsg("Sorry, Some Error has Occured !!!! "); setConsecFailMsg(prev => [...prev, err]) })
scrollToBottom()
    };

    useEffect(()=>{
      console.log("Consecutive failure",consecFail)
      if(consecFail >= 5 && messages[messages.length -1]['sender'] == '' ){
        console.log("AAAAAAAAAAAAAAAALLLLLLLEEEEEEEERRRRRRRTTTTTTTTT")
         const failmsg = messages.filter(message => message.text !== '').slice(-10)
         const consecFailMsgF = consecFailMsg.slice(-5)
        // console.log("------------",messages.filter(message => message.text !== ''))
        console.log("-----10message-------",messages.filter(message => message.text !== '').slice(-10))
        axios.post(`${BACKEND}api/consecFailure`, { botID , failmsg ,consecFailMsgF}, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
            .then(res =>{setConsecFailMsg([]); setConsecFail(0); console.log(res.data," === from backend ")}).catch(err => console.log(err))
            // .then()
      }
    },[ messages])

  useEffect(() => {
    // if (chatbotMsg !== '') {
      console.log("111111==", messages)
      const filteredArray = messages.filter(item => item.text !== '');
      const processedArray = filteredArray.map(({ id, ...x }) => x);
      console.log("222== ", processedArray)
      axios.post(`${BACKEND}api/history`, { botID, processedArray, now, uniqueCon }, {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }).then(res => console.log(res.data, " === from backend message history ")).catch(err => console.log(err))
    // }
  }, [chatbotMsg])


  useEffect(() => {
    setChkk([])

    const newMessage = {
      id: messages.length + 1,
      text: chatbotMsg,
      sender: '',
    };
    // if (chatbotMsg === '' && chatbotMsg === null && chatbotMsg === []) {
      if (chatbotMsg === '' && chatbotMsg === null ) {
      console.log("W")
    } else {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   if (speechTog === true) {
    //     const speechSynthesis = window.speechSynthesis;
    //     const utterance = new SpeechSynthesisUtterance(chatbotMsg);
    //     speechSynthesis.speak(utterance);
    //     console.log("should have spoken")
    // }

    if (speechTog === true) {
      const speechSynthesis = window.speechSynthesis;
      const maxChunkLength = 100; 
      let textToSpeak = chatbotMsg;
    
      while (textToSpeak.length > maxChunkLength) {
        let lastSpaceIndex = textToSpeak.lastIndexOf(' ', maxChunkLength);
        if (lastSpaceIndex === -1) {
          lastSpaceIndex = maxChunkLength;
        }
        
        const chunk = textToSpeak.substr(0, lastSpaceIndex);
        const utterance = new SpeechSynthesisUtterance(chunk);
        speechSynthesis.speak(utterance);
    
        textToSpeak = textToSpeak.substr(lastSpaceIndex + 1);
      }

      if (textToSpeak) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        speechSynthesis.speak(utterance);
      }
    }
    console.log("speech tog  is set to ",speechTog)
    }
    setInputValue('');
    setChatbotMsg('')
    leaveRoom()
    scrollToBottom()

  }, [chatbotMsg])

  const [speechTog, setSpeechTog] = useState(false)

  useEffect(()=>{
      const checkSpeech = setInterval(() => {
          if (speechTog === false) {
              // If speechTog is false, cancel the speech
              speechSynthesis.pause();
              speechSynthesis.cancel();
              console.log("cancel")
              clearInterval(checkSpeech); // Stop the loop
          }
      }, 100);
  },[speechTog])

  useEffect(() => {
    if  (plan === 'year-enterprise' || plan === 'month-enterprise' ) {
      setMark(false)
    } else {
      setMark(true)
    }
    console.log("mark = ", mark, " and plan ", plan)
  }, [plan])


  const [fontData, setFontData] = useState({
    font: 'arial',
    userFontColor: '#0070DA',
    userFontTextColor: '#FFFFFF',
    cpuFontColor: '#3D4648',
    cpuFontTextColor: '#FFFFFF',
    backgroundColor: '#242439',
    fontSize: '12px',
  });



  // useEffect(()=>{
  //   axios.get(`${BACKEND}/api/fontdata/${botID.botID}`).then(res => {setFontData(res.data); setChatbotMsg(res.data.initialMsg)}).catch(err => console.log(err))
  // console.log(botID.botID)
  // },[])
  useEffect(() => {
    console.log("aaaaaaaaaaaa bot ", botID)
    axios.get(`${BACKEND}api/fontdata/${botID.botID}`).then(res => { setFontData(res.data); setSPrompt(res.data.sPrompt); setPlan(res.data.plan); setChatbotMsg(res.data.initialMsg);  console.log(res.data.initialMsg, "=font api init") }).catch(err => console.log(err))
    console.log(suggestedPrompt)
  }, [])

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


  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [audioSub, setAudioSub] = useState(false)
  // const [speechTog, setSpeechTog] = useState(false)


  const getMicrophonePermission = async () => {
      if ("MediaRecorder" in window) {
          try {
              const streamData = await navigator.mediaDevices.getUserMedia({
                  audio: true,
                  video: false,
              });
              console.log("strem-------",window)
              setPermission(true);
              setStream(streamData);
          } catch (err) {
            console.log("strem-------", navigator)
              alert(err,"aaaaa");
          }
      } else {
          alert("The MediaRecorder API is not supported in your browser.");
      }
  }
  const mimeType = "audio/webm";
  const startRecording = async () => {
      setRecordingStatus("recording");
      //create new Media recorder instance using the stream
      const media = new MediaRecorder(stream, { type: mimeType });
      //set the MediaRecorder instance to the mediaRecorder ref
      mediaRecorder.current = media;
      //invokes the start method to start the recording process
      mediaRecorder.current.start();
      let localAudioChunks = [];
      mediaRecorder.current.ondataavailable = (event) => {
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
  };
  const stopRecording = () => {
      setRecordingStatus("inactive");
      //stops the recording instance
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
          //creates a blob file from the audiochunks data
          const audioBlob = new Blob(audioChunks, { type: mimeType });


          setAudio(audioBlob);
          setAudioChunks([]);
      };
  };


  useEffect(() => {
      if (audio !== null) {
          const formData = new FormData();
          formData.append('audio', audio, 'recording.webm');
          for (let pair of formData.entries()) {
              console.log(pair[0] + ', ' + pair[1]);
          }
          scrollToBottom()
          axios.post(`${BACKEND}api/audio`, formData, {
              'Content-type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }).then(res => { console.log(res.data); setInputValue(res.data); setAudioSub(true); setAudio(null) }).catch(err => console.log(err))
      }
      scrollToBottom()
  }, [audio])

  useEffect(() => {
      if (audioSub === true) {
          handleSubmit()
          setInputValue('')
      }
      setAudioSub(false)
  }, [audioSub])

  const handleToggleSpeech = () => {
    setSpeechTog((prevTog) => !prevTog);
    console.log("sppppppppppppech ", speechTog)
};

const chatContainerRef = useRef(null);
const scrollToBottom = () => {
  setTimeout(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, 10);
  };


  return (
    <div className='d-flex' style={{ position: 'relative', height: '100vh', maxWidth: '540px', width: '100%', borderTopWidth: '1px', borderBottomWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: 'black', borderStyle: "solid" }}>
      {
        mark ?
          <h1 className='bg-primary mx-3' style={{ position: 'absolute', opacity: '15%', left: '20px', bottom: '50px' }}>Powered by Zema</h1> : <p></p>
      }
      <div className="chat-container" ref={chatContainerRef} style={{ backgroundColor: fontData.backgroundColor, height: '95vh', paddingBottom: '100px', maxWidth: '540px', width: '100%', borderWidth: '0px' }}>
        <div className="chat-messages " >
          {messages.map((message) => (
            message.text === '' || null || undefined ? '' :
              <div
                key={message.id}
                className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                style={message.sender === 'me' ? messageStyleSend : messageStyleRec}
              >
                {/* <div id="text-container" className="message-content typing">{message.text}</div> */}
                <TypingEffect id="text-container" className="message-content " text={message.text} />
              </div>
          ))}
           {
                                chkk.length == 0 ? '':<p style={ messageStyleRec} className="message  received" >{chkk}</p>
           }
          {loading ? (
            <ThreeDots type="Oval" position="top-center" color="#3D4648" height={50} width={50} />

          ) : (
            ''
          )}
        </div>
        {/* SUGGESTED PROMPT */}
        <div style={{ position: 'absolute', left: '20px', bottom: '50px', width: '75%' }}>
          {suggestedPrompt === undefined || spromptHide === true ? '' : suggestedPrompt.map(x => (
            <div className='received message' onClick={() => { handleSubmitP(x) }} value={x} style={{ backgroundColor: fontData.cpuFontColor, fontSize: fontData.fontSize, color: fontData.cpuFontTextColor, fontFamily: fontData.font, width: '75%' }}  >{x}</div>
          ))}
        </div>
      </div>
      <form className="chat-input mt-5" style={{ minHeight: '50px', height: '50px', maxWidth: '540px', width: '100%', bottom: '0px', position: 'fixed', backgroundColor: fontData.backgroundColor, borderColor: 'black', borderWidth: '2px' }} onSubmit={handleSubmit}>
        <input
          type="text"
          style={{ minWidth: '50%' }}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />

{
                        plan === 'year-enterprise' || plan === 'year-standard' || plan === 'month-enterprise' || plan === 'month-standard' ?
                        <>
                         <div className="me-2">
                            {
                                speechTog === false ?
                                    <button onClick={handleToggleSpeech} type="button">
                                        <HiSpeakerXMark />
                                    </button> :
                                    <button onClick={handleToggleSpeech} type="button">
                                        <HiSpeakerWave />
                                    </button>
                            }
                        </div>

        <div className="audio-controls me-2">
          {!permission ? (
            <button id='requestMicrophoneAccess' onClick={getMicrophonePermission} type="button">
              <FaMicrophoneSlash />
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button onClick={startRecording} type="button">
              <FaMicrophone />
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button onClick={stopRecording} type="button">
              <BsStopCircle />
            </button>
          ) : null}
        </div> </>: ''
        
}

        <button type="submit" ><img src={sendIcon} alt='Send' style={{ height: '22px', width: '25px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /></button>
        {/* <button type="submit" ><img src="https://icons.veryicon.com/png/o/internet--web/iview-3-x-icons/ios-send.png" style={{ height:'25px', width:'40px', backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/></button> */}
      </form>
    </div>
  );
};

export default ChatUI;
