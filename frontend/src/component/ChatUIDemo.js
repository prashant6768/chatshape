
import React, { useEffect, useState, useRef } from 'react';
import '../../src/css/chatCss.css'
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
// import * as jose from 'jose';
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import sendIcon from '../assets/send.png'
// file_example_MP3_700KB
import lamejs from 'lamejs';

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


const ChatUIDemo = (botID) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [chatbotMsg, setChatbotMsg] = useState('');
    const[suggestedPrompt,setSPrompt]= useState([])
    const[spromptHide,setSpromptHide]=useState(false)
    const [plan, setPlan] = useState('')
    const [mark, setMark] = useState(false)
    const [loading, setLoading] = useState(false);
    const[uniqueCon,setUniqueCon]= useState(1)
    const[now,setNow]=useState('')
    const BACKEND = 'http://localhost:5000/'
    // const BACKEND = 'http://3.19.246.7'

    const handleInputChange = async (e) => {
        await setInputValue(e.target.value)
    };

    const handleSubmitP=(x)=>{
       
        if (x.trim() === '') {
            return;
        }
        setSpromptHide(true)

         const newMessage =  {
            id: messages.length + 1,
            text: x,
            sender: 'me',
        };
        let inputValue = x
        console.log(spromptHide)
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setLoading(true);
        axios.post(`${BACKEND}/api/msg`, { inputValue, botID,uniqueCon }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => { if (res.data === 'SubE') { setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") } else if (res.data == 'noid') { setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted") } else { setChatbotMsg(res.data[0]); setPlan(res.data[1]); setUniqueCon(0) ;console.log(messages," === from backend"); setLoading(false) } })
   
    }

    
    useEffect(()=>{
        if(uniqueCon === 1){
      setNow(new Date().toLocaleDateString()+ ' '+ new Date().toLocaleTimeString())
        }
    },[uniqueCon])

    const handleSubmit = async (e) => {
    
        e.preventDefault();
        setSpromptHide(true)
        if (inputValue.trim() === '') {
            return;
        }

         const newMessage =  {
            id: messages.length + 1,
            text: inputValue,
            sender: 'me',
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setLoading(true);
        axios.post(`${BACKEND}/api/msg`, { inputValue, botID,uniqueCon }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        // .then(res => console.log(res.data," === from backend ")).catch(err => console.log(err))
        .then(res => { if (res.data === 'SubE') { setLoading(false); setChatbotMsg("Your services in the plan have expired. Kindly upgrade") } else if (res.data == 'noid') { setLoading(false); setChatbotMsg("Sorry, This Bot has been deleted") } else { setChatbotMsg(res.data[0]); setPlan(res.data[1]); console.log(messages,"=== backend www", res.data); setUniqueCon(0) ; setLoading(false) } }).catch(err => console.log(err))
    };

    useEffect(()=>{
      console.log("111111==",messages)
      const filteredArray = messages.filter(item => item.text !== '');
      const processedArray = filteredArray.map(({ id, ...x }) => x);
      console.log("222== ",processedArray)
      axios.post(`${BACKEND}api/history`, { botID,processedArray,now,uniqueCon }, {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }).then(res => console.log(res.data," === from backend message history ")).catch(err => console.log(err))
    },[chatbotMsg])

    useEffect(()=>{
       axios.get(`${BACKEND}/api/fontdata/${botID.botID}`).then(res => {setFontData(res.data); setSPrompt(res.data.sPrompt) ;setChatbotMsg(res.data.initialMsg); console.log(res.data.initialMsg,"=font api init")}).catch(err => console.log(err))
    console.log(suggestedPrompt)
    },[])


    useEffect(() => {
        const newMessage = {
            id: messages.length + 1,
            text: chatbotMsg,
            sender: '',
        };
        if (chatbotMsg === '' && chatbotMsg === null && chatbotMsg === []) {
            console.log("W")
        } else {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
        setInputValue('');
        setChatbotMsg('')

    }, [chatbotMsg])

    useEffect(() => {
        if (plan === 'year-pro' || plan === 'month-pro' || plan === '') {
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
        axios.put(`${BACKEND}/api/fontdata/${botID.botID}`,{fontData},{
            'Content-type':'application/json', 
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*'
      }).then(res => {if(res.data === 'Yes'){toast.success('Font Changes were successful');  setLoading(false);}else{toast.success('Some error occured');  setLoading(false);}}).catch((err)=>{console.log("error manage bots ",err); toast.error('API request failed!'); setLoading(false);})
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
    }}
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

      useEffect(()=>{
        if(audio !== null){
            const formData = new FormData();
            formData.append('audio', audio, 'recording.webm');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
              }
       
        axios.post(`${BACKEND}api/audio`,  formData, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => console.log(res.data)).catch(err => console.log(err))
    }
      },[audio])


    return (
        <div className='row d-flex justify-content-around flex-wrap'>

{/*  ############################### Font select form */}

            <div style={{ backgroundColor: '#212529', border: '1px solid #4A5AB0' }} className=' rounded-5 my-5 col-lg-5 col-11 d-flex justify-content-center '>
                <form className='d-flex row justify-content-around mt-3 ' onSubmit={handleFontSubmit}>
                    <div  style={{ color: '#FFFFFF', backgroundColor: '#171725', border:'1px solid #4A5AB0' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
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
                    <div  style={{ color: '#FFFFFF', backgroundColor: '#171725', border:'1px solid #4A5AB0' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
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
                    <div  style={{ color: '#FFFFFF', backgroundColor: '#171725', border:'1px solid #4A5AB0' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
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
                    <div  style={{ color: '#FFFFFF', backgroundColor: '#171725', border:'1px solid #4A5AB0' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
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
                    <div  style={{ color: '#FFFFFF', backgroundColor: '#171725', border:'1px solid #4A5AB0' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
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
                    <div  style={{ color: '#FFFFFF', backgroundColor: '#171725', border:'1px solid #4A5AB0' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
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
                    <div  style={{ color: '#FFFFFF', backgroundColor: '#171725', border:'1px solid #4A5AB0' }} className='col-10 col-sm-8 fs-5 rounded-3 text-center  py-2  my-3' >
                        <label>
                            Font Size:
                            <input
                                type="number"
                                name="fontSize"
                                style={{width:'60px'}}
                                value={fontData.fontSize}
                                onChange={handleFontChange}
                                required
                            />
                        </label>
                    </div>
                    <div  className='col-8 col-sm-9 fs-5 rounded-3 text-center  py-2  my-3' >
                        <button className='btn btn-outline-warning px-5'  type="submit">Submit</button>
                    </div>
                </form>
            </div>

{/* ##################################### Chat UI DEMO */}

            <div className='d-flex justify-content-center my-5 col-lg-5 col-11'>
                <div className='d-flex  ' style={{ position: 'relative', height: '600px', minWidth: '240px', maxWidth: '540px', width: '100%' }}>
                    {
                        mark ?
                            <h1 className='bg-primary mx-3' style={{ position: 'absolute', opacity: '15%', left: '20px', bottom: '50px' }}>Powered by Zema</h1> : <p></p>
                    }
                    <div className="chat-container px-0" style={{ backgroundColor: fontData.backgroundColor, height: '600px', paddingBottom: '100px', maxWidth: '540px', minWidth: '240px', width: '100%', borderWidth: '0px' }}>
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
                            {loading ? (
                                <ThreeDots type="Oval" position="top-center" color="#3D4648" height={50} width={50} />

                            ) : (
                                ''
                            )}
                        </div>
                        {/* #######################3 suggested prompts */}
                        <div style={{ position: 'absolute',  left: '20px', bottom: '50px', width:'75%'}}>
                        { suggestedPrompt === undefined || spromptHide === true ? '': suggestedPrompt.map(x =>(
                        <div  className='received message' onClick={()=>{handleSubmitP(x)}} value={x}  style={{  backgroundColor: fontData.cpuFontColor, fontSize: fontData.fontSize, color: fontData.cpuFontTextColor, fontFamily: fontData.font, width:'75%'  }}  >{x}</div>
                        ))}
                        </div>
                        </div>
                    <form className="chat-input mt-5" style={{ minHeight: '50px', height: '50px', maxWidth: '540px', minWidth: '240px', width: '100%', bottom: '-2px', position: 'absolute', backgroundColor: fontData.backgroundColor, borderColor: 'black', borderWidth: '2px' }} onSubmit={(e)=>handleSubmit(e)}>
                        <input
                            type="text"
                            style={{ minWidth: '50%' }}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                        />
                        
  {/* <button className="btn btn-outline-secondary me-2" onClick={getMicrophonePermission}  type="button" id="button-addon2">B</button> */}
  <div className="audio-controls me-2">
    {!permission ? (
    <button onClick={getMicrophonePermission} type="button">
        P
    </button>
    ) : null}
    {permission && recordingStatus === "inactive" ? (
    <button onClick={startRecording} type="button">
        R
    </button>
    ) : null}
    {recordingStatus === "recording" ? (
    <button onClick={stopRecording} type="button">
        S
    </button>
    ) : null}
</div>

                        <button type="submit" ><img src={sendIcon} alt='Send' style={{ height: '22px', width: '25px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /></button>
                        {/* <button type="submit" ><img src="https://icons.veryicon.com/png/o/internet--web/iview-3-x-icons/ios-send.png" style={{ height:'25px', width:'40px', backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/></button> */}
                    </form>
                    {audio ? (
  <div className="audio-container">
     <audio src={audio} controls></audio>
     <a download href={audio}>
        Download Recording
     </a>
   </div>
) : null}
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
        </div>
    )
}


export default ChatUIDemo;