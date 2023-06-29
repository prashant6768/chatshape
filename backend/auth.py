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




client = MongoClient('mongodb://localhost:27017/')
db = client['chatbot']



load_dotenv(find_dotenv())
SECRET_KEY = os.getenv("SECRET_KEY")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

auth = Blueprint("auth",__name__)
# auth.config['SECRET_KEY'] = SECRET_KEY
bcrypt = Bcrypt()

CORS(auth) 


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

        username = request.get_json()['username']
        password = request.get_json()['password']

        users_collection = db['users']
        try:
            users_collection.create_index("username", unique=True)
            user_data = {
            'username': username,
            'password': bcrypt.generate_password_hash(password)
                     }
            users_collection.insert_one(user_data) 
            return "OK"       
        except OperationFailure as e:
            return "NO"
    return "ok"
        # user_data = {
        #     'username': username,
        #     'password': bcrypt.generate_password_hash(password)
        # }
        # users_collection.insert_one(user_data)
    
        

    

@auth.route('/login', methods=['GET', 'POST'])
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