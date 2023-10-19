import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import * as jose from 'jose';
import Cookies from 'js-cookie';
import Accordion from 'react-bootstrap/Accordion';
import { ThreeDots } from 'react-loader-spinner';

const PaymentSection1 = () => {

  // const token = document.cookie.split('=')[1]
  // const decoded = jose.decodeJwt(token, 'notmysecretkey');
  const decoded = Cookies.get('accessToken');
  const [dataArr, setDataArr] = useState([])
  const[sorted,setSorted]= useState('')
  const [apiload,setApiload] = useState(false)

  // const BACKEND = 'http://localhost:5000/'
  const BACKEND = 'https://zemaapi.zema.io/'

  useEffect(() => {
    setApiload(true)
    axios.post(`${BACKEND}api/paymenthistory`, { decoded }, {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
      .then(res => {setDataArr(res.data); setApiload(false)}).catch(err => {console.log(" error from mybots", err); setApiload(false)})
  }, [])

  useEffect(()=>{
      console.log(dataArr)
  },[dataArr])

  const [activeKey, setActiveKey] = useState(null);

  const handleAccordionChange = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <div div className='pb-5 px-3 ' style={{ backgroundColor: '#242439', height: '100%',minHeight:'70vh',width:'100vw' }}>
      <h1 className='fw-bolder col-12 d-flex justify-content-center container text-center mb-5 pt-5 mb-4' style={{ color: '#FFFFFF' }}>Payments History</h1>
      <div className='form-group d-flex justify-content-center mt-4'>
       {apiload ? (
          <ThreeDots type="Oval" position="top-center" color="#fff" height={50} width={50} />
         
        ) : (
          ''
        )}
        </div>
     {dataArr.sort((a, b) => new Date(b.created) - new Date(a.created)).map(x=>(

<Accordion
key={x.payment.id}
activeKey={activeKey}
onSelect={handleAccordionChange}
className='col-12 col-lg-11 my-3  mx-auto custom-accordion '
style={{marginRight:'0px'}}
>
<Accordion.Item eventKey={x.payment.id} className='accordhov' style={{ backgroundColor: '#212529', border: 'none' }}>
  <Accordion.Header className=''>
  <div className='row col-11'>
      <h6 className='col-lg-4 d-lg-block d-none'>{x.created}</h6>
      <h6 className='col-lg-4 col-6'>{x.product.product_id}</h6>
     <h6 className='col-lg-4 col-6'>{x.product.amount/100} {x.payment.currency}</h6>
      {/* <h5 className='col-4'>{x.payment.id}</h5> */}
     </div>
    <span style={{
      color: '#FFE459',
      position: 'absolute',
      right: '25px', // Adjust this value to fine-tune the position
      top: '50%',
      fontSize: '34px',
      transform: 'translateY(-50%)',
    }}>
      {activeKey === x.payment.id ? '-' : '+'}
    </span>
  </Accordion.Header>
  <Accordion.Body className='row col-sm-11 col-12' style={{ color: 'white' }}>
  <p style={{ color: 'white' }} className="my-1  col-lg-4 col-sm-8 text-break">
         {x.username}
       </p>
       <p style={{ color: 'white' }} className="my-1  col-lg-4 col-sm-4">
         {x.payment.name}
       </p>
       <p style={{ color: 'white' }} className="my-1 col-lg-4 col-sm-8 text-break">
         {x.payment.id}
       </p>
       <p style={{ color: 'white' }} className="my-1 d-lg-none d-block col-lg-4 col-sm-4 text-break">
         {x.created}
       </p>
       
  </Accordion.Body>
</Accordion.Item>
</Accordion>


))}


    </div>
  )
}

export default PaymentSection1