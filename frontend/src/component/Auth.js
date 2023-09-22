import * as jose from 'jose';
import Cookies from 'js-cookie';


export const getAccessToken = () => {

  const token = Cookies.get('accessToken');
  return token;
};

export const decodeToken = (token) => {
  try {
    // console.log("ENV - ",process.env.REACT_APP_JWT_SECRET_KEY)
    // console.log("Token = ",token)
   
    // const decoded = jose.decodeJwt(token,process.env.REACT_APP_JWT_SECRET_KEY);
    // const decoded = jose.decodeJwt(token,'notmysecretkey');
    // console.log("DEcoded =",decoded)
    console.log(token)
    const decoded = token
    return decoded;
    
  } catch (error) {
   
    return null;
  }
};

export const getAdminToken = () => {

  const adminToken= Cookies.get('adminToken');
  return adminToken;
};