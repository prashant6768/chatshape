import time
from flask import Blueprint, abort
import ast
import tiktoken
from bson import ObjectId
from auth import auth
from stripepay import stripepay
from flask import Flask, jsonify, request
from flask import Flask, send_file
import json
import asyncio
from flask_cors import CORS
from dotenv import find_dotenv, load_dotenv
import requests
import json
import os
from langchain import OpenAI, LLMChain, PromptTemplate
from langchain.chat_models import ChatOpenAI 
import  pythoncom

from langchain.document_loaders import SeleniumURLLoader
from langchain.document_loaders import UnstructuredFileLoader
from langchain.document_loaders import OnlinePDFLoader
from langchain.callbacks import get_openai_callback

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

from langchain.document_loaders import Docx2txtLoader
from langchain.document_loaders import TextLoader
from langchain.output_parsers import CommaSeparatedListOutputParser
from langchain.llms import OpenAIChat

from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

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
import ast

from apscheduler.schedulers.background import BackgroundScheduler

#### import for method 2 ######################33

import os
from dotenv import find_dotenv, load_dotenv

from langchain.document_loaders import SeleniumURLLoader
# from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import TokenTextSplitter

import pickle
import faiss


# from langchain.chains import RetrievalQAwithSourcesChain
# from langchain.chains import RetrievalQA
from langchain.chains.question_answering import load_qa_chain
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings


from langchain.agents import initialize_agent
from langchain.agents import AgentType


######### import for 2nd method finished ###########3

import speech_recognition as sr
from pydub import AudioSegment
AudioSegment
import pyttsx3
import ffmpeg
import io
import tempfile
import wave
import soundfile as sf

ffmpeg_path = r'C:/ffmpeg/ffmpeg-6.0-full_build/bin'
os.environ['PATH'] = f'{ffmpeg_path};' + os.environ['PATH']


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
app.config['AUDIO']= 'AUDIO'

