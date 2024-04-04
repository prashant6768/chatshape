
import React, { useEffect, useState, useRef } from 'react';
import '../../src/css/chatCss.css'
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
// import * as jose from 'jose';
import axios from 'axios'
import { RotatingLines, ThreeDots } from 'react-loader-spinner';
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
    const [chatbotMsg, setChatbotMsg] = useState('');
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
    const[chatUiDe,setChatUiDe]= useState('True')

    const [toggleStoreName,setToogleStoreName]= useState(false)
    const [storeName,setStoreName]= useState('')
    const [toggleStoreEmail,setToogleStoreEmail]= useState(false)
    const [storeEmail,setStoreEmail]= useState('')

    // const BACKEND = 'http://localhost:5000/'
    // const BACKENDWS = 'ws://localhost:5000/'
    // const BACKEND = 'https://zemaapi.zema.io/'
    // const BACKENDWS = 'wss://zemaapi.zema.io/'
    const BACKEND = process.env.REACT_APP_BACKEND
    const BACKENDWS = process.env.REACT_APP_BACKENDWS



    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState('');
    const [answerCount,setAnswerCount]= useState(0)
    const [thankName,setThankName]= useState(false)
    const [thankEmail,setThankEmail]= useState(false)



useEffect(() => {
    try{
    const newSocket = socketIO.connect(BACKENDWS
        , {
        transports: [ "websocket"],
        enabledTransports: [ "websocket"],
    },
    {secure:true},
    // ,{transports: ['wss'], enabledTransports: ['wss'],}
    );
    console.log("----------------------------Socket connect front",BACKEND)
    setSocket(newSocket);
    newSocket.on("connect", () => {
        console.log("-----------------Socket connected on the front end");
    });
    newSocket.on("error", (error) => {
        console.error("--------------Socket error on the front end:", error);
    });
    return () => {
        if(newSocket.readyState === 1){  /** Remove if statement if error ,-------------------------- */
            newSocket.disconnect();
            console.log("Socket DIS--connect front------return one--")
        }
    };
}catch(err){
console.log(err,"======try catch")
}
}, [inputValue]);



    const joinRoom = (roomName) => {
        console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
        if (socket) {
            try{
                socket.emit('join', { room: roomName });
                setRoom(roomName);
                console.log("-------------------------Room joined ", roomName)
            }catch(err){
                console.log("ERR on join room frontend code == ",err)
            }
           
        }
    };

    const leaveRoom = () => {
        if (socket) {
            socket.emit('leave', { room });
            setRoom('');
            console.log("Left the room")
        }
    };

    const test = () => {
        if (socket) {
            socket.emit('test');
            console.log("test room frontend ")
        }
    };
    const testRoom = (roomName) => {
        if (socket) {
            socket.emit('testRoom', { room: roomName });
            console.log("test room frontend, it needs roomName objectId, check if it is right ")
        }
    };


    const sendMessage = (message) => {
        if (socket) {
            socket.emit('message', { room, msg: message });
        } else {
            console.log("no room joined")
        }
    };

    useEffect(() => {
        console.log("Socket changeeeeeeeeeeeeeee ssssssssssssss")
        socket?.on('welcome_message', (data) => {
            console.log('Received welcome message:', data.message);
        });
    }, [socket])

    useEffect(() => {
        socket?.on('message-chat', data => {
            setChkk(prevChkk => [...prevChkk, data.message])
            console.log(data.message," --148")
        });
   
    }, [socket])



    const handleInputChange = async (e) => {
        test()
        testRoom("Roonmane")
        await setInputValue(e.target.value)
    };

    const handleSubmitP = (x) => {

        if (x.trim() === '') {
            return;
        }

        setSpromptHide(true)
        joinRoom(botID.botID)
        console.log("BBBBBBBBBBBBBBBBBBBBBB",botID.botID)
        const newMessage = {
            id: messages.length + 1,
            text: x,
            sender: 'me',
        };
        let inputValue = x
        console.log(spromptHide)
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if(toggleStoreName === true){

            const nameRegex = /[0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`]/;
            if (nameRegex.test(inputValue)) {
              toast.error("Name cannot contain numbers or symbols");
            //   setLoading(false);
            console.log("NAme-----------------symbol-----")
              return;
            }

            console.log("Store the name", x)
            setStoreName(inputValue)
            setToogleStoreName(false)
        }else if(toggleStoreEmail === true){
            console.log("Store the name", x)
            setStoreEmail(inputValue)
            setToogleStoreEmail(false)
        }
        else{
        
        setLoading(true);
        scrollToBottom()
        axios.post(`${BACKEND}api/msg`, { inputValue, botID, uniqueCon, chatUiDe }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        // .then(res => console.log("=============================",res.data,"================"))
        .then(res => {
            if (res.data === 'SubE') { setLoading(false); setUniqueCon(0); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") }
            else if (res.data == 'noid') { setLoading(false);setUniqueCon(0);  setChatbotMsg("Sorry, This Bot has been deleted") }
            else if (res.data[0] == 'Some Error Occured !!!!') { setLoading(false);console.log("-------111111-----",res.data);setUniqueCon(0);  setChatbotMsg("Some Error Occured !!!5!"); setConsecFailMsg(prev => [...prev, res.data[1]]); setConsecFail(consecFail + 1) }
            else if (res.data == 'RDNF') { setLoading(false); setChatbotMsg("Relevant Data Not Found.");setUniqueCon(0);  setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
            else if (res.data[1] == 'RDN') { setLoading(false); setChatbotMsg(res.data[0]);setUniqueCon(0);  setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
            else {setAnswerCount(answerCount+1); setChatbotMsg(res.data[0]); setConsecFail(0); setUniqueCon(0); console.log(messages, " === from backend",res.data); setLoading(false) }
        })
            .catch(err => { setLoading(false); console.log(err); setConsecFail(consecFail + 1); setConsecFailMsg(prev => [...prev, err]); setChatbotMsg("Sorry, Some Error has Occured !!!! ") })
        scrollToBottom()
    }
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

        if(toggleStoreName === true){
            const nameRegex = /[0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`]/;
            if (nameRegex.test(inputValue)) {
              toast.error("Name cannot contain numbers or symbols");
              return;
            }
        }
        if(toggleStoreEmail === true){
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!emailRegex.test(inputValue)) {
              toast.error("Invalid Email Format");
              return;
            }           
        }

        const newMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'me',
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if(toggleStoreName === true){
            console.log("Store the name", inputValue)

            const nameRegex = /[0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`]/;
            if (nameRegex.test(inputValue)) {
              toast.error("Name cannot contain numbers or symbols");
            //   setLoading(false);
            console.log("NAme-----------------symbol-----")
              return;
            }

            setStoreName(inputValue)
            setToogleStoreName(false)
        }else if(toggleStoreEmail === true){
           
            setStoreEmail(inputValue)
            setToogleStoreEmail(false)
        }
        else{
       
        setLoading(true);
        scrollToBottom()
        axios.post(`${BACKEND}api/msg`, { inputValue, botID, uniqueCon, chatUiDe }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
            // .then(res => console.log(res.data," === from backend ")).catch(err => console.log(err))
            .then(res => {
                if (res.data === 'SubE') {  setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade"); setUniqueCon(0) }
                 else if (res.data == 'noid') { setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted"); setUniqueCon(0) } 
                 else if (res.data[0] == 'Some Error Occured !!!!') { setLoading(false); setChatbotMsg("Some Error Occured !!!!"); setConsecFail(consecFail + 1); setUniqueCon(0); setConsecFailMsg(prev => [...prev, res.data[1]]) } 
                 else if (res.data == 'RDNF') { setLoading(false); setChatbotMsg("Relevant Data Not Found."); setUniqueCon(0); setConsecFailMsg(prev => [...prev, "Relevant Data Not Found"]); setConsecFail(consecFail + 1) }
                else if (res.data[1] == 'RDN') { setLoading(false); setChatbotMsg(res.data[0]); setUniqueCon(0); setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
                else { setAnswerCount(answerCount+1);setChatbotMsg(res.data[0]);  setConsecFail(0); console.log(messages, "=== backend www", res.data); setUniqueCon(0); setLoading(false); }
            }).catch(err => { setLoading(false); setConsecFail(consecFail + 1); console.log(err); setChatbotMsg("Sorry, Some Error has Occured !!!! "); setConsecFailMsg(prev => [...prev, err]) })
        scrollToBottom()
        }
    };

    useEffect(() => {
        console.log("Consecutive failure", consecFail)
        if (consecFail >= 5 && messages[messages.length - 1]['sender'] == '') {
            console.log("AAAAAAAAAAAAAAAALLLLLLLEEEEEEEERRRRRRRTTTTTTTTT")
            const failmsg = messages.filter(message => message.text !== '').slice(-10)
            const consecFailMsgF = consecFailMsg.slice(-5)
            setConsecFail(0);
            // console.log("------------",messages.filter(message => message.text !== ''))
            console.log("-----10message-------", messages.filter(message => message.text !== '').slice(-10))
            axios.post(`${BACKEND}api/consecFailure`, { botID, failmsg, consecFailMsgF }, {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
                .then(res => { setConsecFailMsg([]); console.log(res.data, " === from backend ") }).catch(err => console.log(err))
            // .then()
        }
    }, [messages])

    useEffect(() => {
        console.log("111111==", messages, messages.length)
        const filteredArray = messages.filter(item => item.text !== '');
        const processedArray = filteredArray.map(({ id, ...x }) => x);
        console.log("222== ", processedArray)
        console.log("280------",storeName)
        if(storeName !== ''){
            setThankName(true)
        }
        if(storeEmail !== ''){
            setThankEmail(true)
        }
        axios.post(`${BACKEND}api/history`, { botID, processedArray, now, uniqueCon,storeName,storeEmail }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => {console.log(res.data, " === from backend message history "); setStoreName('');setStoreEmail('')}).catch(err => console.log(err))
    }, [chatbotMsg,storeName,storeEmail])

    const[apiload,setApiload] = useState(false)
    

    useEffect(() => {
        setApiload(true)
        console.log("---------",`${BACKEND}api/fontdata/${botID.botID}`)
        axios.get(`${BACKEND}api/fontdata/${botID.botID}`)
        .then(res =>{if(res.data[0]=='error'){console.log(res.data[1]);toast.error("Some Error Occured"); setApiload(false)}
         else{ setFontData(res.data);
            //  setSPrompt(res.data.sPrompt);
              setChatbotMsg(res.data.initialMsg); setPlan(res.data.plan); console.log(res.data.initialMsg, "=font api init"); setApiload(false) }})
         .catch(err => {console.log(err); setApiload(false)})
        console.log(suggestedPrompt)
    }, [botID.botID])


    useEffect(() => {
        setChkk([])
        const newMessage = {
            id: messages.length + 1,
            text: chatbotMsg,
            sender: '',
        };
        if (chatbotMsg === '' && chatbotMsg === null ) {
            console.log("W")
        } else {
         
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            
         
            // if (speechTog === true) {
            //     const speechSynthesis = window.speechSynthesis;
            //     const utterance = new SpeechSynthesisUtterance(chatbotMsg);
            //     speechSynthesis.speak(utterance);
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
            console.log("speech tog  is set to ", speechTog)

        }
        setInputValue('');
        setChatbotMsg('')
        console.log("lllllllllllll")
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
        if (plan === 'year-enterprise' || plan === 'month-enterprise') {
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

    const handleFontChange = (event) => {
        const { name, value } = event.target;
        if (name === 'fontSize') {
            // Prevent font size from being negative
            const fontSize = parseInt(value, 10);
            if (fontSize >= 0 && fontSize <= 32) {
                setFontData((prevData) => ({ ...prevData, [name]: fontSize }));
            }
        } else {
            setFontData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleFontSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        axios.put(`${BACKEND}api/fontdata/${botID.botID}`, { fontData }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => { if (res.data === 'Yes') { toast.success('Font Changes were successful'); setLoading(false); } else { toast.success('Some error occured'); setLoading(false); } }).catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoading(false); })
        console.log(fontData);
    };

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

    // const handleAudio=()=>{

    // }   

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    // const [speechTog, setSpeechTog] = useState(false)

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
            scrollToBottom()
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
            console.log(chatContainerRef.current.scrollHeight, "chatContainerRef.current.scrollHeight")
        }, 10);
    };

    const [duplicatePreventer1,setDuplicatePreventer1]=useState(false)
    const [duplicatePreventer2,setDuplicatePreventer2]=useState(false)

    useEffect(()=>{
   if(answerCount === 1 && duplicatePreventer1 === false && thankName !== true){
    console.log("++++++++++++++++++++++++++++++++++++++++++++")
 
    const newMessage = {
        id: messages.length + 2,
        text: 'Tell me your name to proceed further',
        sender: '',
    };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log(chatbotMsg,"---532")
            setToogleStoreName(true)
            setDuplicatePreventer1(true)
            
   }

   if(thankName === true ){
    setToogleStoreName(false)
            setThankName(false)


    const newMessage = {
        id: messages.length + 1,
        text: 'Thanks, You can proceed with your queries',
        sender: '',
    };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log(chatbotMsg,"---561")
            setInputValue('')
   }
  

   if(answerCount === 5 && duplicatePreventer2 === false && thankEmail !== true){
    console.log("++++++++++++++++++++++++++++++++++++++++++++")
 
    const newMessage = {
        id: messages.length + 2,
        text: 'Tell me your email to proceed further',
        sender: '',
    };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log(chatbotMsg,"---532")
            setToogleStoreEmail(true)
            setDuplicatePreventer2(true)
            
   }

   if(thankEmail === true ){
    setToogleStoreEmail(false)
            setThankEmail(false)
    const newMessage = {
        id: messages.length + 1,
        text: 'Thanks, You can proceed with your queries',
        sender: '',
    };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log(chatbotMsg,"---561")
            setInputValue('')
   }

   console.log("Triggerred after name submit",thankName)
    },[answerCount,thankName,thankEmail])


    return (
        <div className='row d-flex justify-content-around flex-wrap'>


            {/* ##################################### Chat UI DEMO */}


            <div className='d-flex justify-content-center my-5 col-lg-10 col-11' style={{}}>

                <div className='d-flex  ' style={{ position: 'relative', height: '600px', minWidth: '240px', maxWidth: '90vw', width: '100%', marginTop:'30px', backgroundColor:'#171725' }}>
                    {/* {
                        mark ?
                            <h1 className='bg-primary mx-3' style={{ position: 'absolute', opacity: '15%', left: '20px', bottom: '50px' }}>Powered by Zema</h1> : <p></p>
                    } */}
                    <div className="chat-container  px-0" ref={chatContainerRef}  style={{ backgroundColor: fontData.backgroundColor, height: '600px', paddingBottom: '100px', maxWidth: '90vw', minWidth: '240px', width: '100%', borderWidth: '0px',borderTopRightRadius:'15px', borderTopLeftRadius:'15px' }}>
                        <div className="chat-messages " >
                            {messages.map((message) => (
                                message.text === '' || null || undefined || messages[messages.length-1].text == messages[messages.length-2].text ? '' :
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
             <div className='form-group d-flex justify-content-center mt-4'>
       {loading ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>
                            {apiload ? (
                                <div className='d-flex flex-wrap justify-content-center mx-auto my-auto' >
                                <RotatingLines type="Oval" className='col-12'   color="#3D4648" height={150} width={150} />
                                <h3 className='col-12 mx-auto text-center mt-3' style={{ color:"#4C9E4B"}}>Please wait, we are getting chatbot ready for you!!!</h3>
</div>
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
                    {/* <h1 style={{color:'white'}}>{answerCount}</h1> */}
                        <input
                            type="text"
                            style={{ minWidth: '50%' }}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                        />
                        {/* Text to speech */}
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

{/* speech to text */}
                        {/* <div className="audio-controls me-2">
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
                        </div> */}

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