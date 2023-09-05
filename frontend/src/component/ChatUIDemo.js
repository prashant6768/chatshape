
import React, { useEffect, useState, useRef } from 'react';
import '../../src/css/chatCss.css'
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
// import * as jose from 'jose';
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
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


const ChatUIDemo = (botID) => {
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
    const [chkk, setChkk] = useState([])
    const [consecFail, setConsecFail] = useState(0)
    const [consecFailMsg, setConsecFailMsg] = useState([])
    const[ansE,setAnsE]=useState('')
    const[queE,setQueE]=useState('')
    const[startSocket,setStartSocket]=useState(1)




    // const BACKEND = 'http://localhost:5000/'
    // const BACKENDWS = 'ws://localhost:5000/'
    const BACKEND = 'https://api.zema.io/'
    // const BACKENDWS = 'https://api.zema.io/'
    // const BACKEND = 'http://3.138.169.250/'
    // const BACKENDWS = 'http://3.138.169.250/'


    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState('');



    useEffect(() => {
        try{

        
        console.log("startSocket-",startSocket)
        if(startSocket == 1){
        const newSocket = socketIO.connect(BACKEND
        //     , {
        //     transports: [ "ws"],
        //     enabledTransports: [ "ws"],
        // }
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
    }else if(startSocket == 0){
        socket.disconnect();
            console.log("Socket DIS--connect front----manually")
    }
}catch(err){
    console.log(err,"======try catch")
}
    }, [startSocket]); /* Remove startSocket after testing   */



    const joinRoom = (roomName) => {
        if (socket) {
            socket.emit('join', { room: roomName });
            setRoom(roomName);
            console.log("-------------------------Room joined ", roomName)
        }
    };

    const leaveRoom = () => {
        if (socket) {
            socket.emit('leave', { room });
            setRoom('');
            console.log("Left the room")
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
        socket?.on('welcome_message', (data) => {
            console.log('Received welcome message:', data.message);
        });
    }, [socket])

    useEffect(() => {
       

        socket?.on('message-chat', data => {
            setChkk(prevChkk => [...prevChkk, data.message])
            console.log(data.message)
        });
   
    }, [socket])



    const handleInputChange = async (e) => {
        await setInputValue(e.target.value)
    };

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
        }).then(res => {
            if (res.data === 'SubE') { setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") }
            else if (res.data == 'noid') { setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted") }
            else if (res.data[0] == 'Some Error Occured !!!!') { setLoading(false); setChatbotMsg("Some Error Occured !!!!"); setConsecFailMsg(prev => [...prev, res.data[1]]); setConsecFail(consecFail + 1) }
            else if (res.data == 'RDNF') { setLoading(false); setChatbotMsg("Relevant Data Not Found."); setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
            else if (res.data[1] == 'RDN') { setLoading(false); setChatbotMsg(res.data[0]); setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
            else { setChatbotMsg(res.data[0]); setConsecFail(0); setUniqueCon(0); console.log(messages, " === from backend"); setLoading(false) }
        })
            .catch(err => { setLoading(false); console.log(err); setConsecFail(consecFail + 1); setConsecFailMsg(prev => [...prev, err]); setChatbotMsg("Sorry, Some Error has Occured !!!! ") })
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
            .then(res => {
                if (res.data === 'SubE') { setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") } else if (res.data == 'noid') { setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted") } else if (res.data[0] == 'Some Error Occured !!!!') { setLoading(false); setChatbotMsg("Some Error Occured !!!!"); setConsecFail(consecFail + 1); setConsecFailMsg(prev => [...prev, res.data[1]]) } else if (res.data == 'RDNF') { setLoading(false); setChatbotMsg("Relevant Data Not Found."); setConsecFailMsg(prev => [...prev, "Relevant Data Not Found"]); setConsecFail(consecFail + 1) }
                else if (res.data[1] == 'RDN') { setLoading(false); setChatbotMsg(res.data[0]); setConsecFailMsg(prev => [...prev, res.data]); setConsecFail(consecFail + 1) }
                else { setChatbotMsg(res.data[0]); setConsecFail(0); console.log(messages, "=== backend www", res.data); setUniqueCon(0); setLoading(false); }
            }).catch(err => { setLoading(false); setConsecFail(consecFail + 1); console.log(err); setChatbotMsg("Sorry, Some Error has Occured !!!! "); setConsecFailMsg(prev => [...prev, err]) })
        scrollToBottom()

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
        axios.get(`${BACKEND}api/fontdata/${botID.botID}`).then(res => { setFontData(res.data); setSPrompt(res.data.sPrompt); setChatbotMsg(res.data.initialMsg); setPlan(res.data.plan); console.log(res.data.initialMsg, "=font api init") }).catch(err => console.log(err))
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
            console.log("speech tog  is set to ", speechTog)

        }
        setInputValue('');
        setChatbotMsg('')
        console.log("lllllllllllll")
        leaveRoom()
        scrollToBottom()

    }, [chatbotMsg])


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

    const handleEmbedQuestion=(e)=>{
        e.preventDefault()
        if(queE == '' || ansE == ''){
            toast.error('Fill both fields')
        }else{

            setLoading(true);
        axios.post(`${BACKEND}api/embedQuestion/${botID.botID}`, { queE ,ansE }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => {if(res.data === 'success'){console.log("--430-",res.data); toast.success('Questions embedded into the Knowledge Base'); setLoading(false);setAnsE('');setQueE('')}else{toast.error("Some Error Occured"); setLoading(false);setAnsE('');setQueE('')}}).catch(err => {console.log(err);toast.error("Some Error Occured !!!!"); setLoading(false);setAnsE('');setQueE('') })
        // .then(res => { if (res.data === 'Yes') { toast.success('Font Changes were successful'); setLoading(false); } else { toast.success('Some error occured'); setLoading(false); } }).catch((err) => { console.log("error manage bots ", err); toast.error('API request failed!'); setLoading(false); })
        }

    }

    return (
        <div className='row d-flex justify-content-around flex-wrap'>

            {/*  ############################### Font select form */}
            {/* <label className='fs-4 d-flex justify-content-center container text-center mb-1' style={{ height: '100%', color: '#FFFFFF' }} >{receivedMessages}</label>  */}

            <div style={{ backgroundColor: '#212529' }} className=' rounded-4 my-5 col-lg-5 col-10 d-flex justify-content-center '>
                <form className='d-flex row justify-content-around mt-3 ' onSubmit={handleFontSubmit}>
                    <div style={{ color: '#FFFFFF' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <label className='fs-4 d-flex justify-content-center container text-center mb-1' style={{ height: '100%', color: '#FFFFFF' }} >Update how your Chatbot looks</label>
                    </div>
                    <div style={{ color: '#FFFFFF' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <Form.Label>Font:</Form.Label>
                        <DropdownButton
                            title={fontData.font || 'Select a font'}
                            variant="secondary"
                            drop='down-centered'
                            id="dropdown-font"
                            onSelect={(eventKey) => handleFontChange({ target: { name: 'font', value: eventKey } })}
                        >
                            {fontOptions.map((fontOption) => (
                                <Dropdown.Item key={fontOption} eventKey={fontOption}>
                                    {fontOption}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <div style={{ color: '#FFFFFF' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <label>
                            User Font Color:
                            <input
                                type="color"
                                name="userFontColor"
                                value={fontData.userFontColor}
                                onChange={handleFontChange}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ color: '#FFFFFF' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <label>
                            User Text Color:
                            <input
                                type="color"
                                name="userFontTextColor"
                                value={fontData.userFontTextColor}
                                onChange={handleFontChange}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ color: '#FFFFFF' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <label>
                            CPU Font Color:
                            <input
                                type="color"
                                name="cpuFontColor"
                                value={fontData.cpuFontColor}
                                onChange={handleFontChange}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ color: '#FFFFFF' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <label>
                            CPU Text Color:
                            <input
                                type="color"
                                name="cpuFontTextColor"
                                value={fontData.cpuFontTextColor}
                                onChange={handleFontChange}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ color: '#FFFFFF' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <label>
                            Background Color:
                            <input
                                type="color"
                                name="backgroundColor"
                                value={fontData.backgroundColor}
                                onChange={handleFontChange}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ color: '#FFFFFF' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <label>
                            Font Size:
                            <input
                                type="number"
                                name="fontSize"
                                style={{ width: '60px' }}
                                value={fontData.fontSize}
                                onChange={handleFontChange}
                                required
                            />
                        </label>
                    </div>
                    <div className='col-8 col-sm-9 fs-5 rounded-3 text-center  py-2  my-3' >
                        <button className='btn btn-outline-warning px-5' type="submit">Submit</button>
                    </div>
                </form>
            </div>

            {/* ##################################### Chat UI DEMO */}

            {/* <button className='btn btn-outline-warning px-5' onClick={()=>setStartSocket(!startSocket)} type="submit">CONNECT TO SOCKET (REMOVE AFTER TESTING)</button> */}
            {/* <button className='btn btn-outline-warning px-5' onClick={()=>joinRoom(botID.botID)} type="submit">JOIN ROOM (REMOVE AFTER TESTING)</button> */}
            {/* <button className='btn btn-outline-warning px-5' onClick={()=>leaveRoom()} type="submit">LEAVE ROOM (REMOVE AFTER TESTING)</button> */}
            <div className='d-flex justify-content-center my-5 col-lg-5 col-11'>
            
                <div className='d-flex  ' style={{ position: 'relative', height: '600px', minWidth: '240px', maxWidth: '540px', width: '100%', marginTop: '100px' }}>
                    {
                        mark ?
                            <h1 className='bg-primary mx-3' style={{ position: 'absolute', opacity: '15%', left: '20px', bottom: '50px' }}>Powered by Zema</h1> : <p></p>
                    }
                    <div className="chat-container px-0" ref={chatContainerRef} style={{ backgroundColor: fontData.backgroundColor, height: '600px', paddingBottom: '100px', maxWidth: '540px', minWidth: '240px', width: '100%', borderWidth: '0px' }}>
                        <div className="chat-messages " >
                            {messages.map((message) => (
                                message.text === '' || null || undefined ? "" : <>
                                    <div
                                        key={message.id}
                                        className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                                        style={message.sender === 'me' ? messageStyleSend : messageStyleRec}
                                    >
                                        {/* <div id="text-container" className="message-content typing">{message.text}</div> */}
                                        <TypingEffect id="text-container" className="message-content " text={message.text} />
                                        {/* <p  id="text-container" className="message-content ">{message.text}</p> */}

                                    </div>
                                </>
                            ))}
                            {
                                chkk.length == 0 ? '' : <p style={messageStyleRec} className="message  received" >{chkk}</p>
                            }

                            {/* <label className='fs-4 d-flex justify-content-center container text-center mb-1' style={{ height: '100%', color: '#FFFFFF' }} >{chkk}</label>           */}

                            {loading ? (
                                <ThreeDots type="Oval" position="top-center" color="#3D4648" height={50} width={50} />

                            ) : (
                                ''
                            )}
                        </div>
                        {/* #######################3 suggested prompts */}
                        <div style={{ position: 'absolute', left: '20px', bottom: '50px', width: '75%' }}>
                            {suggestedPrompt === undefined || spromptHide === true ? '' : suggestedPrompt.map(x => (
                                <div className='received message' onClick={() => { handleSubmitP(x) }} value={x} style={{ backgroundColor: fontData.cpuFontColor, fontSize: fontData.fontSize, color: fontData.cpuFontTextColor, fontFamily: fontData.font, width: '75%' }}  >{x}</div>
                            ))}
                        </div>
                    </div>
                    <form className="chat-input mt-5" style={{ minHeight: '50px', height: '50px', maxWidth: '540px', minWidth: '240px', width: '100%', bottom: '-2px', position: 'absolute', backgroundColor: fontData.backgroundColor, borderColor: 'black', borderWidth: '2px' }} onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            style={{ minWidth: '50%' }}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                        />
                        {
                            plan === 'year-enterprise' || plan === 'year-standard' || plan === 'mnth-enterprise' || plan === 'year-standard' ?
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
                                </> : ''

                        }
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
            <div className='d-flex justify-content-center my-5 col-lg-8 col-11'>
            <form className='col-sm-9 mb-5 col-11 mx-auto ' style={{marginTop:'50px'}}>
              <div className="form-group d-flex justify-content-center mt-5 mb-5 fs-2 fw-bold ">
                <label className='text-center' style={{color:'white'}} >Embed specific questions</label>
              </div>
              <div className="form-group">
                <label style={{color:'white'}} >Question</label>
                <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' onChange={(e)=>setQueE(e.target.value)} value={queE} placeholder='Question' />
              </div>
              <div className="form-group">
                <label style={{color:'white'}} >Answer</label>
                <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={ansE} onChange={(e)=>setAnsE(e.target.value)} placeholder='Answer' />
              </div>
              <div className='form-group d-flex mt-5 justify-content-center'>
                <button className='btn btn-outline-warning  mb-3 px-5  ' onClick={(e)=>handleEmbedQuestion(e)}>Embed Questions</button>
              </div>
              <div className='form-group d-flex justify-content-center'>
                {loading ? (
                  <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
                ) : (
                  ''
                )}
              </div>
            </form>
             </div>   
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
        </div>
    )
}


export default ChatUIDemo;