dataOfSubs = {
            "year-simple": {
                'amount': 20000,
                'plan': 'Hobby',
                # 'NoOfMsg': 500,
                'NoOfBots': 8,
                'NoOfCharacters': 500000,
            },
            "year-standard": {
                'amount': 40000,
                'plan': 'Standard',
                # 'NoOfMsg': 4000,
                'NoOfBots': 23,
                'NoOfCharacters': 5000000,
            },
            # "year-pro": {
            #     'amount': 300000,
            #     'plan': 'Professional',
            #     'NoOfMsg': 30000,
            #     'NoOfBots': 48,
            #     'NoOfCharacters': 10000000,
            # },
             "month-simple": {
                'amount': 1900,
                'plan': 'Hobby',
                # 'NoOfMsg': 500,
                'NoOfBots': 8,
                'NoOfCharacters': 500000,
            },
            "month-standard": {
                'amount': 3900,
                'plan': 'Standard',
                # 'NoOfMsg': 4000,
                'NoOfBots': 23,
                'NoOfCharacters': 5000000,
            },
            # "month-pro": {
            #     'amount': 30000,
            #     'plan': 'Professional',
            #     'NoOfMsg': 30000,
            #     'NoOfBots': 48,
            #     'NoOfCharacters': 10000000,
            # },
           "free" :{
                'amount': 0,
                'plan': 'Free',
                # 'NoOfMsg': 20,
                'NoOfBots': 2,
                'NoOfCharacters': 20000,
            }
}
def choose_option(option):
    if option == "year-simple":
       return {'amount':96000,
    'plan':'year-simple',
    # 'NoOfMsg':500, 
    'tokens':10000,
    'NoOfCharacters':float('inf'),}
    elif option == "year-standard":
       return {'amount':240000,
    'plan':'year-standard',
    # 'NoOfMsg':4000,
    'tokens':100000,
    'NoOfCharacters':float('inf'),}
    # elif option == "year-pro":
    #    return {'amount':300000,
    # 'plan':'year-pro',
    # 'NoOfMsg':30000,
   
    # 'NoOfCharacters':10000000,}
    elif option == "month-simple":
       return {'amount':10000,
    'plan':'month-simple',
    # 'NoOfMsg':500,
   
    'tokens':10000,
    'NoOfCharacters':float('inf'),}
    elif option == "month-standard":
       return {'amount':25000,
    'plan':'month-standard',
    # 'NoOfMsg':4000,
    'tokens':100000,
  
    'NoOfCharacters':float('inf'),}
    # elif option == "month-pro":
    #    return {'amount':30000,
    # 'plan':'month-pro',
    # 'NoOfMsg':30000,
  
    # 'NoOfCharacters':10000000,}
    else:
        return{
        'amount': 0,
        'plan': 'Free',
        # 'NoOfMsg': 20,
     
        'tokens':100,
        'NoOfCharacters': 10000,
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
        # user_su.update_many({"username": username}, {"$set": {"plan-Info.NoOfMsg": msg['NoOfMsg']}})
        user_su.update_many({"username": username}, {"$set": {"plan-Info.tokens": msg['tokens']}})
        user_crawl.update_many({"email": username}, {"$set": {"NoOfCharacters": NoOfCharacters}})
        # print("---------", msg['NoOfMsg'])
    print("Monthly task completed.")

scheduler.add_job(monthly_task, 'cron', day='1', hour='0', minute='0')  
# scheduler.add_job(monthly_task, 'interval', minutes=1)  

##########################################################################333  data analytics daily task of saving data

def daily_task():
    dataCrawl = db['users_website_crawl_data']
    today_date = datetime.now().strftime("%Y-%m-%d")
    for x in dataCrawl.find():
        # NoOfCharacters = x['NoOfCharacters']
        username = x['email']
        print("--268",username)
        subDb = db['user_subscription']
        subData = subDb.find_one({'username':username})
        uniqueCon = x['UniqueCon']
        print("--271",subData)
        # todayUseChar = subData - NoOfCharacters
        tokenData = {
            'usage':subData['tokensUsed'],
            'date':today_date
        }
        ConData={
            'ConNo':uniqueCon,
            'date':today_date
        }
        dataCrawl.update_one(
            {'_id': x['_id']},
            {'$push': {'tokenData': tokenData}}
        )
        dataCrawl.update_one(
            {'_id': x['_id']}, 
            {'$push': {'UniqueConData': ConData}}
        )
        dataCrawl.update_one(
            {'_id': x['_id']}, 
            {'$set': {'UniqueCon': 0}}
        )
        subDb.update_one(
        {'username':username},
        {'$set': {'tokensUsed': 0}}
        )
    print("daily task-------")    

# scheduler.add_job(daily_task, 'interval', minutes=1)  
scheduler.add_job(daily_task,'cron' , day='*', hour='0', minute='0')  



##########################################################################3  record audio files from react
@app.route('/api/audio',methods=['POST'])
def audio():
     audio = request.files.get('audio')
     print("audio-----------274",audio)
     audioC = convert_webm_to_wav(audio)
     print("audioC-----------------------------------290 ",audioC)
     text = recognize_audio(audioC)
     if os.path.exists(audioC):
        os.remove(audioC)
     return text   

def convert_webm_to_wav(webm_file):
    # Save the uploaded WebM file
    unique = secure_filename(webm_file.filename)
    unique = webm_file.filename.split('.')[0] + str(datetime.now().date()).replace('-', '')  + str(datetime.now().time()).replace(':', '').replace('.', '')+ '.' + webm_file.filename.split('.')[1] 
    output_path_webm = os.path.join(os.path.abspath(os.path.dirname(__file__)), app.config['AUDIO'], unique)
    webm_file.save(output_path_webm)
    output_path_wav =output_path_webm.replace(".webm", ".wav")
    print("------293", output_path_webm,"------",output_path_wav)
    webm_to_wav(output_path_webm,output_path_wav)
    if os.path.exists(output_path_webm):
        os.remove(output_path_webm)
    return output_path_wav


def webm_to_wav(input_path, output_path):
    # Load the WebM file using pydub
    audio = AudioSegment.from_file(input_path, format="webm")

    # Export the audio as WAV format using ffmpeg
    audio.export(output_path, format="wav")


def recognize_audio(audio_file):
    # Initialize the speech recognition engine
    recognizer = sr.Recognizer()

    try:
        # Perform speech recognition on the WebM audio
        with sr.AudioFile(audio_file) as source:
            audio = recognizer.record(source)

        text = recognizer.recognize_google(audio)
        return text

    except sr.UnknownValueError:
        return "Oops! Could not understand audio."

    except sr.RequestError as e:
        return f"Error during speech recognition: {e}"


##############################################################3 history chat save to db
@app.route('/api/history',methods=['POST'])
def history():
    data = request.get_json()['processedArray']
    userData = request.get_json()['botID']['botID']
    now = request.get_json()['now']
    uniqueCon = request.get_json()['uniqueCon']

    users_collection = db['users_website_crawl_data']
    user_history = db['user_history']
    objId= ObjectId(userData)
    # print("---279",now,"---",data)
    # dataDb_i = users_collection.find_one({'_id':objId})
    if now != '' and len(data) != 0:
        # print("---282",now,"---",data)
        print(uniqueCon,"------",str(type(uniqueCon)))
        if uniqueCon == 1:
            print("UNI----285")
            user_history.insert_one({'time':now, 'botID':userData, 'chatHistory':data})
            return "uni"
        else:
            # print("-------289---",user_history.find_one({"botID":str(userData) }))
            user_history.update_one({"botID":str(userData),'time':now }, {"$set": {"chatHistory": data}})  
            return 'NO uni'
    return 'OK'

####################################################################3 chat history get
@app.route('/api/historyget/<id>',methods=['GET'])
def historyget(id):
    user_history = db['user_history']
    hist = []
    for x in user_history.find({'botID':str(id)}):
        print(x['chatHistory'])
        if len(x['chatHistory']) <= 1:
            user_history.delete_one({'_id': x['_id']})
    for x in user_history.find({'botID':str(id)}):
        data = {
            'time':x['time'],
            'history':x['chatHistory']
        }
        hist.append(data) 
        
    # print("--------303------",hist,"---------303--------")
    return hist




######################################### LLM Code
def start_ai(query,userData,uniqueCon):
  try:  
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(userData)
    dataDb_i = users_collection.find_one({'_id':objId})
    # return "this is a fake answer"

    dataDb = {
        'crawldata':dataDb_i.get('crawldata'),
        'crawldataPdf':dataDb_i.get('crawldataPdf'),
        # 'crawl':dataDb_i.get('crawl'),
        'email':dataDb_i.get('email'),
        'botname':dataDb_i.get('botname'),
        'url':dataDb_i.get('url'),
        'prompt':dataDb_i.get('prompt')
    }
    print("=-------------284",str(type([query])))

    data = dataDb['crawldata']
    dataPdf = dataDb['crawldataPdf']
    prompt = str(dataDb['prompt'])
    text_splitter = TokenTextSplitter(chunk_size=1900,  chunk_overlap=10, length_function=len)
    text = text_splitter.create_documents([dataPdf,data])

    print("------237--------",text,"----------------237")
    
   
    with get_openai_callback() as cb:
      PROMPT = PromptTemplate(
    template=prompt, input_variables=["text", "query"]
)
      chain_type_kwargs = {"prompt": PROMPT}
      qa_chain = load_qa_chain(ChatOpenAI(streaming=False, callbacks=[StreamingStdOutCallbackHandler()],model_name="gpt-4",temperature=0.7), chain_type="map_reduce")
    
      answer = qa_chain.run(input_documents= text, question=query)
      print("---------279---------",answer,"-----------279-----------",cb)

   
    return [answer,cb.total_tokens]

  except Exception as e:
    return str(e)  

############################################### get message from users chatbot and send data back after getting response from LLM
@app.route('/api/msg',methods=['POST'])
def user_msg():
  try:  
    # userName = request.get_json()['decoded']['username']
    data = request.get_json()['inputValue']
    userData = request.get_json()['botID']['botID']
    uniqueCon = request.get_json()['uniqueCon']
    getid_1  = db['users_website_crawl_data']
    try:
        getid_2 = getid_1.find_one({'_id': ObjectId(userData)})
        if getid_2 == None:
            return "noid"
    except:
        return "noid"    
    # print("241----------",getid_2)
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
    # if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date() or plan_2['plan-Info']['NoOfMsg'] < 1 or CharNo_2['NoOfCharacters'] < 1 or plan_2['plan-Info']['tokens'] < 1:
    if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date()  or CharNo_2['NoOfCharacters'] < 1 or plan_2['plan-Info']['tokens'] < 1:
        print("EXpire---------------------------------------")
        return "SubE"

    # print("user msg ////////////////////////",userData)
    summariesCb = start_ai(data,userData,uniqueCon)
    summaries = summariesCb[0]
    cb = summariesCb[1]
    print("-------479 ", summaries, int(cb))
    
    users_collection = db['users_website_crawl_data']
    plan_info_1 = db['user_subscription']
    # plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.NoOfMsg":-1}})
    plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.tokens":-cb}})
    plan_info_1.update_one({"username": userName}, {"$inc": {"tokensUsed":cb}})

    users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"NoOfCharacters": -len(str(summaries))}})
    users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"UniqueCon": uniqueCon}})

    # print("143-----------------------------",str(summaries),"---",len(str(summaries)))
    print("-------502-------",planname)
 
    # print("X ==",Gsummary)
    return [summaries, planname,uniqueCon]
  except Exception as e:
    print("-----482-------",str(e))
    return["Some Error Occured !!!!"]  

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
    if botName == '':
        return 'noname'

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
            return e     
    print("---------336----------",urll,exclude,userData,botName,pdf)
    print("299------exclude initial-------",exclude)
    print("288-------------",pdf)
    sub = db['user_subscription'] 
    # return jsonify(sub)
    datasub_i = sub.find_one({'username':userData})
    # datasub =datasub_i.get('expiration'),

    datasub={
      'expiration':datasub_i.get('expiration'),
      'plan-Info':{
       'NoOfBots':datasub_i.get('plan-Info').get('NoOfBots'),
       'NoOfCharacters': datasub_i.get('plan-Info').get('NoOfCharacters'),
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
    # print("-------------567----remove a = get_data() ",a)
    if os.path.exists(pdf):
        print("os path -------568",pdf)
        os.remove(pdf)
    return urll



################################################################## exclude links and store data from links in db
def get_data(urls,userData,botName,pdf,unique,exclude, NoOfCharacters):
  try:  
    print("364---------------------",len(urls))
    data=''
    docs=''
    if len(urls) == 0:
        print("378-------------------")
        data = ''
    else:
        print("-------387--------",urls)
        # return str(type(urls.split()))
        page_links = scrape_links_and_buttons(urls)
        # return page_links
        # print("------------------414--------",page_links)
        # return page_links

        print("pdf---------------------363----Links-----",page_links)
        print("----------296------",type(exclude.split(","))) 
        page_links_x = [link for link in page_links if link not in exclude.split(",")]
        # page_links_x = urls
        # str(type(page_links_x))
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
        docs = ''  
        print("______-----------------386")  
    print("------------410",type(urls))

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
    docsPdf = text_splitter.split_documents(docs)
    docsUrl = text_splitter.split_documents(data)
    mainDoc = docsUrl + docsPdf

    embeddings = OpenAIEmbeddings()
    db = FAISS.from_documents(mainDoc, embeddings)
    # # db.save_local("faiss_index")
    # # new_db = FAISS.load_local("faiss_index", embeddings)

    # print("docs tyep---------------619----------",db.index_to_docstore_id[0])
    print("docs tyep---------------619----------",db)
    
    
    users_collection = db['users_website_crawl_data']
    user_sub = db['user_subscription']
    print("hhhh")
    user_data = {
        'NoOfCharacters': NoOfCharacters,
        'crawldata': str(data),
        'crawldataPdf':str(docs),
        # 'crawl':db.index_to_docstore_id[0],
        'email': userData,
        'botname':botName,
        'url':urls,
        'pdf':unique,
        'initialMsg':'Ask me what you want to know',
        'suggestedPrompt':['What is the article About','Tell me About the webpage','Summarize the basic topic of the webpage in 30 words'],
        'FontData':{
            'font': 'arial',
            'userFontColor': '#0070DA',
            'userFontTextColor': '#FFFFFF',
            'cpuFontColor': '#3D4648',
            'cpuFontTextColor': '#FFFFFF',
            'backgroundColor': '#242439',
            'fontSize': '12px',
        },
        'tokenData':[],
        'UniqueCon':0,
        'UniqueConData':[],
        'prompt':" You are a world class analyst.You are having a conversation with the user about the  text and you have to answer the users questions. Please follow these rules: 1. Make it engaging and informative. 2. Should address the {query} very well. 3. Don't repeat your sentences and information 4. Always mention name of things or people you talk about. 5.Don't mention your name when answering, go straight to the answer   {text}  Human: {query} "             
    } 
    print("docs tyep---------------654----------",db)
    try:
       users_collection.insert_one(user_data)
        #  print(user_sub.find_one({"username":userData}),"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
       user_sub.update_one({"username": userData}, {"$inc": {"plan-Info.NoOfBots":-1}})
       print("Data stored successfully!")
    except Exception as e:
       print("Error storing data:============", str(e),"===========================")
    print("dat stored hopefully = ")
    return "FOUND NO ERROR"
  except Exception as e:
    print("error--------671--",str(e))
    return str(e)  


######################################################################3  Retrain your chatbots sources 
@app.route('/api/updateLinkData/<id>',methods=['POST'])
def retrain(id):
    objId= ObjectId(id)
    urll = request.form.get('sendLink')
    exclude = request.form.get('exclude')
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
           print("------------------------568----------ok",pdf)
           print("-----------569----------",str(datetime.now().date()).replace('-', '')  + str(datetime.now().time()).replace(':', '').replace('.', ''))
        except Exception as e:
            print("-----------571------------NO",e) 
            return e     
    print("---------573----------",urll,exclude,pdf)
    print("574------exclude initial-------",exclude)
    print("575-------------",pdf)
    userDb = db['users_website_crawl_data']
    print("---------577-------------",objId)
    userData_i = userDb.find_one({'_id':objId})
    
    NoOfCharacters = userData_i.get('NoOfCharacters')
    userData = userData_i.get('email')

    print("----------579--------------",userData)
    sub = db['user_subscription'] 
    datasub_i = sub.find_one({'username':userData})

    datasub={
      'expiration':datasub_i.get('expiration'),
      'plan-Info':{
       'NoOfBots':datasub_i.get('plan-Info').get('NoOfBots'),
       }
    }
    if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date():
        return "SubE"
    if datasub['plan-Info']['NoOfBots'] < 0:
       return "BotF" 

    print("593-----------exclude----------",exclude)
    get_data_retrain(urll,userData,objId,pdf,unique,exclude,NoOfCharacters)
    if os.path.exists(pdf):
        print("os path -------721",pdf)
        os.remove(pdf)
    return urll

################################################################## retrain data part 2 - exclude links and store data from links in db
def get_data_retrain(urls,userData,objId,pdf,unique,exclude, NoOfCharacters):
  try:  
    print("600---------------------",len(urls))
    data=''
    docs=''
    if len(urls) == 0:
        print("604-------------------")
        data = ''
    else:
        print("-------607--------",urls)
        # return str(type(urls.split()))
        page_links = scrape_links_and_buttons(urls)
        # return page_links
        # print("------------------414--------",page_links)
        # return page_links

        print("pdf---------------------614----Links-----",page_links)
        print("----------615------",type(exclude.split(","))) 
        page_links_x = [link for link in page_links if link not in exclude.split(",")]
        # page_links_x = urls
        # str(type(page_links_x))
        print("Page links x:", page_links_x)
        loader = SeleniumURLLoader(urls=page_links_x)
        data = loader.load()


    
    if len(pdf) != 0 :  #CHange this to not equal to after testing------------------------------------------------------------------  
        print("626--------------",pdf)   
        loaderPDF = OnlinePDFLoader(
        pdf
        )
        
        print("631--------------",loaderPDF) 
        docs = loaderPDF.load()
        # print(docs,"--------------------336 pdf")
    else:
        docs = ''  
        print("______-----------------386")  
    print("------------637",type(urls))
    
    users_collection = db['users_website_crawl_data']
    user_sub = db['user_subscription']

    try:
       users_collection.update_one({'_id':objId},{"$set":
       {
        'NoOfCharacters': NoOfCharacters,
        'crawldata': str(data),
        'crawldataPdf':str(docs),
        'url':urls,
        'pdf':unique,
        }})
        #  print(user_sub.find_one({"username":userData}),"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
       print("Data stored successfully!")
    except Exception as e:
       print("Error storing data:============", str(e),"===========================")
    # print("dat stored hopefully = ")
    return "FOUND NO ERROR"
  except Exception as e:
    return str(e)  

##########################################################################3  char graph date
@app.route('/api/chartToken/<id>',methods=['POST'])
def gettokendate(id):
    objId= ObjectId(id)
    users_collection = db['users_website_crawl_data']
    dataDb_i = users_collection.find_one({'_id':objId})
    time = request.get_json()['selectedTime']
    dataDb = [d for d in dataDb_i.get('tokenData') if d['date'].startswith(time)]
    if dataDb == []:
        return "nodata"
    print("--------693------",dataDb)
    return dataDb

@app.route('/api/chartCon/<id>',methods=['POST'])
def getcondate(id):
    objId= ObjectId(id)
    users_collection = db['users_website_crawl_data']
    dataDb_i = users_collection.find_one({'_id':objId})
    time = request.get_json()['selectedTimeCon']
    dataDb = [d for d in dataDb_i.get('UniqueConData') if d['date'].startswith(time)]
    if dataDb == []:
        return "nodata"
    print("--------693------",dataDb)
    return dataDb



############################################################# send data about individual bots back to frontend
@app.route('/api/updatebot/<id>',methods=['GET'])
def getupdatebot(id):

    users_collection = db['users_website_crawl_data']
    objId= ObjectId(id)
    dataDb_i = users_collection.find_one({'_id':objId})
    current_month = datetime.now().date().strftime("%Y-%m")

    print("--------------697--------",current_month)
    # print(dataDb_i)
    dataDb = {
        'email':dataDb_i.get('email'),
        'botname':dataDb_i.get('botname'),
        'prompt':dataDb_i.get('prompt'),
        'url':dataDb_i.get('url'),
        'pdf':dataDb_i.get('pdf'),
        'initialMsg':dataDb_i.get('initialMsg'),
        'suggestedPrompt':dataDb_i.get('suggestedPrompt'),
        'tokenData':[d for d in dataDb_i.get('tokenData') if d['date'].startswith(current_month)],
        'UniqueConData':[d for d in dataDb_i.get('UniqueConData') if d['date'].startswith(current_month)]
    }
    data={
        'email':dataDb['email'],
        'botname':dataDb['botname'],
        'prompt':dataDb['prompt'],
        'url':dataDb['url'],
        'pdf':dataDb['pdf'],
        'initialMsg':dataDb['initialMsg'],
        'sPrompt':dataDb['suggestedPrompt'],
        'tokenData':dataDb['tokenData'],
        'UniqueConData':dataDb['UniqueConData']

    }
    # print(data)
    return data

###################################################################### get chatbot ui fontdata
@app.route('/api/fontdata/<id>',methods=['GET'])
def getfontdata(id):
    users_collection = db['users_website_crawl_data']
    user_sub = db['user_subscription']
    objId= ObjectId(id)
    dataDb_i = users_collection.find_one({'_id':objId})['FontData'] 
    iMsg =  users_collection.find_one({'_id':objId})['initialMsg']  
    sPrompt = users_collection.find_one({'_id':objId})['suggestedPrompt']
    email = users_collection.find_one({'_id':objId})['email']
    plan = user_sub.find_one({'username':email})['plan-Info']['plan']
    dataDb = {
        'font':dataDb_i.get('font'),
        'userFontColor':dataDb_i.get('userFontColor'),
        'userFontTextColor':dataDb_i.get('userFontTextColor'),
        'cpuFontColor':dataDb_i.get('cpuFontColor'),
        'cpuFontTextColor':dataDb_i.get('cpuFontTextColor'),
        'backgroundColor':dataDb_i.get('backgroundColor'),
        'fontSize':dataDb_i.get('fontSize'),
        'initialMsg':iMsg,
        'sPrompt':sPrompt,
        'plan':plan
        
    }
    print("plan-----------863--",plan)
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

        if(x['NoOfCharacters'] == float('inf')):
           dataDb.append({'email': x['email'],'name':x['botname'], 'id': str(x['_id']), 'NoOfCharacters': 'Infinity'})  
           print("yosh-----------910")
        else:
           dataDb.append({'email': x['email'],'name':x['botname'], 'id': str(x['_id']) , 'NoOfCharacters': x['NoOfCharacters']})  
    # print("dataDb =",dataDb)
    return dataDb

    #puppetr

################################################ scraper code
def scrape_links_and_buttons(url):
  try:
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
  except Exception as e:
    return str(e)  

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
            # 'NoOfMsg':datasub_i.get('plan-Info').get('NoOfMsg'),
            'NoOfBots':datasub_i.get('plan-Info').get('NoOfBots') ,
            'tokens':datasub_i.get('plan-Info').get('tokens') ,
            'NoOfCharacters':datasub_i.get('plan-Info').get('NoOfCharacters'),      
        }
    }
    print(datasub," MMMMMMMM")
    if datasub['plan-Info']['NoOfCharacters'] == float('inf'):
        datasub['plan-Info']['NoOfCharacters'] = 'Infinity' 
        print("-----995")

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
   