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
from langchain.document_loaders import UnstructuredFileLoader
from langchain.document_loaders import OnlinePDFLoader

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

from apscheduler.schedulers.background import BackgroundScheduler
scheduler = BackgroundScheduler()
scheduler.start()



app = Flask(__name__)
CORS(app) 

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(stripepay,url_prefix="/stripepay")


client = MongoClient(MONGO)
db = client['chatbot']

from werkzeug.utils import secure_filename

app.secret_key = os.getenv("SESSION_SECRET_1")
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'  ################################# for using http instead of https in google auth

app.config['PDF'] = 'PDF'

dataOfSubs = {
            "year-hobby": {
                'amount': 20000,
                'plan': 'Hobby',
                'NoOfMsg': 500,
                'NoOfBots': 8,
                'NoOfCharacters': 500000,
            },
            "year-standard": {
                'amount': 40000,
                'plan': 'Standard',
                'NoOfMsg': 4000,
                'NoOfBots': 23,
                'NoOfCharacters': 5000000,
            },
            "year-pro": {
                'amount': 300000,
                'plan': 'Professional',
                'NoOfMsg': 30000,
                'NoOfBots': 48,
                'NoOfCharacters': 10000000,
            },
             "month-hobby": {
                'amount': 1900,
                'plan': 'Hobby',
                'NoOfMsg': 500,
                'NoOfBots': 8,
                'NoOfCharacters': 500000,
            },
            "month-standard": {
                'amount': 3900,
                'plan': 'Standard',
                'NoOfMsg': 4000,
                'NoOfBots': 23,
                'NoOfCharacters': 5000000,
            },
            "month-pro": {
                'amount': 30000,
                'plan': 'Professional',
                'NoOfMsg': 30000,
                'NoOfBots': 48,
                'NoOfCharacters': 10000000,
            },
           "free" :{
                'amount': 0,
                'plan': 'Free',
                'NoOfMsg': 20,
                'NoOfBots': 2,
                'NoOfCharacters': 20000,
            }
}
def choose_option(option):
    if option == "year-hobby":
       return {'amount':20000,
    'plan':'Hobby',
    'NoOfMsg':500,
    'NoOfBots':10 ,
    'NoOfCharacters':500000,}
    elif option == "year-standard":
       return {'amount':40000,
    'plan':'Standard',
    'NoOfMsg':4000,
    'NoOfBots':25 ,
    'NoOfCharacters':5000000,}
    elif option == "year-pro":
       return {'amount':300000,
    'plan':'Professional',
    'NoOfMsg':30000,
    'NoOfBots':50 ,
    'NoOfCharacters':10000000,}
    elif option == "month-hobby":
       return {'amount':1900,
    'plan':'Hobby',
    'NoOfMsg':500,
    'NoOfBots':10,
    'NoOfCharacters':500000,}
    elif option == "month-standard":
       return {'amount':3900,
    'plan':'Standard',
    'NoOfMsg':4000,
    'NoOfBots':25 ,
    'NoOfCharacters':5000000,}
    elif option == "month-pro":
       return {'amount':30000,
    'plan':'Professional',
    'NoOfMsg':30000,
    'NoOfBots':50,
    'NoOfCharacters':10000000,}
    else:
        return{
        'amount': 0,
        'plan': 'Free',
        'NoOfMsg': 20,
        'NoOfBots': 2,
        'NoOfCharacters': 20000,
    }


#################################  monthly replenishment of characters and messages 
def monthly_task():
    user_su = db['user_subscription']
    user_crawl = db['users_website_crawl_data']
    user_subs = user_su.find()
    for user_sub in user_subs:
        username = user_sub["username"]
        NoOfCharacters = user_sub["plan-Info"]['NoOfCharacters']
        plan = user_sub["plan-Info"]["plan"]
        print("187-------",plan)
        msg = choose_option(plan)
        user_su.update_many({"username": username}, {"$set": {"plan-Info.NoOfMsg": msg['NoOfMsg']}})
        user_crawl.update_many({"email": username}, {"$set": {"NoOfCharacters": NoOfCharacters}})
        print("---------", msg['NoOfMsg'])
    print("Monthly task completed.")

