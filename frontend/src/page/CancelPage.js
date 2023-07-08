import React from 'react'
import env from 'react-dotenv'

const CancelPage = () => {

  const BACKEND = 'http://localhost:5000/'

  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className="card" style={{width: '18rem', backgroundColor:'whitesmoke'}}>
  <div className="card-body">
    <h5 className="card-title">Payment was Cancelled</h5>
    <button type="button" className="btn btn-primary"><a href={BACKEND} style={{textDecoration:'none', color:'white'}} className="card-link">Back to Home page</a></button>
  </div>
</div>  
    </div>
  )
}

export default CancelPage