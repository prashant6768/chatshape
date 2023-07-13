import time
from flask import Blueprint, abort
import ast
import tiktoken
from bson import ObjectId
from auth import auth
from stripepay import stripepay
from flask import Flask, jsonify, request
import json
import asyncio
from flask_cors import CORS
from dotenv import find_dotenv, load_dotenv
import requests
import json
import os
from langchain import OpenAI, LLMChain, PromptTemplate
from langchain.chat_models import ChatOpenAI 
from langchain.document_loaders import SeleniumURLLoader
import openai
from pymongo import MongoClient
from urllib.parse import quote_plus

load_dotenv(find_dotenv())
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MONGO = os.getenv("MONGO")

from flask_bcrypt import Bcrypt
from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import TokenTextSplitter

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC


from langchain.prompts import (
    ChatPromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)
from langchain.memory import ConversationBufferMemory

from datetime import date
from datetime import date
from datetime import datetime
from dateutil.relativedelta import relativedelta


app = Flask(__name__)
CORS(app) 

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(stripepay,url_prefix="/stripepay")

client = MongoClient(MONGO)
db = client['chatbot']

# Gsummary = None

def start_ai(query,userData):
   
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(userData)
    dataDb_i = users_collection.find_one({'_id':objId})

    dataDb = {
        'crawldata':dataDb_i.get('crawldata'),
        'email':dataDb_i.get('email'),
        'botname':dataDb_i.get('botname'),
        'url':dataDb_i.get('url'),
        'prompt':dataDb_i.get('prompt')
    }
    
    data = dataDb['crawldata']
    prompt = str(dataDb['prompt'])

    query = query
    text_splitter = TokenTextSplitter(chunk_size=1900,  chunk_overlap=300, length_function=len)
    text = text_splitter.create_documents( [data])
  
    def summarize(data,query):
        llm = ChatOpenAI(model_name="gpt-3.5-turbo",temperature=0.7)
        template=prompt
        prompt_template = PromptTemplate(input_variables=["text","query"],template=template)
        memory = ConversationBufferMemory( input_key="query")
        summarize_chain = LLMChain(llm=llm, prompt=prompt_template,verbose=True)
        summaries= []
        for chunk in enumerate(text):
            summary = summarize_chain.predict(text=chunk,query=query)
            summaries.append(summary)
            # Gsummary = summaries
            # print("/////////",Gsummary,"////////") 
            users_collection.update_one({"email": dataDb['email']}, {'$set':{'summaries': summaries}})
            return summaries
        # print(summaries) 
    summaries = summarize(data,query) 

@app.route('/api/msg',methods=['POST'])
def user_msg():
    # userName = request.get_json()['decoded']['username']
    data = request.get_json()['inputValue']
    userData = request.get_json()['botID']['botID']
    getid_1  = db['users_website_crawl_data']
    getid_2 = getid_1.find_one({'_id': ObjectId(userData)})
    print("120----------",getid_2['email'])
    userName = getid_2['email']

#EXpiartion code
    sub = db['user_subscription'] 
    datasub_i = sub.find_one({'username':userName})
    datasub={
      'expiration':datasub_i.get('expiration'),
    }
    # print(datasub,"555555555555555555555555555555",datetime.strptime(datasub['expiration'], "%Y-%m-%d"),"WWW",datetime.now().date())
    if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date():
        print("EXpire---------------------------------------")
        return "SubE"

    # print("user msg ////////////////////////",userData)
    start_ai(data,userData)
    users_collection = db['users_website_crawl_data']
    d = users_collection.find_one({'email':userName})
    summaries = d['summaries']
    users_collection.update_one({"email": userName}, {'$set':{'summaries': ''}})
    # print("X ==",Gsummary)
    return summaries

# urll = None

#create bot api start

@app.route('/api/sendLinkData',methods=['POST'])
def get_link_data():
    # print("INSide get the link data")
    urll = [request.get_json()['sendLink']]
    # userData = request.get_json()['decoded']['username']
    userData = request.get_json()['decoded']
    botName =  request.get_json()['botName']
    exclude = request.get_json()['exclude']
    sub = db['user_subscription'] 
    datasub_i = sub.find_one({'username':userData})
    datasub={
      'expiration':datasub_i.get('expiration'),
      'plan-Info':{'NoOfBots':datasub_i.get('plan-Info').get('NoOfBots')}
    }
    # print(datasub,"555555555555555555555555555555",datetime.strptime(datasub['expiration'], "%Y-%m-%d"),"WWW",datetime.now().date())
    if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date():
        return "SubE"
    if datasub['plan-Info']['NoOfBots'] < 1:
       return "BotF" 
    # print("the link i recieved ",urll)
    # print("username is ==", userData)
    get_data(urll,userData,botName,exclude)
    return urll
       

def get_data(urls,userData,botName,exclude):
    # print(" tttttttttttttt", str(urls[0]))
    page_links = scrape_links_and_buttons(str(urls[0]))
    # print("Links:")
    for link in page_links:
        print(link)
    page_links_x = [x for x in page_links if x not in exclude]   
    # print("Page link x ==",page_links_x) 
    loader = SeleniumURLLoader(urls=page_links_x)
    data = loader.load()
    # print(data)

    # client = MongoClient('mongodb://localhost:27017/')
    # client = MongoClient(MONGO)
    # db = client['chatbot']
    users_collection = db['users_website_crawl_data']
    user_sub = db['user_subscription']
    user_data = {
        'crawldata': str(data),
        'email': userData,
        'botname':botName,
        'url':str(urls[0]),
        'prompt':" You are a world class analyst.You are having a conversation with the user about the  text and you have to answer the users questions. Please follow these rules: 1. Make it engaging and informative. 2. Should address the {query} very well. 3. Don't repeat your sentences and information 4. Always mention name of things or people you talk about. 5.Don't mention your name when answering, go straight to the answer   {text}  Human: {query} "             
    } 
    try:
       users_collection.insert_one(user_data)
        #  print(user_sub.find_one({"username":userData}),"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
       user_sub.update_one({"username": userData}, {"$inc": {"plan-Info.NoOfBots":-1}},)
       print("Data stored successfully!")
    except Exception as e:
       print("Error storing data:============", str(e),"===========================")
    # print("dat stored hopefully = ")

