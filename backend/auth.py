from flask import Blueprint, current_app
from flask import Flask, render_template, redirect, url_for, flash , request, make_response, session, abort
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length
from flask_login import LoginManager, UserMixin, login_user, current_user, logout_user
from pymongo import MongoClient
from dotenv import find_dotenv, load_dotenv
from flask_cors import CORS
import os
import requests
from flask import session
from flask_bcrypt import Bcrypt
import jwt
from pymongo.errors import OperationFailure
import pathlib

import base64


from google.auth.transport import requests

# from jose import jwt

from flask_mail import Mail, Message
import random
import smtplib, ssl

from datetime import date
from datetime import datetime
from dateutil.relativedelta import relativedelta

from flask import session

import time    

from google_auth_oauthlib.flow import Flow
from flask import url_for, render_template
from google.auth.transport import requests as google_auth_requests
from google.auth.transport.requests import Request


# client = MongoClient('mongodb://localhost:27017/')

load_dotenv(find_dotenv())
SECRET_KEY = os.getenv("SECRET_KEY")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
MONGO = os.getenv("MONGO")
EMAILPASS = os.getenv("EMAILPASS")
AUTH_FILE_SECRET_KEY = os.getenv("AUTHFILE_SECRET_KEY")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
SESSION_SECRET = os.getenv("SESSION_SECRET")
pageURL = 'http://localhost:3000'
pageBackendURL = 'http://localhost:5000/'

client = MongoClient(MONGO)
db = client['chatbot']

auth = Blueprint("auth",__name__)
application = Flask(__name__)


auth.secret_key = AUTH_FILE_SECRET_KEY



# auth.config['SECRET_KEY'] = SECRET_KEY
bcrypt = Bcrypt()

CORS(auth, origins=pageURL) 
application.secret_key = os.getenv("SESSION_SECRET_1")
CORS(application, origins=pageURL)
from google.auth import exceptions as google_auth_exceptions
from google.auth.transport import requests as google_auth_requests
from google.oauth2 import id_token

default_sub = {
    'amount':0,
    'plan':'Free',
    # 'NoOfMsg':20,
    'NoOfBots':1,
    'tokens':100,
    'NoOfCharacters':10000,
}