scheduler.add_job(monthly_task, 'cron', day='1', hour='0', minute='0')  
# scheduler.add_job(monthly_task, 'interval', minutes=1)  

######################################### LLM Code
def start_ai(query,userData):
   
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(userData)
    dataDb_i = users_collection.find_one({'_id':objId})

    dataDb = {
        'crawldata':dataDb_i.get('crawldata'),
        'crawldataPdf':dataDb_i.get('crawldataPdf'),
        'email':dataDb_i.get('email'),
        'botname':dataDb_i.get('botname'),
        'url':dataDb_i.get('url'),
        'prompt':dataDb_i.get('prompt')
    }
    
    data = dataDb['crawldata']
    dataPdf = dataDb['crawldataPdf']
    prompt = str(dataDb['prompt'])

    query = query
    text_splitter = TokenTextSplitter(chunk_size=1900,  chunk_overlap=300, length_function=len)
    text = text_splitter.create_documents( [data, dataPdf])
  
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

############################################### get message from users chatbot and send data back after getting response from LLM
@app.route('/api/msg',methods=['POST'])
def user_msg():
    # userName = request.get_json()['decoded']['username']
    data = request.get_json()['inputValue']
    userData = request.get_json()['botID']['botID']
    getid_1  = db['users_website_crawl_data']
    try:
        getid_2 = getid_1.find_one({'_id': ObjectId(userData)})
        if getid_2 == None:
            return "noid"
    except:
        return "noid"    
    print("241----------",getid_2)
    userName = getid_2['email']

    #EXpiartion code
    sub = db['user_subscription'] 
    datasub_i = sub.find_one({'username':userName})
    plan_1 = db['user_subscription']
    plan_2 = plan_1.find_one({"username": userName})
    planname = plan_2['plan-Info']['plan']
    datasub={
      'expiration':datasub_i.get('expiration'),
    }
    CharNo_1 = db['users_website_crawl_data']
    CharNo_2 = CharNo_1.find_one({'_id': ObjectId(userData)})
    print("133---------------------",CharNo_2['NoOfCharacters'])
    # print(datasub,"555555555555555555555555555555",datetime.strptime(datasub['expiration'], "%Y-%m-%d"),"WWW",datetime.now().date())
    if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date() or plan_2['plan-Info']['NoOfMsg'] < 1 or CharNo_2['NoOfCharacters'] < 1:
        print("EXpire---------------------------------------")
        return "SubE"

    # print("user msg ////////////////////////",userData)
    start_ai(data,userData)
    users_collection = db['users_website_crawl_data']
    d = users_collection.find_one({'email':userName})
    summaries = d['summaries']
    users_collection.update_one({"email": userName}, {'$set':{'summaries': ''}})
    plan_info_1 = db['user_subscription']
    plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.NoOfMsg":-1}})

    users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"NoOfCharacters": -len(str(summaries))}})
    print("143-----------------------------",str(summaries),"---",len(str(summaries)))


    # print("X ==",Gsummary)
    return [summaries, planname]



# ##################################################### create bot api start and expiration code original  pdf using url format
# @app.route('/api/sendLinkData',methods=['POST'])
# def get_link_data():
#     # print("INSide get the link data")
#     urll = [request.get_json()['sendLink']]
#     # userData = request.get_json()['decoded']['username']
#     userData = request.get_json()['decoded']
#     botName =  request.get_json()['botName']
#     exclude = request.get_json()['exclude']
#     pdf = request.get_json()['pdf']
#     if botName == '':
#         return 'noname'
#     print("299------exclude initial-------",exclude)
#     print("288-------------",pdf)
#     sub = db['user_subscription'] 
#     datasub_i = sub.find_one({'username':userData})
#     datasub={
#       'expiration':datasub_i.get('expiration'),
#       'plan-Info':{
#        'NoOfBots':datasub_i.get('plan-Info').get('NoOfBots'),
#        'NoOfCharacters': datasub_i.get('plan-Info').get('NoOfCharacters')
#        }
#     }
#     # print(datasub,"555555555555555555555555555555",datetime.strptime(datasub['expiration'], "%Y-%m-%d"),"WWW",datetime.now().date())
#     if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date():
#         return "SubE"
#     if datasub['plan-Info']['NoOfBots'] < 1:
#        return "BotF" 
#     # print("the link i recieved ",urll)
#     # print("username is ==", userData)
#     # print("305-----------------",request.get_json()['exclude'])
#     print("318-----------exclude----------",exclude)
#     get_data(urll,userData,botName,pdf,exclude,datasub['plan-Info']['NoOfCharacters'])
#     return urll