@app.route('/api/updatebot/<id>',methods=['GET'])
def getupdatebot(id):

    users_collection = db['users_website_crawl_data']
    objId= ObjectId(id)
    dataDb_i = users_collection.find_one({'_id':objId})
    # print(dataDb_i)
    dataDb = {
        'email':dataDb_i.get('email'),
        'botname':dataDb_i.get('botname'),
        'prompt':dataDb_i.get('prompt'),
    }
    data={
        'email':dataDb['email'],
        'botname':dataDb['botname'],
        'prompt':dataDb['prompt']
        # 'url':dataDb['url']
    }
    # print(data)
    return data
    
@app.route('/api/updatebot/<id>',methods=['PUT'])
def updatebot(id):
    print("KKKKKKKKKK")
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(id)
    # dataDb = users_collection.find_one({'_id':objId})
    data =  request.get_json()
    print(data,"YYY")
    try:
         result = users_collection.update_one({'_id': ObjectId(id)}, {'$set': data})
         print(result)
         return "Update Successful"
    except Exception as e:
        print(e)
        return "Couldn't Update"     
    print(data)
    return "Coudn't Update"    

@app.route('/api/mybots',methods=['GET','POST'])
def get_mybots():
    # data =  request.get_json()['decoded']['username']
    data =  request.get_json()['decoded']
    # print("my bots ",data)


    users_collection = db['users_website_crawl_data']

    dataDb =[] 
    for x in users_collection.find({'email':data}):
        dataDb.append({'email': x['email'],'name':x['botname'], 'id': str(x['_id'])})  

    # print("dataDb =",dataDb)
    return dataDb

    #puppetr


def scrape_links_and_buttons(url):
    options = Options()
    options.add_argument('--headless')  
    options.add_argument('--disable-gpu')

    driver = webdriver.Chrome(options=options)  

    driver.get(url)
 
    WebDriverWait(driver, timeout=10)

    links = []
    unique_links=[]
    print(driver)

    # # Find all <a> tags for links
    for link in driver.find_elements(By.TAG_NAME, 'a'):
        href = link.get_attribute('href')
        if href:
            links.append(href)

    for link in links:
       if link not in unique_links:
         unique_links.append(link)        



    driver.quit()
    return unique_links

@app.route('/api/subdata',methods=['POST'])
def subdata():
    data =  request.get_json()['decoded']
    # data =  request.get_json()['decoded']['username']
    print(data,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
    users_collection = db['user_subscription']

    datasub_i = users_collection.find_one({'username':data}) 
    print("BBBBBBBBBBBBBBBbb",datasub_i.get('plan-Info.plan'))
    # print("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPp")
    datasub={
        'username':datasub_i.get('username'),
        'created':datasub_i.get('created'),
        'expiration':datasub_i.get('expiration'),
        'plan-Info':{
            'amount':datasub_i.get('plan-Info').get('amount'),
            'plan':datasub_i.get('plan-Info').get('plan'),
            'NoOfMsg':datasub_i.get('plan-Info').get('NoOfMsg'),
            'NoOfBots':datasub_i.get('plan-Info').get('NoOfBots') ,
            'NoOfCharacters':datasub_i.get('plan-Info').get('NoOfCharacters'),      
        }
    }
    print(datasub," MMMMMMMM")

    # print("dataDb =",dataDb)
    return [datasub['plan-Info'],datasub['username'],datasub['created'],datasub['expiration']]

@app.route('/api/paymenthistory',methods=['POST'])
def paymentdata():
    # data =  request.get_json()['decoded']['username']
    
    data =  request.get_json()['decoded']
    print("319------",data)
    users_collection = db['user_payment']
    dataDb =[] 
    # datasub={
    #     'username':datasub_i.get('username'),
    #     'created':datasub_i.get('created'),
    #     'payment':{
    #         'currency':datasub_i.get('payment').get('currency'),
    #         'name':datasub_i.get('payment').get('name'),
    #         'id':datasub_i.get('payment').get('id'),
    #         'name':datasub_i.get('payment').get('name'),
    #     },
    #     'product':{
    #         'amount':datasub_i.get('product').get('amount'),
    #         'product_id':datasub_i.get('product').get('product_id')

    #     }
        
    # }
    for datasub_i in users_collection.find({'username':data}):
        datasub={
        'username':datasub_i.get('username'),
        'created':datasub_i.get('created'),
        'payment':{
            'currency':datasub_i.get('payment').get('currency'),
            'name':datasub_i.get('payment').get('name'),
            'id':datasub_i.get('payment').get('id'),
            'name':datasub_i.get('payment').get('name'),
        },
        'product':{
            'amount':datasub_i.get('product').get('amount'),
            'product_id':datasub_i.get('product').get('product_id')

        }
        
    }

        # dataDb.append({'email': x['email'],'name':x['botname'] })  
        dataDb.append(datasub) 

        

    print("dataDb =",dataDb)
    return dataDb



if __name__ == '__main__':
    app.run(debug=True)
    #   app.run(host=socket.gethostname(), port=8080)  # Change the port to 8080 or 8888 . remove this if connection refused for email otp verification not work