@auth.route("/googlelogin")
def login_google():
    print("----------------------")
    flow = Flow.from_client_secrets_file(
        "client_secret.json",
        scopes=["openid", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
        redirect_uri= os.getenv("GOOGLE_REDIRECT_URI"),
    )
    print("PPPPPPPPPPPPP")
    authorization_url, state = flow.authorization_url(
        prompt="consent",
        # response_type="code"
    )

    
    # session["oauth_state"] = state
    # state2 = session.pop("oauth_state", None)
    # print("121---------------------state2",state2)

    # print("120------------------state",state)
    print("124-----------------redirect--------",authorization_url)
    
    return authorization_url



@auth.route("/callback")
def callback_google():
    print("State------------------127-----------")

    flow = Flow.from_client_secrets_file(
        "client_secret.json",
        scopes=["openid", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
        redirect_uri= pageBackendURL+"auth/callback",
    )
    flow.fetch_token(authorization_response=request.url)


    request_obj = requests.Request()
    print("-----122-----",request )

    id_info = id_token.verify_oauth2_token(
        flow.credentials.id_token,
        requests.Request(),
        os.getenv("GOOGLE_CLIENT_ID"),
        clock_skew_in_seconds=10,
        )
    print("165-------------------------",id_info)
    email = id_info["email"]
    name = id_info.get("name", email.split("@")[0])
    username = id_info.get("email")
    
    print("169----------------------------------------------------------------------",username)

    #login
    users_collection = db['users']
    if users_collection.find_one({'username': username}) == None:
        user_data = {
            'username': username,
            'password': '',
            'phone': '',
            'name':name,
            'created' :datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
             'otpSer':'',
             'verifyFlag': "Y",
                     }
        users_collection.create_index("username", unique=True)
        users_collection.insert_one(user_data) 

        users_subscription = db['user_subscription']
        created = datetime.now().date().strftime("%Y-%m-%d")
        expire = datetime.now().date()+relativedelta(years=1)
        expired = expire.strftime("%Y-%m-%d")
        
        user_sub_data={
            'plan-Info':default_sub,
            'username':user_data['username'],
            'created':created,
            'expiration':expired ,
        }
        users_subscription.create_index("username", unique=True)
        users_subscription.insert_one(user_sub_data)

        redirect_url = pageURL+'/login' 
        redirect_url += '?access_token=' + username
        redirect_url += '&sl=' + 's'
        try:
            smtp_server = "smtp.gmail.com"
            port = 587  # For starttls
            # port = 465   #---------------------------------for SSL setting
            sender_email = "thedummydog@gmail.com"
            password = EMAILPASS
            email_headers = f"Subject: Welcome to Zema\r\n"
            email_headers += f"From: {sender_email}\r\n"
            email_headers += "Content-Type: text/html; charset=utf-8\r\n" 
            email_headers += "\r\n"
            image_url = "https://raw.githubusercontent.com/Aniket-Shival/popup/Aniket-Shival-mic-2/Zema_Bird_Transperent.png"

            message = f"""
<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
  <div style="margin: 50px auto; width: 70%; padding: 20px 0">
    <div style="border-bottom: 1px solid #eee">
      <img src="{image_url}" style="max-width: 100px; display: block; margin: 10px auto;" alt='Zema Logo'/>
      <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Zema</a>
    </div>
    <p style="font-size: 1.1em">Hi,</p>
    <p>Thank you for choosing Zema. We're thrilled to have you on board!</p>
    <p style="font-size: 0.9em;">Regards,<br />Zema Team</p>
    <hr style="border: none; border-top: 1px solid #eee" />
    <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
      <p>Zema</p>
    </div>
  </div>
</div>
            """
            email_message = email_headers + message
            context = ssl.create_default_context()

            try:
                # server = smtplib.SMTP_SSL(smtp_server,port)
                server = smtplib.SMTP(smtp_server,port)
                server.ehlo() # Can be omitted
                server.starttls(context=context) # Secure the connection # REMOVE IT IN SSL SETTING---------------------------
                server.ehlo() # Can be omitted
                server.login(sender_email, password)
                server.sendmail(sender_email, username, email_message)
                # TODO: Send email here
            except Exception as e:
                # Print any error messages to stdout
                return str(e)+"AAAAA"
                print(e)
            finally:
                server.quit() 
        except Exception as e:
            return str(e)

        return redirect(redirect_url)           

    else:
        redirect_url =  pageURL+'/login' 
        redirect_url += '?access_token=' + username
        redirect_url += '&sl=' + 'l'
        return redirect(redirect_url)
    
    return "Auth Failed"


def create_jwt_token(username):
    payload = {
        'username': username,       
    }
    # print("AAAAAAAAAAAAAA ====== ",JWT_SECRET_KEY)
    token = jwt.encode(payload = payload,key= JWT_SECRET_KEY)
   
    return token

def verify_jwt_token(token):
    try:
        payload = jwt.verify(token, JWT_SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


@auth.route('/signup', methods=[ 'POST'])
def signup():
    try:
        if request.method == 'POST':
       
            username = request.get_json()['username']
            passwordUser = request.get_json()['password']
            nameUser = request.get_json()['name']
            phone = request.get_json()['phone']

            users_collection = db['users']
            userExist = users_collection.find_one({'username': username})

            if userExist:
                if userExist['verifyFlag'] == 'N':
                    users_collection.delete_one({'username': username})
                print("-----209")
                if userExist['verifyFlag'] != 'N':
                    return "User Exists"


            otp_store = {}
            otp = random.randint(100000, 999999)
            otp_store[username] = otp
  
            otpSer = otp
            # session['otpSer_s'] = otp
            smtp_server = "smtp.gmail.com"
            port = 587  # For starttls
            # port = 465   #---------------------------------for SSL setting
            sender_email = "thedummydog@gmail.com"
            password = EMAILPASS
            email_headers = f"Subject: Zema Signup OTP\r\n"
            email_headers += f"From: {sender_email}\r\n"
            email_headers += "Content-Type: text/html; charset=utf-8\r\n" 
            email_headers += "\r\n"
            image_url = "https://raw.githubusercontent.com/Aniket-Shival/popup/Aniket-Shival-mic-2/Zema_Bird_Transperent.png"
            # logo_img = None

            # with open('assets/Zema_Logo_Transperent.png', 'rb') as image_file:
            #     logo_img = base64.b64encode(image_file.read()).decode()
            message = f"""
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                         <img src="{image_url}" style="max-width: 100px; display: block; margin: 10px auto;" alt='Zema Logo'/>
                         <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zema</a>
                     </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing Zema. Use the following OTP to complete your Sign Up procedures.</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Zema</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                      <p>Zema</p>
                    </div>
                </div>
            </div>
            """.format(otp=otp)

            # email_message = email_headers + message


            # message = "Your OTP for Zemo signup is "+str(otp)
            email_message = email_headers + message

            # Create a secure SSL context
            context = ssl.create_default_context()

            # Try to log in to server and send email
            try:
                # server = smtplib.SMTP_SSL(smtp_server,port)
                server = smtplib.SMTP(smtp_server,port)
                server.ehlo() # Can be omitted
                server.starttls(context=context) # Secure the connection # REMOVE IT IN SSL SETTING---------------------------
                server.ehlo() # Can be omitted
                server.login(sender_email, password)
                server.sendmail(sender_email, username, email_message)
                # TODO: Send email here
            except Exception as e:
                # Print any error messages to stdout
                return str(e)+"AAAAA"
                print(e)
            finally:
                server.quit() 
      
            print("2")
            user_data = {
                'username': username,
                # 'password': bcrypt.generate_password_hash(passwordUser),  REMOVE BCRYPT FOR NOW
                'password': passwordUser,
                'phone': phone,
                'name':nameUser,
                'created': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                 'otpSer':str(otpSer),
                 'verifyFlag': "N",
                         }
            users_collection = db['users']
            users_collection.create_index("username", unique=True)
            users_collection.insert_one(user_data) 
        return "ok"
    except Exception as e:
        return str(e)    



        
@auth.route('/getOTP',methods=['POST'])
def getOTP():
    user_otp = int(request.get_json()['otp'])
    username = request.get_json()['username']
    print(user_otp,"user",type(user_otp))
    # print(otpSer,"server",type(otpSer))
    users_collection_user = db['users']
    user_data = users_collection_user.find_one({'username': username})
    otpSer = user_data['otpSer']
    print(user_data,"AAAAAAAAAAAAAAAaa",type(otpSer))
    
    if user_otp == int(otpSer):
        users_subscription = db['user_subscription']
        created = datetime.now().date().strftime("%Y-%m-%d")
        expire = datetime.now().date()+relativedelta(years=1)
        expired = expire.strftime("%Y-%m-%d")
        print("#######N",created,"u",expired)  
        user_sub_data={
            'plan-Info':default_sub,
            'username':user_data['username'],
            'created':created,
            'tokensUsed':0,
            'expiration':expired ,
        }
        
        try:
            users_collection_user.update_one( {'username': username} ,  { "$set": { 'verifyFlag': "Y" } })
            users_subscription.create_index("username", unique=True)
            users_subscription.insert_one(user_sub_data)


            smtp_server = "smtp.gmail.com"
            port = 587  # For starttls
            # port = 465   #---------------------------------for SSL setting
            sender_email = "thedummydog@gmail.com"
            password = EMAILPASS
            email_headers = f"Subject: Welcome to Zema\r\n"
            email_headers += f"From: {sender_email}\r\n"
            email_headers += "Content-Type: text/html; charset=utf-8\r\n" 
            email_headers += "\r\n"
            image_url = "https://raw.githubusercontent.com/Aniket-Shival/popup/Aniket-Shival-mic-2/Zema_Bird_Transperent.png"
            # logo_img = None

            # with open('assets/Zema_Logo_Transperent.png', 'rb') as image_file:
            #     logo_img = base64.b64encode(image_file.read()).decode()
            message = f"""
<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
  <div style="margin: 50px auto; width: 70%; padding: 20px 0">
    <div style="border-bottom: 1px solid #eee">
      <img src="{image_url}" style="max-width: 100px; display: block; margin: 10px auto;" alt='Zema Logo'/>
      <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Zema</a>
    </div>
    <p style="font-size: 1.1em">Hi,</p>
    <p>Thank you for choosing Zema. We're thrilled to have you on board!</p>
    <p style="font-size: 0.9em;">Regards,<br />Zema Team</p>
    <hr style="border: none; border-top: 1px solid #eee" />
    <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
      <p>Zema</p>
    </div>
  </div>
</div>
            """

            # email_message = email_headers + message


            # message = "Your OTP for Zemo signup is "+str(otp)
            email_message = email_headers + message

            # Create a secure SSL context
            context = ssl.create_default_context()

            # Try to log in to server and send email
            try:
                # server = smtplib.SMTP_SSL(smtp_server,port)
                server = smtplib.SMTP(smtp_server,port)
                server.ehlo() # Can be omitted
                server.starttls(context=context) # Secure the connection # REMOVE IT IN SSL SETTING---------------------------
                server.ehlo() # Can be omitted
                server.login(sender_email, password)
                server.sendmail(sender_email, username, email_message)
                # TODO: Send email here
            except Exception as e:
                # Print any error messages to stdout
                return str(e)+"AAAAA"
                print(e)
            finally:
                server.quit() 

            return "OK"          
        except OperationFailure as e:
            return "NO"
    else:
        users_collection_user.delete_many( {'username': username})
        return "Verification Failed"      


######################################################################  forget passowrd

@auth.route('/forgetpassword', methods=[ 'POST'])
def forgetpassword():
    try:
        username = request.get_json()['username']
        users_collection = db['users']

        if  username == '' :
            print("-------309")
            return "ic" 
    

        user_data_i = users_collection.find_one({'username': username})  
        if user_data_i == None:
            print("--------307")
            return "NO"   

        otp_store = {}
        otp = random.randint(100000, 999999)
        otp_store[username] = otp
  
        otpSer = otp
        # session['otpSer_s'] = otp
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        # port = 465 #-----------------------------------------------for SSL
        sender_email = "thedummydog@gmail.com"
        password = EMAILPASS
        email_headers = f"Subject: Zema Reset Password OTP\r\n"
        email_headers += f"From: {sender_email}\r\n"
        email_headers += "Content-Type: text/html; charset=utf-8\r\n" 
        email_headers += "\r\n"
        image_url = "https://raw.githubusercontent.com/Aniket-Shival/popup/Aniket-Shival-mic-2/Zema_Bird_Transperent.png"
            # logo_img = None

            # with open('assets/Zema_Logo_Transperent.png', 'rb') as image_file:
            #     logo_img = base64.b64encode(image_file.read()).decode()
        message = f"""
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                         <img src="{image_url}" style="max-width: 100px; display: block; margin: 10px auto;" alt='Zema Logo'/>
                         <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zema</a>
                     </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Use the following OTP to proceed towards resetting your password</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Zema</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                      <p>Zema</p>
                    </div>
                </div>
            </div>
            """.format(otp=otp)

            # email_message = email_headers + message


            # message = "Your OTP for Zemo signup is "+str(otp)
        email_message = email_headers + message

        # Create a secure SSL context
        context = ssl.create_default_context()

        # Try to log in to server and send email
        try:
            server = smtplib.SMTP(smtp_server,port)
            # server = smtplib.SMTP_SSL(smtp_server,port)
            server.ehlo() # Can be omitted
            server.starttls(context=context) # Secure the connection   # REMOVE FOR SSL
            server.ehlo() # Can be omitted
            server.login(sender_email, password)
            server.sendmail(sender_email, username, email_message)
            # TODO: Send email here
        except Exception as e:
            # Print any error messages to stdout
            print(e)
        finally:
            server.quit()   
        users_collection.update_one({'username': username}, {'$set': {'otpSer': otp}})   
        print("login success")
        return 'OK'
    except Exception as e:
        print(str(e),"----------------353")
        return str(e)   

####################################################### forget passowrd chk otp

@auth.route('/fpOTP',methods=['POST'])
def fpOTP():
    try:
        user_otp = int(request.get_json()['otp'])
        username = request.get_json()['username']
        print(user_otp,"user",type(user_otp))
        # print(otpSer,"server",type(otpSer))
        users_collection_user = db['users']
        user_data = users_collection_user.find_one({'username': username})
        otpSer = user_data['otpSer']
        print(user_data,"AAAAAAAAAAAAAAAaa",type(otpSer))
    
        if user_otp == int(otpSer):
            try:
                users_collection_user.update_one( {'username': username} ,  { "$set": { 'verifyFlag': "CP" } })
                return "OK"          
            except OperationFailure as e:
                return "NO"
        else:
            return "Verification Failed"  
    except Exception as e:
        print(str(e),"-------379")
        return str(e)        

####################################################### forget passowrd chk otp

@auth.route('/cpOTP',methods=['POST'])
def cpOTP():
    try:
        password = request.get_json()['newPassword']
        username = request.get_json()['username']
        print("-----389",password)
        if password == '' or password == None:
            return 'mt'

        users_collection_user = db['users']
        user_data = users_collection_user.find_one({'username': username})
        if user_data['verifyFlag'] == 'CP':
            users_collection_user.update_one( {'username': username} ,  { "$set": { 'verifyFlag': "Y" } })
            users_collection_user.update_one( {'username': username} ,  { "$set": { 'password': password } }) 
            users_collection_user.update_one( {'username': username} ,  { "$set": { 'updated': datetime.now().strftime("%Y-%m-%d %H:%M:%S") } }) 
            
            return 'OK'
        else:
            return 'na'         
    except Exception as e:
        print(str(e),"-------389")
        return str(e)     

@auth.route('/login', methods=[ 'POST'])
def login():
    if request.method == 'POST':
        username = request.get_json()['username']
        password = request.get_json()['password']
        users_collection = db['users']
        users_admin = db['admin_data']

        deleteUsers = users_collection.delete_many({'verifyFlag':'N'})

        if  username == '' :
            print("-------309")
            return "ic" 
        if password == '':
            print("-------309")
            return "ic"    

        user_data_i = users_collection.find_one({'username': username})  
        user_admin_chk = users_admin.find_one({'admin': username})  
        if user_data_i == None:
            print("--------307",password)
            return "NO"   

        
        print("KKKKKKKKKKk",user_data_i.get('username'))
        dbusername =user_data_i.get('username')
        dbpassword =user_data_i.get('password')
        print("308==",dbusername,password)
        if dbusername and dbpassword == password and user_admin_chk :
            return [dbusername,'admin']
        if dbusername and dbpassword == password :
            return dbusername
        else:
            error = 'Invalid credentials. Please try again.'     
            print("no success")
            return "NO"
    print("login success")
    return 'Login success'



    def wrapper(*args, **kwargs):
        token = request.cookies.get('token') 

        if not token:
            return jsonify(error='Access denied. Token is missing.'), 401

        payload = verify_jwt_token(token)

        if payload is None:
            return jsonify(error='Access denied. Invalid token.'), 403
        request.user = payload

        return func(*args, **kwargs)

    return wrapper


 