##################################################### create bot api start and expiration code original  pdf using upload multipart formdata format
@app.route('/api/sendLinkData',methods=['POST'])
def get_link_data():
    # print("INSide get the link data")
    urll = request.form.get('sendLink')
    exclude = request.form.get('exclude')
    userData = request.form.get('decoded')
    botName = request.form.get('botName')
    pdfFile = request.files.get('pdfFile')
    print("-------pdf",pdfFile)
    print("-----------url",len(urll))
    if pdfFile == None and len(urll) == 0:
        print("-------------------NO ENtry")
        return "FillOne"
    print("-------------------------Entry")
    pdf = ''
    unique = ''
    if pdfFile:
        try:
           unique = pdfFile.filename.split('.')[0] + str(datetime.now().date()).replace('-', '')  + str(datetime.now().time()).replace(':', '').replace('.', '')+ '.' + pdfFile.filename.split('.')[1] 
           pdf = os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['PDF'],secure_filename(unique))
           pdfFile.save(pdf)
           print("------------------------344----------ok",pdf)
           print("-----------351----------",str(datetime.now().date()).replace('-', '')  + str(datetime.now().time()).replace(':', '').replace('.', ''))
        except Exception as e:
            print("-----------346------------NO",e)      
    print("---------336----------",urll,exclude,userData,botName,pdf)
    if botName == '':
        return 'noname'
    print("299------exclude initial-------",exclude)
    print("288-------------",pdf)
    sub = db['user_subscription'] 
    datasub_i = sub.find_one({'username':userData})
    datasub={
      'expiration':datasub_i.get('expiration'),
      'plan-Info':{
       'NoOfBots':datasub_i.get('plan-Info').get('NoOfBots'),
       'NoOfCharacters': datasub_i.get('plan-Info').get('NoOfCharacters')
       }
    }
    # print(datasub,"555555555555555555555555555555",datetime.strptime(datasub['expiration'], "%Y-%m-%d"),"WWW",datetime.now().date())
    if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date():
        return "SubE"
    if datasub['plan-Info']['NoOfBots'] < 1:
       return "BotF" 
    # print("the link i recieved ",urll)
    # print("username is ==", userData)
    # print("305-----------------",request.get_json()['exclude'])
    print("318-----------exclude----------",exclude)
    get_data(urll,userData,botName,pdf,unique,exclude,datasub['plan-Info']['NoOfCharacters'])
    return urll



