from flask import Blueprint, current_app
import os
from flask import session
import urllib.parse
from pymongo import MongoClient

from flask import Flask, redirect, jsonify, json, request, current_app
from flask import Flask, request, render_template_string

import smtplib, ssl
import base64

from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv())

import stripe
stripe.api_key=os.getenv('STRIPE_SECRET_KEY_2')
stripepay = Blueprint("stripepay",__name__)

# YOUR_DOMAIN = os.getenv("YOUR_DOMAIN")

from flask_cors import CORS
CORS(stripepay) 

from collections import OrderedDict

MONGO = os.getenv("MONGO")
pageURL = 'http://localhost:3000/'
EMAILPASS = os.getenv("EMAILPASS")
client = MongoClient(MONGO)
db = client['chatbot']

from datetime import date
from datetime import datetime
from dateutil.relativedelta import relativedelta
import time 

data = [
    {
        'price_data': {
            'currency': 'usd',
             'unit_amount': 10000,
            'recurring': {
                'interval': 'month',
                'interval_count': 1,       
            },
            'product_data': {
                'name': 'month-simple',
            },
        },
        'quantity': 1,
    },
    {
        'price_data': {
            'currency': 'usd',
             'unit_amount': 25000,
            'recurring': {
                'interval': 'month',
                'interval_count': 1,        
            },
            'product_data': {
                'name': 'month-standard',
            },
        },
        'quantity': 1,
    },
    {
        'price_data': {
            'currency': 'usd',
            'unit_amount': 96000,
            'recurring':{
                'interval': 'year',
                'interval_count': 1,              
            },
            'product_data': {
                'name': 'year-simple',
            },
        },
        'quantity': 1,
    },
    {
        'price_data': {
            'currency': 'usd',
            'unit_amount': 240000,
            'recurring': {
                'interval': 'year',
                'interval_count': 1,               
            },
            'product_data': {
                'name': 'year-standard',
            },
        },
        'quantity': 1,
    },
]

users_temp = db['users_temp']
users_temp.create_index("gUser", unique=True)

subscriptionData = {
    'amount':0,
    'plan':'Free',
    # 'NoOfMsg':20,
    'NoOfBots':1,
    'tokens':100,
    'NoOfCharacters':10000,
}

def choose_option(option,bot_2):
    if option == "year-simple":
       return {'amount':96000,
    'plan':'year-simple',
    # 'NoOfMsg':500,
    'NoOfBots':2 - bot_2,
    'tokens':10000,
    'NoOfCharacters':float('inf'),}
    elif option == "year-standard":
       return {'amount':240000,
    'plan':'year-standard',
    # 'NoOfMsg':4000,
    'NoOfBots':10 - bot_2,
    'tokens':100000,
    'NoOfCharacters':float('inf'),}
    elif option == "month-simple":
       return {'amount':10000,
    'plan':'month-simple',
    # 'NoOfMsg':500,
    'NoOfBots':2 - bot_2,
    'tokens':10000,
    'NoOfCharacters':float('inf'),}
    elif option == "month-standard":
       return {'amount':25000,
    'plan':'month-standard',
    # 'NoOfMsg':4000,
    'NoOfBots':10 - bot_2,
    'tokens':100000,
    'NoOfCharacters':float('inf'),}
    else:
        # Code for other cases
        print("Invalid option")

@stripepay.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        key = request.get_json()['key']
        decoded = request.get_json()['decoded']
        if users_temp.find_one({'gUser':decoded}):
            users_temp.delete_one({'gUser':decoded})

        print("key is ------------200 ",decoded)
        users_temp.insert_one({'gUser':decoded})
        print(decoded)
        line={}
        for item in data:
            if item['price_data']['product_data']['name'] == key:
               print(item,"line")
               line = item
               break
        purchase_data = {
        'amount': line['price_data']['unit_amount'],
        'currency': line['price_data']['currency'],
        'product_id': line['price_data']['product_data']['name']
         }       
        print("213--------------------------",decoded) 
        print("purchasedata",purchase_data)
        print("220--------------------------",decoded) 
        users_temp.update_one({"gUser": decoded}, {"$set":{'gProduct':purchase_data}})

        payment_intent = stripe.PaymentIntent.create(
        amount=line['price_data']['unit_amount'],
        currency= line['price_data']['currency'],
        description='Payment for Subscription To Zema',
        payment_method_types=["card"],)

        checkout_session = stripe.checkout.Session.create(
            mode='subscription',
            line_items = [line],
            success_url=pageURL+'SuccessPage',
            cancel_url=pageURL+'CancelPage',
        )
        print("CCCCCCCCCCCCCcc",checkout_session.id)
        print("259---------------------",decoded)
        users_temp.update_one({"gUser": decoded}, {'$set':{'gSession_id': checkout_session.id}})

        payment_intent=payment_intent.id 
        return checkout_session.url ,checkout_session.id
    except Exception as e:
        print("Error is ===",e)
        users_temp.delete_one({'gUser':decoded})
        return "Server error"+str(e), 500

