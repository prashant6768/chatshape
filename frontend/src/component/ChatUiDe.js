
import React, { useEffect, useState, useRef } from 'react';
import '../../src/css/chatCss.css'
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
// import * as jose from 'jose';
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import {HiSpeakerWave, HiSpeakerXMark} from 'react-icons/hi2'
// import {} from 'react-icons/hi2'
import { BsStopCircle } from 'react-icons/bs'
import sendIcon from '../assets/send.png'

import lamejs from 'lamejs';

import * as jose from 'jose';
import env from 'react-dotenv'
import socketIO from 'socket.io-client';

function TypingEffect({ text }) {
    return <div>{text}</div>;
}


const ChatUIDe = (botID) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [chatbotMsg, setChatbotMsg] = useState('Work in Progress');
    const [suggestedPrompt, setSPrompt] = useState([])
    const [spromptHide, setSpromptHide] = useState(false)
    const [plan, setPlan] = useState('')
    const [mark, setMark] = useState(false)
    const [loading, setLoading] = useState(false);
    const [audioSub, setAudioSub] = useState(false)
    const [uniqueCon, setUniqueCon] = useState(1)
    const [now, setNow] = useState('')
    const[chkk,setChkk] = useState([])
    const[ck,setCk]=useState([])
    const[consecFail,setConsecFail]=useState(0)
    const[consecFailMsg,setConsecFailMsg]=useState([])

    // const BACKEND = 'http://localhost:5000/'
    const BACKEND = 'http://3.138.169.250/'

    const handleInputChange = async (e) => {
        await setInputValue(e.target.value)
    };


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
        axios.post(`${BACKEND}api/msg`, { inputValue, botID, uniqueCon }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => { if (res.data === 'SubE') { setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") } else if (res.data == 'noid') { setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted") }else if (res.data == 'RDNF'){setLoading(false); setChatbotMsg("Relevant Data Not Found."); setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) } else { setChatbotMsg(res.data[0]); setPlan(res.data[1]); setUniqueCon(0); console.log(messages, " === from backend"); setLoading(false) } }).catch(err => { setLoading(false); console.log(err); setChatbotMsg("Sorry, Some Error has Occured !!!! ") })
        scrollToBottom()
    }


    useEffect(() => {
        if (uniqueCon === 1) {
            setNow(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString())
        }
    }, [uniqueCon])

    const handleSubmit = async (e) => {
        if (e) {
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

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setLoading(true);
        scrollToBottom()
        axios.post(`${BACKEND}api/msg`, { inputValue, botID, uniqueCon }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
            // .then(res => console.log(res.data," === from backend ")).catch(err => console.log(err))
            .then(res => { if (res.data === 'SubE') { setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") } else if (res.data == 'noid') { setLoading(false); setChatbotMsg("WORK IN PROGRESS") }else if (res.data == 'RDNF'){setLoading(false); setChatbotMsg("Relevant Data Not Found."); setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) } else { setChatbotMsg(res.data[0]); setPlan(res.data[1]); console.log(messages, "=== backend www", res.data); setUniqueCon(0); setLoading(false); } }).catch(err => { setLoading(false); console.log(err); setChatbotMsg("Sorry, Some Error has Occured !!!! ") })
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
        console.log("111111==", messages)
        const filteredArray = messages.filter(item => item.text !== '');
        const processedArray = filteredArray.map(({ id, ...x }) => x);
        console.log("222== ", processedArray)
        axios.post(`${BACKEND}api/history`, { botID, processedArray, now, uniqueCon }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => console.log(res.data, " === from backend message history ")).catch(err => console.log(err))
    }, [chatbotMsg])

    useEffect(() => {
        axios.get(`${BACKEND}api/fontdata/${botID.botID}`).then(res => { setFontData(res.data); setSPrompt(res.data.sPrompt); setChatbotMsg(res.data.initialMsg); console.log(res.data.initialMsg, "=font api init") }).catch(err => console.log(err))
        console.log(suggestedPrompt)
    }, [])


    useEffect(() => {
        setChkk([])

        const newMessage = {
            id: messages.length + 1,
            text: chatbotMsg,
            sender: '',
        };
        if (chatbotMsg === '' && chatbotMsg === null && chatbotMsg === []) {
            console.log("W")
        } else {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            if (speechTog === true) {
                const speechSynthesis = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(chatbotMsg);
                speechSynthesis.speak(utterance);
            }
            console.log("speech tog  is set to ",speechTog)

        }
        setInputValue('');
        setChatbotMsg('')
        leaveRoom()
        scrollToBottom()

    }, [chatbotMsg])



    const [fontData, setFontData] = useState({
        font: 'arial',
        userFontColor: '#0070DA',
        userFontTextColor: '#FFFFFF',
        cpuFontColor: '#3D4648',
        cpuFontTextColor: '#FFFFFF',
        backgroundColor: '#242439',
        fontSize: '12px',
    });




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


    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [speechTog, setSpeechTog] = useState(false)

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
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

            axios.post(`${BACKEND}api/audio`, formData, {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }).then(res => { console.log(res.data); setInputValue(res.data); setAudioSub(true); setAudio(null) }).catch(err => console.log(err))
        }
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
        <div className='row d-flex justify-content-around flex-wrap'>


            {/* ##################################### Chat UI DEMO */}


            <div className='d-flex justify-content-center my-5 col-lg-10 col-11' style={{}}>

                <div className='d-flex  ' style={{ position: 'relative', height: '600px', minWidth: '240px', maxWidth: '90vw', width: '100%', marginTop:'30px', backgroundColor:'#171725' }}>
                    {
                        mark ?
                            <h1 className='bg-primary mx-3' style={{ position: 'absolute', opacity: '15%', left: '20px', bottom: '50px' }}>Powered by Zema</h1> : <p></p>
                    }
                    <div className="chat-container rounded-4 px-0" ref={chatContainerRef}  style={{ backgroundColor: fontData.backgroundColor, height: '600px', paddingBottom: '100px', maxWidth: '90vw', minWidth: '240px', width: '100%', borderWidth: '0px' }}>
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
                        {/* #######################3 suggested prompts */}
                        <div style={{ position: 'absolute', left: '20px', bottom: '50px', width: '75%', maxWidth:'350px' }}>
                            {suggestedPrompt === undefined || spromptHide === true ? '' : suggestedPrompt.map(x => (
                                <div className='received message' onClick={() => { handleSubmitP(x) }} value={x} style={{ backgroundColor: fontData.cpuFontColor, fontSize: fontData.fontSize, color: fontData.cpuFontTextColor, fontFamily: fontData.font, width: '75%' }}  >{x}</div>
                            ))}
                        </div>
                    </div>
                    <form className="chat-input mt-5 rounded-bottom-4 " style={{ minHeight: '50px', height: '50px', maxWidth: '90vw', minWidth: '240px', width: '100%', bottom: '-2px', position: 'absolute', backgroundColor: fontData.backgroundColor, borderColor: 'black', borderWidth: '2px' }} onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            style={{ minWidth: '50%' }}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                        />
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
                                <button onClick={getMicrophonePermission} type="button">
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
                        </div>

                        <button type="submit" ><img src={sendIcon} alt='Send' style={{ height: '22px', width: '25px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /></button>
                        {/* <button type="submit" ><img src="https://icons.veryicon.com/png/o/internet--web/iview-3-x-icons/ios-send.png" style={{ height:'25px', width:'40px', backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/></button> */}
                    </form>
                    {/* {audio ? (
  <div className="audio-container">
     <audio src={audio} controls></audio>
     <a download href={audio}>
        Download Recording
     </a>
   </div>
) : null} */}
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
        </div>
    )
}


export default ChatUIDe;