################################################################## exclude links and store data from links in db
def get_data(urls,userData,botName,pdf,unique,exclude, NoOfCharacters):
    print("364---------------------",len(urls))
    data=''
    docs=''
    if len(urls) == 0:
        print("378-------------------")
        data = ['']
    else:
        print("-------387--------",urls)
        page_links = scrape_links_and_buttons(urls)
        print("pdf---------------------363----Links-----",page_links)
        print("----------296------",type(exclude.split(","))) 
        page_links_x = [link for link in page_links if link not in exclude.split(",")]
        print("Page links x:", page_links_x)
        loader = SeleniumURLLoader(urls=page_links_x)
        data = loader.load()

    if len(pdf) != 0 :  #CHange this to not equal to after testing------------------------------------------------------------------  
        print("381--------------",pdf)   
        loaderPDF = OnlinePDFLoader(
        pdf
        )
        print("382--------------",loaderPDF) 
        docs = loaderPDF.load()
        # print(docs,"--------------------336 pdf")
    else:
        docs = ['']  
        print("______-----------------386")  
    print("------------410",type(urls))

    users_collection = db['users_website_crawl_data']
    user_sub = db['user_subscription']
    user_data = {
        'NoOfCharacters': NoOfCharacters,
        'crawldata': str(data),
        'crawldataPdf':str(docs),
        'email': userData,
        'botname':botName,
        'url':urls,
        'pdf':unique,
        'initialMsg':'Ask me what you want to know',
        'suggestedPrompt':['What is the Chatbot About','Tell me About the webpage','Summarize the basic  topic of the webpage'],
        'FontData':{
            'font': 'arial',
            'userFontColor': '#0070DA',
            'userFontTextColor': '#FFFFFF',
            'cpuFontColor': '#3D4648',
            'cpuFontTextColor': '#FFFFFF',
            'backgroundColor': '#242439',
            'fontSize': '12px',
        },
        'prompt':" You are a world class analyst.You are having a conversation with the user about the  text and you have to answer the users questions. Please follow these rules: 1. Make it engaging and informative. 2. Should address the {query} very well. 3. Don't repeat your sentences and information 4. Always mention name of things or people you talk about. 5.Don't mention your name when answering, go straight to the answer   {text}  Human: {query} "             
    } 
    try:
       users_collection.insert_one(user_data)
        #  print(user_sub.find_one({"username":userData}),"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
       user_sub.update_one({"username": userData}, {"$inc": {"plan-Info.NoOfBots":-1}})
       print("Data stored successfully!")
    except Exception as e:
       print("Error storing data:============", str(e),"===========================")
    # print("dat stored hopefully = ")

############################################################# send data about individual bots back to frontend
@app.route('/api/updatebot/<id>',methods=['GET'])
def getupdatebot(id):

    users_collection = db['users_website_crawl_data']
    objId= ObjectId(id)
    dataDb_i = users_collection.find_one({'_id':objId})
    print("--------------458--------",dataDb_i)
    # print(dataDb_i)
    dataDb = {
        'email':dataDb_i.get('email'),
        'botname':dataDb_i.get('botname'),
        'prompt':dataDb_i.get('prompt'),
        'url':dataDb_i.get('url'),
        'pdf':dataDb_i.get('pdf'),
        'initialMsg':dataDb_i.get('initialMsg'),
        'suggestedPrompt':dataDb_i.get('suggestedPrompt')
    }
    data={
        'email':dataDb['email'],
        'botname':dataDb['botname'],
        'prompt':dataDb['prompt'],
        'url':dataDb['url'],
        'pdf':dataDb['pdf'],
        'initialMsg':dataDb['initialMsg'],
        'sPrompt':dataDb['suggestedPrompt']

    }
    # print(data)
    return data

###################################################################### get chatbot ui fontdata
@app.route('/api/fontdata/<id>',methods=['GET'])
def getfontdata(id):
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(id)
    dataDb_i = users_collection.find_one({'_id':objId})['FontData'] 
    iMsg =  users_collection.find_one({'_id':objId})['initialMsg']  
    sPrompt = users_collection.find_one({'_id':objId})['suggestedPrompt']
    dataDb = {
        'font':dataDb_i.get('font'),
        'userFontColor':dataDb_i.get('userFontColor'),
        'userFontTextColor':dataDb_i.get('userFontTextColor'),
        'cpuFontColor':dataDb_i.get('cpuFontColor'),
        'cpuFontTextColor':dataDb_i.get('cpuFontTextColor'),
        'backgroundColor':dataDb_i.get('backgroundColor'),
        'fontSize':dataDb_i.get('fontSize'),
        'initialMsg':iMsg,
        'suggestedPrompt':sPrompt
        
    }
    print(dataDb_i.get('font'))
    return dataDb