@stripepay.route('/order/success', methods=['POST'])
def order_success():
    decoded = request.get_json()['decoded']
    dbdata = users_temp.find_one({'gUser': decoded})
    print("284------------------------",dbdata,decoded)

    gUser = dbdata['gUser']
    gSession_id = dbdata['gSession_id']
    gProduct = dbdata['gProduct']
    session_id = gSession_id
    product_data = gProduct
    print("PRODUCT data", product_data)
    if session_id is None:
        return "Missing session ID"

    try:
        session = stripe.checkout.Session.retrieve(session_id)
        customer = stripe.Customer.retrieve(session.customer)

    except stripe.error.StripeError as e:
        return f"Stripe error: {e}"

    except Exception as e:
        return f"Error: {e}"
    
    created = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    pay_data={
        'username': gUser,
        'payment':customer,
        'product':gProduct,
        'created':created
    }
    try:
          users_pay = db['user_payment']
          users_pay.insert_one(pay_data) 
          sub = db['user_subscription']
          bot_1 = db['users_website_crawl_data']
          bot_2 = bot_1.count_documents({'email':gUser})
          print("325------------------",bot_2)
          sub_type = choose_option(pay_data['product']['product_id'],bot_2)
          created = datetime.now().date().strftime("%Y-%m-%d")
          if pay_data['product']['product_id'] == 'year-simple' or pay_data['product']['product_id'] == 'year-standard' :
            expire = datetime.now().date()+relativedelta(years=1)
          else:
            expire = datetime.now().date()+relativedelta(months=1)  
          expired = expire.strftime("%Y-%m-%d")
          user_sub_data={
            'plan-Info':sub_type,
            'username':gUser,
            'created':created,
            'expiration':expired ,
            'status':'Paid',
        }
          sub.replace_one({"username": gUser},user_sub_data)
          char_1 = db['users_website_crawl_data']
          char_1.update_many({"email": gUser}, {'$set':{'NoOfCharacters': sub_type['NoOfCharacters']}})
          print("sub = ",sub_type['NoOfCharacters'])       
    except Exception as e:
        users_temp.delete_one({'gUser':decoded})
        print("------------247")
        return ["Couldn't save data"]    
    users_temp.delete_one({'gUser':decoded})

    try:
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        # port = 465 #-----------------------------------------------for SSL
        sender_email = "thedummydog@gmail.com"
        password = EMAILPASS
        email_headers = f"Subject: Zema Subscription\r\n"
        email_headers += f"From: {sender_email}\r\n"
        email_headers += "Content-Type: text/html; charset=utf-8\r\n" 
        email_headers += "\r\n"
        print("------------261")
        image_url = "https://raw.githubusercontent.com/Aniket-Shival/popup/Aniket-Shival-mic-2/Zema_Bird_Transperent.png"
            # logo_img = None

            # with open('assets/Zema_Logo_Transperent.png', 'rb') as image_file:
            #     logo_img = base64.b64encode(image_file.read()).decode()
        print("------------267")    
        message = f"""
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                         <img src="{image_url}" style="max-width: 100px; display: block; margin: 10px auto;" alt='Zema Logo'/>
                         <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zema</a>
                     </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Your Zema account has successfully been renewed to </p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{sub_type['plan']}</h2>
                     <p>Amount paid : {sub_type['amount']/100} USD</p>
                    <p style="font-size:0.9em;">Regards,<br />Zema</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                      <p>Zema</p>
                    </div>
                </div>
            </div>
            """

            # email_message = email_headers + message


            # message = "Your OTP for Zemo signup is "+str(otp)
        email_message = email_headers + message
        username = decoded

        # Create a secure SSL context
        context = ssl.create_default_context()
        print("-----294")
        # Try to log in to server and send email
        try:
            server = smtplib.SMTP(smtp_server,port)
            # server = smtplib.SMTP_SSL(smtp_server,port)
            server.ehlo() # Can be omitted
            server.starttls(context=context) # Secure the connection   # REMOVE FOR SSL
            server.ehlo() # Can be omitted
            server.login(sender_email, password)
            server.sendmail(sender_email, username, email_message)
            print("---------304")
            # TODO: Send email here
        except Exception as e:
            # Print any error messages to stdout
            print(e)
        finally:
            server.quit()   
    except Exception as e:
        return str(e)
    
    return [customer,gProduct,gUser]

@stripepay.route('/webhook', methods=['POST'])
def webhook_received():
    # Replace this endpoint secret with your endpoint's unique secret
    # If you are testing with the CLI, find the secret by running 'stripe listen'
    # If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    # at https://dashboard.stripe.com/webhooks
    webhook_secret = 'whsec_12345svw4tg4wyehu6ris6urbrhethe'
    request_data = json.loads(request.data)

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']

    print('event ' + event_type)

    if event_type == 'checkout.session.completed':
        print('🔔 Payment succeeded!')
    elif event_type == 'customer.subscription.trial_will_end':
        print('Subscription trial will end')
    elif event_type == 'customer.subscription.created':
        print('Subscription created %s', event.id)
    elif event_type == 'customer.subscription.updated':
        print('Subscription created %s', event.id)
    elif event_type == 'customer.subscription.deleted':
        # handle subscription canceled automatically based
        # upon your subscription settings. Or if the user cancels it.
        print('Subscription canceled: %s', event.id)

    return jsonify({'status': 'success'})
