import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Dropdown } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

const SectionOneManageBotSA = () => {

    // const BACKEND = 'http://localhost:5000/'
      const BACKEND = 'https://zemaapi.zema.io/'


    const [embedScript, setEmbedScript] = useState('')
    const [data, setData] = useState('')
    const [apiload,setApiload] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(embedScript)
        setLoading(true)

        axios.post(`${BACKEND}api/editmanagesa`, { embedScript, rangeV, rangeVN, ss }, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => { if(res.data === 'success'){toast.success("Edits made Successfully"); setLoading(false)}else{toast.error('Some error occured'); setLoading(false)}}).catch(err => {console.log(err); toast.error('Some Error Occured'); setLoading(false)})
    }

    useEffect(() => {
        setApiload(true)
        axios.post(`${BACKEND}api/getmanagesa`, {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).then(res => { if(res.data[0] === 'ok'){setData(res.data[1]);setApiload(false)}else{console.log(res.data);setApiload(false)} }).catch(err => {console.log(err); setApiload(false)})

    }, [])

    useEffect(() => {
        setEmbedScript(data.embedScript)
        setRangeV(data.model_temp)
        setRangeVN(data.docSrch)
        setSs(data.sssm)
        console.log(data.sssm, "00000")
    }, [data])



    const [rangeV, setRangeV] = useState(1)

    const handleRangeChange = (event) => {
        const newValue = parseFloat(event.target.value);
        setRangeV(newValue);
    };

    const [rangeVN, setRangeVN] = useState(1)

    const handleRangeChangeN = (event) => {
        const newValue = parseFloat(event.target.value);
        setRangeVN(newValue);
    };

    const ref = useRef()

    const [ss, setSs] = useState('')

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (value) => {
        setSs(value); // Update ss with the selected value
        toggleDropdown(); // Close the dropdown after an item is clicked
    };

    useEffect(() => {
        console.log(rangeV, "++++++++++++", ss)
    }, [ss])

    const [loading,setLoading]= useState(false)


    return (
        <div className='pb-5' style={{ backgroundColor: '#171725', height: '100%', minHeight: '100vh', width: '100vw' }}>
            <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center pt-5 mb-4' style={{ color: '#FFFFFF' }}>Manage</h1>

            <div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>

            <form className=' col-12 d-flex justify-content-center flex-wrap my-5'>
                <div className="form-group col-9 my-3">
                    <label className='d-flex justify-content-center fs-4' style={{ color: '#FFFFFF' }}>Embed Script{' (Don\'t Remove ${id.id} )'}</label>
                    <textarea className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={embedScript} onChange={(e) => { setEmbedScript(e.target.value) }} placeholder='Embed Script' />
                </div>

                <div className="form-group col-9 my-3">
                    <label className='d-flex justify-content-center fs-4' style={{ color: '#FFFFFF' }}>Model Temperature</label>
                    <input
                        className='col-11'
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={rangeV}
                        onChange={handleRangeChange}
                    />
                    <span className=' fs-4' style={{ color: '#FFFFFF' }}>{rangeV}</span>
                </div>

                <div className="form-group col-9 my-3">
                    <label className='d-flex justify-content-center fs-4' style={{ color: '#FFFFFF' }}>No. of Documents searched</label>
                    <input
                        className='col-11'
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={rangeVN}
                        onChange={handleRangeChangeN}
                    />
                    <span className=' fs-4' style={{ color: '#FFFFFF' }}>{rangeVN}</span>
                </div>

                <div className="form-group col-9 my-3">
                    <label className='d-flex justify-content-center fs-4' style={{ color: '#FFFFFF' }}>Semantic Search Similarity Metric</label>
                    <div className="input-group mb-3 mx-2 col-9" style={{  }}>
                        <input type="text" value={ss}  className="form-control col-lg-6" placeholder="Semantic Search Similarity Metric" />
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2"  onClick={toggleDropdown}>Select</button>
                    </div>
                    <Dropdown ref={ref} show={isOpen}>
                        {/* <div className='fw-bolder mx-3 mt-2 underline-grow' style={{ color: '#FFFFFF' }} id="dropdown-basic">
                            <input className='fs-4 d-flex justify-content-center container mt-1 text-center mb-3' value={ss} placeholder='Semantic Search Similarity Metric' />
                        </div> */}

                        <Dropdown.Menu >
                            <Dropdown.Item onClick={() => handleItemClick('ip')}>IP</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleItemClick('cosine')}>Cosine</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleItemClick('l2')}>L2</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className='form-group flex-wrap d-flex justify-content-center col-9 '>
                    <button className='btn btn-outline-warning px-5' onClick={(e) => { handleSubmit(e) }}>Submit</button>
                </div>
                <div className='form-group col-12 d-flex justify-content-center'>
       {loading ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
       </div>
               
            </form>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
        </div>
    )
}

export default SectionOneManageBotSA