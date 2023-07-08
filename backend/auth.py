from flask import Blueprint, current_app
from flask import Flask, render_template, redirect, url_for, flash , request, make_response
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
# from jose import jwt

from flask_mail import Mail, Message
import random
import smtplib, ssl

from datetime import date
from datetime import datetime
from dateutil.relativedelta import relativedelta

from flask import session




# client = MongoClient('mongodb://localhost:27017/')




load_dotenv(find_dotenv())
SECRET_KEY = os.getenv("SECRET_KEY")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
MONGO = os.getenv("MONGO")
EMAILPASS = os.getenv("EMAILPASS")

client = MongoClient(MONGO)
db = client['chatbot']


auth = Blueprint("auth",__name__)
app = Flask(__name__)
# auth.config['SECRET_KEY'] = SECRET_KEY
bcrypt = Bcrypt()

CORS(auth) 
# auth.secret_key = os.getenv("SESSION")


default_sub = {
    'amount':0,
    'plan':'Free',
    'NoOfMsg':20,
    'NoOfBots':2,
    'NoOfCharacters':20000,
}





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

user_data=None
otpSer= None

@auth.route('/signup', methods=[ 'POST'])
def signup():
    if request.method == 'POST':
       
        otp_store = {}
        
        username = request.get_json()['username']
        passwordUser = request.get_json()['password']
        otp = random.randint(100000, 999999)
        otp_store[username] = otp
        global otpSer
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
        global user_data
        user_data = {
            'username': username,
            'password': bcrypt.generate_password_hash(passwordUser)
                     }
     
    return "ok"
     
        
@auth.route('/getOTP',methods=['POST'])
def getOTP():
    user_otp = int(request.get_json()['otp'])
    print(user_otp,"user",type(user_otp))
    print(otpSer,"server",type(otpSer))
    print(user_data)
   

    if user_otp == otpSer:
        users_collection = db['users']
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
            users_collection.create_index("username", unique=True)
            users_subscription.create_index("username", unique=True)
                    
            users_collection.insert_one(user_data) 
            users_subscription.insert_one(user_sub_data)
            return "OK"       
        except OperationFailure as e:
            return "NO"
    else:
        return "Verification Failed"
   

    

@auth.route('/login', methods=[ 'POST'])
def login():
    if request.method == 'POST':

        username = request.get_json()['username']
        password = request.get_json()['password']

        users_collection = db['users']
        user_data = users_collection.find_one({'username': username})

        if user_data and bcrypt.check_password_hash(user_data['password'], password):
            token = create_jwt_token(username)
            # session['token'] = token
            response = make_response()
            response.set_cookie('token', token)
            # session['username'] = username
            print("RESponsee ",response , token )
            return token
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