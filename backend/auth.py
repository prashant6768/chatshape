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

client = MongoClient(MONGO)
db = client['chatbot']

auth = Blueprint("auth",__name__)
app = Flask(__name__)


auth.secret_key = AUTH_FILE_SECRET_KEY


# auth.config['SECRET_KEY'] = SECRET_KEY
bcrypt = Bcrypt()

CORS(auth, origins='http://localhost:3000') 
app.secret_key = os.getenv("SESSION_SECRET_1")
CORS(app, origins='http://localhost:3000')
from google.auth import exceptions as google_auth_exceptions
from google.auth.transport import requests as google_auth_requests
from google.oauth2 import id_token

default_sub = {
    'amount':0,
    'plan':'Free',
    'NoOfMsg':20,
    'NoOfBots':2,
    'NoOfCharacters':20000,
}

@auth.route("/googlelogin")
def login_google():
  
    flow = Flow.from_client_secrets_file(
        "client_secret.json",
        scopes=["openid", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
        redirect_uri= os.getenv("GOOGLE_REDIRECT_URI"),
    )

    authorization_url, state = flow.authorization_url(
        prompt="consent",
        # response_type="code"
    )

    
    session["oauth_state"] = state
    state2 = session.pop("oauth_state", None)
    print("121---------------------state2",state2)

    print("120------------------state",state)
    print("124-----------------redirect--------",authorization_url)
    
    return authorization_url



@auth.route("/callback")
def callback_google():
    # print("State------------------127-----------",state)

    flow = Flow.from_client_secrets_file(
        "client_secret.json",
        scopes=["openid", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
        redirect_uri="http://localhost:5000/auth/callback",
    )
    flow.fetch_token(authorization_response=request.url)

    request_obj = requests.Request()

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

        redirect_url = 'http://localhost:3000/login' 
        redirect_url += '?access_token=' + username
        redirect_url += '&sl=' + 's'
        return redirect(redirect_url)           

    else:
        redirect_url = 'http://localhost:3000/login' 
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
    if request.method == 'POST':
       
        otp_store = {}
        
        username = request.get_json()['username']
        passwordUser = request.get_json()['password']
        nameUser = request.get_json()['name']
        phone = request.get_json()['phone']

        otp = random.randint(100000, 999999)
        otp_store[username] = otp
  
        otpSer = otp
        # session['otpSer_s'] = otp
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        sender_email = "thedummydog@gmail.com"
        password = EMAILPASS
        message = "Your OTP for Zemo signup is "+str(otp)

        # Create a secure SSL context
        context = ssl.create_default_context()

        # Try to log in to server and send email
        try:
            server = smtplib.SMTP(smtp_server,port)
            server.ehlo() # Can be omitted
            server.starttls(context=context) # Secure the connection
            server.ehlo() # Can be omitted
            server.login(sender_email, password)
            server.sendmail(sender_email, username, message)
            # TODO: Send email here
        except Exception as e:
            # Print any error messages to stdout
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
             'otpSer':str(otpSer),
             'verifyFlag': "N",
                     }
        users_collection = db['users']
        users_collection.create_index("username", unique=True)
        users_collection.insert_one(user_data) 
     
    return "ok"
        
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
        # users_collection = db['users']
        users_subscription = db['user_subscription']
        
        created = datetime.now().date().strftime("%Y-%m-%d")
        expire = datetime.now().date()+relativedelta(years=1)
        expired = expire.strftime("%Y-%m-%d")

        print("#######N",created,"u",expired)
        
        user_sub_data={
            'plan-Info':default_sub,
            'username':user_data['username'],
            'created':created,
            'expiration':expired ,
        }
        
        try:

            users_collection_user.update_one( {'username': username} ,  { "$set": { 'verifyFlag': "Y" } })

            # users_collection.create_index("username", unique=True)
            users_subscription.create_index("username", unique=True)
                    
            # users_collection.insert_one(user_data) 
            users_subscription.insert_one(user_sub_data)
            return "OK"      
            
        except OperationFailure as e:
            return "NO"
            # if you get user already exists erro it might be due to user existing in subscription schema
    else:
        users_collection_user.delete_many( {'username': username})
        return "Verification Failed"
       

@auth.route('/login', methods=[ 'POST'])
def login():
    if request.method == 'POST':

        username = request.get_json()['username']
        password = request.get_json()['password']
        # ddd = json.loads(request.data, strict=False)
        # print(ddd,"aaaaaaaaaaaaaaaaaaaaaaaa")

        users_collection = db['users']

        # ooooooooooooooooooooooooooooooo Find function alternative 00000000000000000000000000000000000000000000
        # obj = [{'k1':"apple",'k2':"red"}, {'k1':"banana",'k2':"yellow"}]
        # for x in obj:
        #   if x.get('k2') == 'red':
        #      print(x.get('k2'),x.get('k1'))
        #      print("{k2:",x.get('k2'),",k1:",x.get('k1'),"}") 
        
        user_data_i = users_collection.find_one({'username': username})
        print("KKKKKKKKKKk",user_data_i.get('username'))
        # user_data = {
        dbusername =user_data_i.get('username')
        dbpassword =user_data_i.get('password')
        # }

        if dbusername and dbpassword == password :
            # token = create_jwt_token(username)
            # session['token'] = token
            # response = make_response()
            # response.set_cookie('token', token)
           # # session['username'] = username
            # print("RESponsee ",response , token )
            return dbusername
            # return token
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