###################################################################### Update chatbot ui fontdata
@app.route('/api/fontdata/<id>',methods=['PUT'])
def updatefontdata(id):
    dataDb_i = request.get_json()['fontData']
    users_collection = db['users_website_crawl_data']
    dataDb = {
        'font':dataDb_i.get('font'),
        'userFontColor':dataDb_i.get('userFontColor'),
        'userFontTextColor':dataDb_i.get('userFontTextColor'),
        'cpuFontColor':dataDb_i.get('cpuFontColor'),
        'cpuFontTextColor':dataDb_i.get('cpuFontTextColor'),
        'backgroundColor':dataDb_i.get('backgroundColor'),
        'fontSize':dataDb_i.get('fontSize'),
    }
    print("507--------------",dataDb)
    objId= ObjectId(id)
    try:
        userData = users_collection.update_one({'_id':objId},{"$set":{'FontData': dataDb}})   
        return "Yes" 
    except:
        return "No"
    

########################################################### delete individual bot
@app.route('/api/deletebot/<id>',methods=['POST'])
def deletebot(id):
    objId= ObjectId(id) 
    users_collection = db['users_website_crawl_data']
    user_sub = db['user_subscription']
    del_user = users_collection.find_one({'_id':objId})
    username = del_user['email']
    print("467---------",username,"---",del_user['botname'])
    try:
        users_collection.delete_one({'_id':objId})
        user_sub.update_one({'username': username}, {"$inc": {"plan-Info.NoOfBots":1}})
        return "suc"
    except:
        return "fail"

######################################################### update individual bot data    
@app.route('/api/updatebot/<id>',methods=['PUT'])
def updatebot(id):
    print("KKKKKKKKKK")
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(id)
    # dataDb = users_collection.find_one({'_id':objId})
    data =  request.get_json()
    botname = data['botname']
    print(type(len(botname)),"YYY")
    if botname == '':
       return "noname"
    try:
         result = users_collection.update_one({'_id': ObjectId(id)}, {'$set': data})
         print(result)
         return "Update Successful"
    except Exception as e:
        print(e)
        return "Couldn't Update"     
    print(data)
    return "Coudn't Update"    

####################################################### send data about all bots of particular user back to frontend
@app.route('/api/mybots',methods=['GET','POST'])
def get_mybots():
    # data =  request.get_json()['decoded']['username']
    data =  request.get_json()['decoded']
    # print("my bots ",data)


    users_collection = db['users_website_crawl_data']

    dataDb =[] 
    for x in users_collection.find({'email':data}):
        dataDb.append({'email': x['email'],'name':x['botname'], 'id': str(x['_id']), 'NoOfCharacters': x['NoOfCharacters']})  

    # print("dataDb =",dataDb)
    return dataDb

    #puppetr

################################################ scraper code
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

######################################################### send subscription info back to frontend
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

########################################################### send payment history data back to frontend
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

#################################################################send name and phone to account page
@app.route('/api/profiledata',methods=['POST'])
def profileget():
    data =  request.get_json()['decoded']
    print("526----------",data)
    user_collection = db['users']
    user = user_collection.find_one({'username':data})
    phone = ''
    name = ''
    if user['phone'] != None or user['phone'] != '' :
        phone = user['phone']   
    if user['name'] != None or user['name'] != '' :   
        name = user['name']
    userdata = {
            'phone': phone,
            'name': name
        }   
    print("528---------------",userdata)
    return userdata

################################################################# update name and phone to account page
@app.route('/api/profiledata',methods=['PUT'])
def profileupdate():
    username =  request.get_json()['decoded']
    name =  request.get_json()['name']
    phone =  request.get_json()['phone']
    print("526----------",name)
    user_collection = db['users']
    try:
         result = user_collection.update_one({'username': username}, {'$set': {'name':name, 'phone':phone}})
         print(result,"--------------------547")
         return "Update Successful"
    except Exception as e:
        print(e)
        return "Couldn't Update"     
    




if __name__ == '__main__':
    app.run(debug=True)
   