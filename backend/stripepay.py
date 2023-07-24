from flask import Blueprint, current_app
import os
from flask import session
import urllib.parse
from pymongo import MongoClient

from flask import Flask, redirect, jsonify, json, request, current_app
from flask import Flask, request, render_template_string

from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv())

import stripe
# This is your test secret API key.
stripe.api_key=os.getenv('STRIPE_SECRET_KEY_2')

# print(os.getenv('STRIPE_SECRET_KEY_2'))

stripepay = Blueprint("stripepay",__name__)



YOUR_DOMAIN = os.getenv("YOUR_DOMAIN")

from flask_cors import CORS
CORS(stripepay) 


from collections import OrderedDict

MONGO = os.getenv("MONGO")
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
             'unit_amount': 1900,
            'recurring': {
                'interval': 'month',
                'interval_count': 1,       
            },
            'product_data': {
                'name': 'month-hobby',
            },
        },
        'quantity': 1,
    },
    {
        'price_data': {
            'currency': 'usd',
             'unit_amount': 3900,
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
            'unit_amount': 30000,
            'recurring':{
                'interval': 'month',
                'interval_count': 1,               
            },
            'product_data': {
                'name': 'month-pro',
            },
        },
        'quantity': 1,
    },
    {
        'price_data': {
            'currency': 'usd',
            'unit_amount': 20000,
            'recurring':{
                'interval': 'year',
                'interval_count': 1,              
            },
            'product_data': {
                'name': 'year-hobby',
            },
        },
        'quantity': 1,
    },
    {
        'price_data': {
            'currency': 'usd',
            'unit_amount': 40000,
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
    {
        'price_data': {
            'currency': 'usd',
            'unit_amount': 300000,
            'recurring':{
                'interval': 'year',
                'interval_count': 1,         
            },
            'product_data': {
                'name': 'year-pro',
            },
        },
        'quantity': 1,
    },
]

gSession_id = None
gProduct = None
# gUser = None

users_temp = db['users_temp']
users_temp.create_index("gUser", unique=True)

# gChk = None
# gChk2 = False 


subscriptionData = {
    'amount':0,
    'plan':'Free',
    'NoOfMsg':20,
    'NoOfBots':2,
    'NoOfCharacters':20000,
}

def choose_option(option,bot_2):
    if option == "year-hobby":
       return {'amount':20000,
    'plan':'year-hobby',
    'NoOfMsg':500,
    'NoOfBots':10 - bot_2,
    'NoOfCharacters':500000,}
    elif option == "year-standard":
       return {'amount':40000,
    'plan':'year-standard',
    'NoOfMsg':4000,
    'NoOfBots':25 - bot_2,
    'NoOfCharacters':5000000,}
    elif option == "year-pro":
       return {'amount':300000,
    'plan':'year-pro',
    'NoOfMsg':30000,
    'NoOfBots':50 - bot_2,
    'NoOfCharacters':10000000,}
    elif option == "month-hobby":
       return {'amount':1900,
    'plan':'month-hobby',
    'NoOfMsg':500,
    'NoOfBots':10 - bot_2,
    'NoOfCharacters':500000,}
    elif option == "month-standard":
       return {'amount':3900,
    'plan':'month-standard',
    'NoOfMsg':4000,
    'NoOfBots':25 - bot_2,
    'NoOfCharacters':5000000,}
    elif option == "month-pro":
       return {'amount':30000,
    'plan':'month-pro',
    'NoOfMsg':30000,
    'NoOfBots':50 - bot_2,
    'NoOfCharacters':10000000,}
    else:
        # Code for other cases
        print("Invalid option")

# @stripepay.route('/', methods=['GET'])
# def get_index():
#     return current_app.send_static_file('index.html')

@stripepay.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        key = request.get_json()['key']
        decoded = request.get_json()['decoded']
        # gUser = decoded
        users_temp.insert_one({'gUser':decoded})

        print("key is ",key)
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
        # print("215--------------------------",gUser)
        # gProduct = purchase_data
        # users_temp.insert_one({'gProduct':purchase_data})
        print("220--------------------------",decoded) 
        users_temp.update_one({"gUser": decoded}, {"$set":{'gProduct':purchase_data}})

        payment_intent = stripe.PaymentIntent.create(
        amount=line['price_data']['unit_amount'],
        currency= line['price_data']['currency'],
        description='Payment for Subscription To Zema',
        payment_method_types=["card"],
        # shipping={
        #     "name": "Jenny Rosen",
        #     "address": {
        #     #   "line1": "510 Townsend St",
        #     #   "postal_code": "98140",
        #     #   "city": "San Francisco",
        #     #   "state": "CA",
        #       "country": "US",
        #     },
        #   },
        # metadata={'purchase_id': str(purchase_id)}
        )
    
        # print("238--------------------------",gUser)
        checkout_session = stripe.checkout.Session.create(
            mode='subscription',
            line_items = [line],
            
            
            success_url='http://localhost:3000/SuccessPage',
            # success_url="http://localhost:3000/SuccessPage?session_id={checkout_session.id}",
            # success_url='http://127.0.0.1:5000/order/sucess',
            cancel_url='http://localhost:3000/CancelPage',
            # success_url=YOUR_DOMAIN +
            # '?success=true&session_id={CHECKOUT_SESSION_ID}',
            # cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
        print("CCCCCCCCCCCCCcc",checkout_session.id)
        # gSession_id = checkout_session.id
        # users_temp.insert_one({'gSession_id': checkout_session.id})
        print("259---------------------",decoded)
        users_temp.update_one({"gUser": decoded}, {'$set':{'gSession_id': checkout_session.id}})

        payment_intent=payment_intent.id 
        # gChk = True
        # print("GCHK OK ",gChk)
        return checkout_session.url ,checkout_session.id
        # return jsonify({"sessionId": checkout_session["id"]})
    except Exception as e:
        
        # gChk = False
        # print("GCHK ERROR ",gChk)
        print("Error is ===",e)
        users_temp.delete_one({'gUser':decoded})
        return "Server error", 500

    # key = request.get_json()['key']
    # print("key = ",key)
    # return("create checkout session from the backend working")


@stripepay.route('/order/success', methods=['POST'])
def order_success():
    decoded = request.get_json()['decoded']
    dbdata = users_temp.find_one({'gUser': decoded})
    print("284------------------------",dbdata,decoded)

    gUser = dbdata['gUser']
    gSession_id = dbdata['gSession_id']
    gProduct = dbdata['gProduct']
    # session_id = gSession_id
    # product_data = gProduct
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
    
    created = datetime.now().date().strftime("%Y-%m-%d")
    # if sub_type == 'year-hobby' or sub_type == 'year-standard' or sub_type == 'year-pro':
    #     expire = datetime.now().date()+relativedelta(years=1)
    # else:
    #     expire = datetime.now().date()+relativedelta(months=1)  
    #     expired = expire.strftime("%Y-%m-%d")
    # gUser = users_temp['gUser']
    pay_data={
        'username': gUser,
        'payment':customer,
        'product':gProduct,
        'created':created
    }
    try:
        # if gChk == True and gChk2 == True:
          users_pay = db['user_payment']
          users_pay.insert_one(pay_data) 
          sub = db['user_subscription']
          bot_1 = db['users_website_crawl_data']
        #   bot_2 = bot_1.count_documents({'email':gUser['username']})
          bot_2 = bot_1.count_documents({'email':gUser})
          print("325------------------",bot_2)

        #   num_c = db['users_website_crawl_data']<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

          sub_type = choose_option(pay_data['product']['product_id'],bot_2)
        #   print("TTTTTTTTTTTTTTTTTTTt",pay_data['product']['product_id'])
        #   print("LLLLLLLLLLLLLLLLLMMMMMMMMMMMMm",sub_type)
          created = datetime.now().date().strftime("%Y-%m-%d")
          if pay_data['product']['product_id'] == 'year-hobby' or pay_data['product']['product_id'] == 'year-standard' or pay_data['product']['product_id'] == 'year-pro':
            expire = datetime.now().date()+relativedelta(years=1)
          else:
            expire = datetime.now().date()+relativedelta(months=1)  
          expired = expire.strftime("%Y-%m-%d")
          user_sub_data={
            'plan-Info':sub_type,
            # 'username':gUser['username'],
            'username':gUser,
            'created':created,
            'expiration':expired ,
        }

        #   sub.replace_one({"username": gUser['username']},user_sub_data)
          sub.replace_one({"username": gUser},user_sub_data)
          char_1 = db['users_website_crawl_data']
          char_1.update_many({"email": gUser}, {'$set':{'NoOfCharacters': sub_type['NoOfCharacters']}})
          print("sub = ",sub_type['NoOfCharacters'])       
    except Exception as e:
        users_temp.delete_one({'gUser':decoded})
        return ["Couldn't save data"]    
    # gChk2 = False
    users_temp.delete_one({'gUser':decoded})
    return [customer,gProduct,gUser]

# @stripepay.route('/order/success', methods=['GET'])
# def order_success():
#   session = stripe.checkout.Session.retrieve(request.args.get('session_id'))
#   customer = stripe.Customer.retrieve(session.customer)
#   console.log("customer", customer)

#   return customer


# @stripe.route('/create-portal-session', methods=['POST'])
# def customer_portal():
#     # For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
#     # Typically this is stored alongside the authenticated user in your database.
#     checkout_session_id = request.form.get('session_id')
#     checkout_session = stripe.checkout.Session.retrieve(checkout_session_id)

#     # This is the URL to which the customer will be redirected after they are
#     # done managing their billing with the portal.
#     return_url = YOUR_DOMAIN

#     portalSession = stripe.billing_portal.Session.create(
#         customer=checkout_session.customer,
#         return_url=return_url,
#     )
#     return redirect(portalSession.url, code=303)

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
