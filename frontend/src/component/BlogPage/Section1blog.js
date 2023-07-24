import React,{useEffect} from 'react'
import '../BlogPage/gradientCss.css'
import Cookies from 'js-cookie'

const Section1blog = () => {

useEffect(()=>{
  const decoded = Cookies.get('accessToken');
  console.log(decoded)
},[])

  return (
    <div className='pb-5 sectionOneGradient ' style={{ backgroundColor: '#242439', height: '100%',width:'100vw' }}>
               <h1 className='fs-1 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-5' style={{ color: '#FFFFFF' }}>The Blog</h1>
               <p className='fs-4 col-12 d-flex justify-content-center container text-center mb-0 pb-5 pt-2' style={{ color: '#FFFFFF' }}>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias iure exercitationem repellat eveniet inventore nisi necessitatibus eius aliquid natus possimus."</p>         
    </div>
  )
}

export default Section1blog