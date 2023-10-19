
import React, { useEffect, useState, useRef } from 'react';
import '../../src/css/chatCss.css'
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
// import * as jose from 'jose';
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import Accordion from 'react-bootstrap/Accordion';
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
    const [loadingI, setLoadingI] = useState(false);
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
    const BACKEND = 'https://zemaapi.zema.io/'
    const BACKENDWS = 'wss://zemaapi.zema.io/'



    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState('');



//     useEffect(() => {
//         try{
//         console.log("startSocket-",startSocket)
//         if(startSocket == 1){
//         const newSocket = socketIO.connect(BACKENDWS
//             , {
//             transports: [ "wss"],
//             enabledTransports: [ "wss"],
//         }
//         );
//         console.log("----------------------------Socket connect front",BACKEND)
//         setSocket(newSocket);
//         newSocket.on("connect", () => {
//             console.log("-----------------Socket connected on the front end");
//         });
//         newSocket.on("error", (error) => {
//             console.error("--------------Socket error on the front end:", error);
//         });
//         return () => {
//             if(newSocket.readyState === 1){  /** Remove if statement if error ,-------------------------- */
//                 newSocket.disconnect();
//                 console.log("Socket DIS--connect front------return one--")
//             }
//         };
//     }else if(startSocket == 0){
//         socket.disconnect();
//             console.log("Socket DIS--connect front----manually")
//     }
// }catch(err){
//     console.log(err,"======try catch")
// }
//     }, []); /* Remove startSocket after testing   */

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
    // useEffect(() => {
    //     socket?.on('test', data => {
    //         console.log(data.message,"===========from backend test====")
    //     });
    //     socket?.on('testRoom', data => {
    //         console.log(data.message,"===========from backend test room====")
    //     });
   
    // }, [socket])

    

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
            console.log(data.message)
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
        setLoading(true);
        scrollToBottom()
        axios.post(`${BACKEND}api/msg`, { inputValue, botID, uniqueCon }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        // .then(res => console.log("=============================",res.data,"================"))
        .then(res => {
            if (res.data === 'SubE') { setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") }
            else if (res.data == 'noid') { setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted") }
            else if (res.data[0] == 'Some Error Occured !!!!') { setLoading(false);console.log("-------111111-----",res.data); setChatbotMsg("Some Error Occured !!!5!"); setConsecFailMsg(prev => [...prev, res.data[1]]); setConsecFail(consecFail + 1) }
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

    const[apiload,setApiload] = useState(false)

    useEffect(() => {
        setApiload(true)
        axios.get(`${BACKEND}api/fontdata/${botID.botID}`).then(res => { setFontData(res.data); setSPrompt(res.data.sPrompt); setChatbotMsg(res.data.initialMsg); setPlan(res.data.plan); console.log(res.data.initialMsg, "=font api init"); setApiload(false) }).catch(err => {console.log(err); setApiload(false)})
        console.log(suggestedPrompt)
    }, [])


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

    const handleIssue=(e)=>{
        e.preventDefault()
        if(issue == '' || detailIssue == ''){
            toast.error('Fill both fields')
        }else{
            setLoadingI(true);
        axios.post(`${BACKEND}api/issue/${botID.botID}`, { issue ,detailIssue }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => {if(res.data === 'success'){console.log("--430-",res.data); toast.success('Feedback / Issue submitted'); setLoadingI(false);setIssue('');setDetailIssue('')}else{toast.error("Some Error Occured"); setLoadingI(false);setIssue('');setDetailIssue('')}}).catch(err => {console.log(err);toast.error("Some Error Occured !!!!"); setLoadingI(false);setIssue('');setDetailIssue('') })
        }

    }

    const[issue,setIssue]=useState('')
    const[detailIssue,setDetailIssue]=useState('')
    const [embedDB,setEmbedDB] = useState([])
    const [embeddedQA,setEmbeddedQA]= useState([])
    const [embeddedQASaved,setEmbeddedQASaved] = useState([])


    useEffect(() => {
        axios.get(`${BACKEND}api/updatebot/${botID.botID}`, {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }).then(res => { console.log("====================================",res.data);setEmbeddedQA(res.data.embeddedQA);setEmbeddedQASaved(res.data.embeddedQAsaved) })
      }, [])

    //   useEffect(() => {
    //     setEmbeddedQASaved(embedDB.embeddedQASaved)
    //     console.log("---131----", embedDB.embeddedQA)
    //   }, [embedDB])

    const [buttonClicked, setButtonClicked] = useState({});
    

    const handleEmbedQuestionA=(e,qa)=>{
        e.preventDefault()
        
        if (!buttonClicked[qa.question]) {
            setButtonClicked((prevState) => ({
              ...prevState,
              [qa.question]: true,
            }));
          }

        console.log("QA ",qa.question)
        const queE = qa.question
        const ansE = qa.answer

            setLoading(true);
        axios.post(`${BACKEND}api/embedQuestion/${botID.botID}`, { queE ,ansE }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => {if(res.data === 'success'){console.log("--430-",res.data); toast.success('Questions embedded into the Knowledge Base'); setLoading(false);setAnsE('');setQueE('')}else{toast.error("Some Error Occured"); setLoading(false);setAnsE('');setQueE('')}}).catch(err => {console.log(err);toast.error("Some Error Occured !!!!"); setLoading(false);setAnsE('');setQueE('') })
    }

    const handleEmbedSavedRemove=(e,qa)=>{
        e.preventDefault()

        if (!buttonClicked[qa.question]) {
            setButtonClicked((prevState) => ({
              ...prevState,
              [qa.question]: true,
            }));
          }

        console.log("QA ",qa.question)
        const queE = qa.question
        const ansE = qa.answer



            setLoading(true);
        axios.post(`${BACKEND}api/embedQuestionSavedRemove/${botID.botID}`, { queE ,ansE }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => {if(res.data === 'success'){console.log("--430-",res.data); toast.success('Removed'); setLoading(false);setAnsE('');setQueE('')}else{toast.error("Some Error Occured"); setLoading(false);setAnsE('');setQueE('')}}).catch(err => {console.log(err);toast.error("Some Error Occured !!!!"); setLoading(false);setAnsE('');setQueE('') })
    }

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const toggleAccordion = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };

    const [isAccordionOpen2, setIsAccordionOpen2] = useState(false);

    const toggleAccordion2 = () => {
      setIsAccordionOpen2(!isAccordionOpen2);
    };

    return (
        <div className='row d-flex justify-content-around flex-wrap'>

<div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>

            {/*  ############################### Font select form */}
            {/* <label className='fs-4 d-flex justify-content-center container text-center mb-1' style={{ height: '100%', color: '#FFFFFF' }} >{receivedMessages}</label>  */}

            <div style={{ backgroundColor: '#212529' }} className=' rounded-4 my-5 col-lg-5 col-10 d-flex justify-content-center '>
                <form className='d-flex row justify-content-around mt-3 ' style={{width:''}} onSubmit={handleFontSubmit}>
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

<div style={{backgroundColor:'#242439', paddingBottom:'50px'}}>
            <div className='d-flex justify-content-center mx-auto my-5 col-lg-8 col-11'>
            <form className='col-sm-9 mb-5 col-11 mx-auto ' style={{marginTop:'50px'}}>
              <div className="form-group d-flex justify-content-center flex-wrap mt-5 mb-5 fs-2 fw-bold ">
                <label className='text-center col-12' style={{color:'white'}} >Embed specific questions</label>
                <label className='text-center  fs-6' style={{color:'white'}} >(Works best with multiple line/ detailed answers)</label>

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

                  {
            embeddedQA && embeddedQA.length > 0 && (
              <>
                {/* <label className='fs-4 d-flex justify-content-center container text-center mb-3' style={{ height: '100%', color: '#FFFFFF' }}>
                  Embedded Q/A
                </label> */}
                <Accordion alwaysOpen='false' className='col-11 my-2 mx-auto custom-accordion' style={{ marginBottom: '100px'}}
                 activeKey={isAccordionOpen ? '0' : null}
                 onSelect={toggleAccordion}
                >
                  <Accordion.Item eventKey="0" style={{ backgroundColor: '#212529', border: '1px solid #171725' }} >
                    <Accordion.Header >
                    <label className='fs-4 d-flex justify-content-center container text-center' style={{ height: '100%', color: '#FFFFFF' }}>
                  Embedded Q/A
                </label>
                <span style={{
                  color: '#FFE459',
                  position: 'absolute',
                  right: '25px', // Adjust this value to fine-tune the position
                  top: '50%',
                  fontSize: '34px',
                  transform: 'translateY(-50%)',
                }}>
                  {isAccordionOpen? '-' : '+'}
                </span> 
                    </Accordion.Header>
                    <Accordion.Body style={{ color: 'white', backgroundColor: '#171725' }} >
                      {embeddedQA.map((item, index) => (
                        <>
                          <div key={index} className='mt-5'>
                            <input
                              className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3'
                              style={{ width: '95%' }}
                              readOnly
                              placeholder='Embedded Q/A'
                              value={item.question}
                            />
                            <textarea
                              className='fs-4 d-flex justify-content-center container mt-1 text-center mb-5'
                              style={{ width: '95%' }}
                              readOnly
                              placeholder='Embedded Q/A'
                              value={item.answer}
                            />
                          </div>
                        </>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>
            )
          } 


{
  embeddedQASaved && embeddedQASaved.length > 0 && (
    <>
      {/* <label className='fs-4 d-flex justify-content-center container text-center mb-3 mt-3' style={{ height: '100%', color: '#FFFFFF' }}>
        Embedded Q/A Saved
      </label> */}
      <Accordion alwaysOpen='false' className='col-11 my-4 mx-auto custom-accordion' style={{ marginBottom: '100px'}}
                  activeKey={isAccordionOpen2 ? '0' : null}
                  onSelect={toggleAccordion2}
      >
        <Accordion.Item eventKey="0" style={{ backgroundColor: '#212529', border: '1px solid #171725' }} >
          <Accordion.Header >
          <label className='fs-4 d-flex justify-content-center container text-center ' style={{ height: '100%', color: '#FFFFFF' }}>
        Embedded Q/A Saved
      </label>
      <span style={{
                  color: '#FFE459',
                  position: 'absolute',
                  right: '25px', // Adjust this value to fine-tune the position
                  top: '50%',
                  fontSize: '34px',
                  transform: 'translateY(-50%)',
                }}>
                  {isAccordionOpen2? '-' : '+'}
                </span> 
          </Accordion.Header>
          <Accordion.Body style={{ color: 'white',backgroundColor: '#171725' }} >
            {embeddedQASaved.map((itemSaved, index) => {
              const isCommon = embeddedQA.some(item => item.question === itemSaved.question && item.answer === itemSaved.answer);
              return (
                <div  className='my-5' key={index}>
                  <div>
                    <input
                      className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3'
                      style={{ width: '95%' }}
                      readOnly
                      placeholder='Embedded Q/A'
                      value={itemSaved.question}
                    />
                    <input
                      className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3'
                      style={{ width: '95%' }}
                      readOnly
                      placeholder='Embedded Q/A'
                      value={itemSaved.answer}
                    />
                  </div>
                  <div className='d-flex flex-wrap justify-content-center'>
                    <button
                      className='btn btn-outline-warning px-5 my-1 mx-3'
                      onClick={(e)=> handleEmbedQuestionA(e, itemSaved)}
                      disabled={buttonClicked[itemSaved.question] || isCommon}
                    >
                      Embed Question
                    </button>
                    <button className='btn btn-outline-danger px-5 my-1 mx-3'
                     onClick={(e)=> handleEmbedSavedRemove(e, itemSaved)}
                     disabled={buttonClicked[itemSaved.question] || isCommon}
                    >Remove Question</button>
                  </div>
                </div>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
</div>

             <div className='d-flex justify-content-center my-5 col-lg-8 col-11'>
            <form className='col-sm-9 mb-5 col-11 mx-auto ' style={{marginTop:'50px'}}>
              <div className="form-group d-flex justify-content-center mt-5 mb-5 fs-2 fw-bold ">
                <label className='text-center' style={{color:'white'}} >Feedback or Issues</label>
              </div>
              <div className="form-group">
                <label style={{color:'white'}} >Feedback / Issue</label>
                <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' onChange={(e)=>setIssue(e.target.value)} value={issue} placeholder='Feedback / Issue' />
              </div>
              <div className="form-group">
                <label style={{color:'white'}} >Details</label>
                <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={detailIssue} onChange={(e)=>setDetailIssue(e.target.value)} placeholder='Details' />
              </div>
              <div className='form-group d-flex mt-5 justify-content-center'>
                <button className='btn btn-outline-warning  mb-3 px-5  ' onClick={(e)=>handleIssue(e)}>Submit</button>
              </div>
              <div className='form-group d-flex justify-content-center'>
                {loadingI ? (
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