import time
from flask import Blueprint, abort
import ast
from flask import Flask, Response
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

import re
import uuid
import psutil

from langchain.docstore.document import Document
from langchain.document_loaders import SeleniumURLLoader
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
# from langchain.text_splitter import RecursiveCharacterTextSplitter
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
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import Firefox ######################################################firefox
from selenium.webdriver.firefox.options import Options as FirefoxOptions#####################################################firefox
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common import exceptions  



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
from datetime import datetime , timedelta
from dateutil.relativedelta import relativedelta
import ast

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

#### import for method 2 ######################33

import os
from dotenv import find_dotenv, load_dotenv

from langchain.document_loaders import SeleniumURLLoader
from unstructured.partition.html import partition_html
# from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import TokenTextSplitter

# import pickle

# from langchain.chains import RetrievalQAwithSourcesChain
from langchain.chains import RetrievalQA
from langchain.chains.question_answering import load_qa_chain
from langchain.chains import LLMChain
from langchain import PromptTemplate, OpenAI, LLMChain
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.chains import VectorDBQA
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from sentence_transformers import SentenceTransformer
from langchain.embeddings import OpenAIEmbeddings

from langchain.llms import CTransformers ###################33
from llama_cpp import Llama ######################

from langchain.llms import LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

# __import__('pysqlite3')
import sys
# print("----------117",sys.modules['sqlite3'],"---------117")  # <module 'sqlite3' from 'C:\\Users\\DELL\\AppData\\Local\\Programs\\Python\\Python310\\lib\\sqlite3\\__init__.py'>
# sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')
import chromadb
from chromadb.config import Settings
from langchain.vectorstores import Chroma
from chromadb.utils import embedding_functions


from langchain.agents import initialize_agent
from langchain.agents import AgentType

from langchain.callbacks.base import AsyncCallbackHandler

from langchain.schema import (
    HumanMessage,
)

from flask_mail import Mail, Message
import random
import smtplib, ssl

# from langchain.evaluation import load_evaluator
# evaluator = load_evaluator("criteria", criteria="conciseness")
# # This is equivalent to loading using the enum
# from langchain.evaluation import EvaluatorType
# evaluator = load_evaluator(EvaluatorType.CRITERIA, criteria="conciseness")
# from langchain.evaluation import load_evaluator, EvaluatorType

######### import for 2nd method finished ###########3

import speech_recognition as sr
from pydub import AudioSegment
# import pyttsx3
import ffmpeg
# import io
# import tempfile
# import wave
# import soundfile as sf


ffmpeg_path = r'C:/ffmpeg/ffmpeg-6.0-full_build/bin'
os.environ['PATH'] = f'{ffmpeg_path};' + os.environ['PATH']


scheduler = BackgroundScheduler()
scheduler.start()



application = Flask(__name__)
CORS(application) 

# import eventlet
# import gevent
# gevent.monkey_patch()
# eventlet.monkey_patch()

application.register_blueprint(auth, url_prefix="/auth")
application.register_blueprint(stripepay,url_prefix="/stripepay")

client = MongoClient(MONGO)
db = client['chatbot']

from werkzeug.utils import secure_filename

application.secret_key = os.getenv("SESSION_SECRET_1")
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'  ################################# for using http instead of https in google auth

EMAILPASS = os.getenv("EMAILPASS")

application.config['PDF'] = 'PDF'
application.config['AUDIO']= 'AUDIO'


#######################################################3  stream custom code
import sys
from typing import Any, Dict, List, Union

from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema import AgentAction, AgentFinish, LLMResult
from flask_socketio import SocketIO , send , emit , join_room , leave_room




socketio = SocketIO(application, cors_allowed_origins="*", async_mode="threading")


###################################  socket io 
 

@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    # print(f'A user joined room {room}',type(room))
    socketio.emit('welcome_message', {'message': f'Welcome to room from backend join function {room}'}, room=room)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    print(f'A user left room {room}')

@socketio.on('test')
def on_test():
    print("AAAAAAAAa-----test-------------214-----")
    socketio.emit('test', {'message': f'BBBBBBB testing from backend------'})
@socketio.on('testRoom')
def on_test(data):
    room = data['room']
    join_room(room)
    print("AAAAAAAAa-----test--room-----------214-----")
    socketio.emit('testRoom', {'message': f'BBBBBBBb RRRRRRRRRRWelcome to test room from backend {room}'}, room=room)   


def handle_message(data):
    try:
        roomID = data['room']
        print(" ----------------292- ",roomID)
        message = data['msg']
        socketio.emit('message-chat',{'message':message},room=str(roomID))
    except Exception as e:
        print(str(e),"====================240")    

##################################3  socket io end

class StreamingHandle(BaseCallbackHandler):
    """Callback handler for streaming. Only works with LLMs that support streaming."""

    def __init__(self, objId):
        super().__init__()
        self.objId = objId

    def on_llm_start(
        self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> None:
        """Run when LLM starts running."""


    def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        try:
            # status = '200 OK'
            # response_headers = [('Content-type', 'text/plain')]
            # start_response(status, response_headers)
       ####################################3 remove if error
            sys.stdout.write(token)
            handle_message({'msg':token, 'room':self.objId})
            sys.stdout.flush()  
        except Exception as e:
            print(str(e),"================264")    
    

    def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
        """Run when LLM ends running."""

    def on_llm_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> None:
        """Run when LLM errors."""

    def on_chain_start(
        self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any
    ) -> None:
        """Run when chain starts running."""

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> None:
        """Run when chain ends running."""

    def on_chain_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> None:
        """Run when chain errors."""

    def on_tool_start(
        self, serialized: Dict[str, Any], input_str: str, **kwargs: Any
    ) -> None:
        """Run when tool starts running."""

    def on_agent_action(self, action: AgentAction, **kwargs: Any) -> Any:
        """Run on agent action."""
        pass

    def on_tool_end(self, output: str, **kwargs: Any) -> None:
        """Run when tool ends running."""

    def on_tool_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> None:
        """Run when tool errors."""

    def on_text(self, text: str, **kwargs: Any) -> None:
        """Run on arbitrary text."""

    def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> None:
        """Run on agent end."""


#####################################################   stream custom code end

dataOfSubs = {
            "year-simple": {
                'NoOfBots': 2,

            },
            "year-standard": {
                'NoOfBots': 10,
            },
             "month-simple": {
                'NoOfBots': 2,
            },
            "month-standard": {
                'NoOfBots': 10,
            },
           "Free" :{
                'NoOfBots': 1,
            }
}
def choose_option(option):
    if option == "year-simple":
       return {'amount':96000,
    'plan':'year-simple',
    # 'NoOfMsg':500, 
    'tBots':2,
    'tokens':10000,
    'NoOfCharacters':float('inf'),}
    elif option == "year-standard":
       return {'amount':240000,
    'plan':'year-standard',
    # 'NoOfMsg':4000,
    'tBots':10,
    'tokens':100000,
    'NoOfCharacters':float('inf'),}
    elif option == "month-simple":
       return {'amount':10000,
    'plan':'month-simple',
    # 'NoOfMsg':500,
    'tBots':2,
   
    'tokens':10000,
    'NoOfCharacters':float('inf'),}
    elif option == "month-standard":
       return {'amount':25000,
    'plan':'month-standard',
    # 'NoOfMsg':4000,
    'tBots':10,
    'tokens':100000,
  
    'NoOfCharacters':float('inf'),}
    else:
        return{
        'amount': 0,
        'plan': 'Free',
        # 'NoOfMsg': 20,
        'tBots':1,
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
        plan = user_sub["plan-Info"]["plan"]
        print("187-------",plan)
        msg = choose_option(plan)
        user_su.update_many({"username": username}, {"$set": {"plan-Info.tokens": msg['tokens']}})
    print("Monthly task completed.")

scheduler.add_job(monthly_task, 'cron', day='1', hour='0', minute='0')  
# scheduler.add_job(monthly_task, 'interval', minutes=1)  

##########################################################################333  data analytics daily task of saving data

def daily_task():
    dataCrawl = db['users_website_crawl_data']
    today_date = (datetime.now()- timedelta(days=1)).strftime("%Y-%m-%d")
   
    for x in dataCrawl.find():
        # NoOfCharacters = x['NoOfCharacters']
        username = x['email']
        # print("--268",x)
        subDb = db['user_subscription']
        subData = subDb.find_one({'username':username})
        uniqueCon = x['UniqueCon']
        tokenU = x['TokenUsed']
        # print("--271",subData)
        # todayUseChar = subData - NoOfCharacters
        tokenData = {
            'usage':tokenU,
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
        dataCrawl.update_one(
            {'_id': x['_id']}, 
            {'$set': {'TokenUsed': 0}}
        )
        subDb.update_one(
        {'username':username},
        {'$set': {'tokensUsed': 0}}
        )
    print("daily task-------")  
    print("--------424---------chk scheduler instances-----", scheduler.get_jobs())  

# trigger = CronTrigger(
#         year="*", month="*", day="*", hour="3", minute="0", second="5"
#     )
# scheduler.add_job(daily_task,trigger=trigger , day='*', hour='0', minute='0')     
# scheduler.add_job(daily_task, 'interval', minutes=1)  
scheduler.add_job(daily_task,'cron' , day='*', hour='0', minute='0')  



##########################################################################3  record audio files from react
@application.route('/api/audio',methods=['POST'])
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
    output_path_webm = os.path.join(os.path.abspath(os.path.dirname(__file__)), application.config['AUDIO'], unique)
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
@application.route('/api/history',methods=['POST'])
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
@application.route('/api/historyget/<id>',methods=['GET'])
def historyget(id):
    user_history = db['user_history']
    hist = []
    for x in user_history.find({'botID':str(id)}):
        # print(x['chatHistory'])
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


######################################### LLM Code  #####  STREAM
# import asyncio

def start_ai(query,userData,uniqueCon):
  try:  
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(userData)
    dataDb_i = users_collection.find_one({'_id':objId})
    dataManage_i = db['manage']
    dataManage = dataManage_i.find_one({})
    if dataManage == None:
        dataManage = {
           'embedScript':'<script src="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js" defer id="popup" cred="${id.id}"></script>',
            'model_temp':0.3,
            'docSrch':2,
            'sssm':'cosine' ,
        }

    # return "this is a fake answer"

    dataDb = {
        'crawldata':dataDb_i.get('crawldata'),
        'crawldataPdf':dataDb_i.get('crawldataPdf'),
        'crawl':dataDb_i.get('crawl'),
        'email':dataDb_i.get('email'),
        'botname':dataDb_i.get('botname'),
        'url':dataDb_i.get('url'),
        'prompt':dataDb_i.get('prompt')+" If you can't find an answer just say 'Relevant Data not found'. Do not make anything by yourself"
    }
    print("=-------------284",str(type([query])))

    dataEmb = dataDb['crawl']

    print("----------442-------")
    collectionX = None
    try:
      clientX = chromadb.Client() 
      collectionX = clientX.create_collection(
          name="collection_name_zema",
          metadata={"hnsw:space": dataManage['sssm']}, # l2 is the default, cosine, ip
      )
      print("----------------------------452------------")
      collectionX.add(
      documents=dataEmb['documents'],
      metadatas=dataEmb['metadatas'],
      embeddings=dataEmb['embeddings'],
      ids=dataEmb['ids']
)     
    except Exception as e:
        print("-------457-------",str(e)) 
        return str(e)
    try:
      results = collectionX.query(
      query_texts=[query],
      n_results=dataManage['docSrch']
)
      clientX.delete_collection(name="collection_name_zema")
    except Exception as e:
        print("-------464-------------",str(e))
        return str(e)
    print("----------457---------",results['distances'],"--------457")
    print("----------457---------",results['metadatas'],"--------457")

    resultText = [item for sublist in results['documents'] for item in sublist]

    prompt = str(dataDb['prompt'])
    text_splitter = TokenTextSplitter(chunk_size=1900,  chunk_overlap=300, length_function=len)
    # text_splitter = CharacterTextSplitter(separator='\n\n', chunk_size=400, chunk_overlap=50, length_function=len)
    text = text_splitter.create_documents(resultText)
    # print(text,"--------602")
    # return text 

    content = str(text)

    with get_openai_callback() as cb:
      PROMPT = PromptTemplate(
        template=prompt, input_variables=["text", "query"]
      ) 

      input_string = prompt
      placeholder_q = "{query}"
      replacement_q = query
      input_string = input_string.replace(placeholder_q, replacement_q)
      placeholder_r = "{text}"
      replacement_r = content
      input_string_F = input_string.replace(placeholder_r, replacement_r)

      chain_type_kwargs = {"prompt": PROMPT}

      try:
          llm = ChatOpenAI(model_name="gpt-4",temperature=dataManage['model_temp'],openai_api_key=OPENAI_API_KEY ,streaming=True,callbacks=[StreamingHandle(objId)])
      
        #   config = {'max_new_tokens': 216, 'repetition_penalty': 1.1, 'context_length':1096,'temperature':0.9,'stream':True}
        #   llm = CTransformers(model='c:/Users/DELL/Desktop/apni/LLAMA 2 model/llama-2-7b-chat.Q2_K.gguf', model_type='llama', config=config ,callbacks=[StreamingHandle(objId), StreamingStdOutCallbackHandler()]) 

#           callback_manager = CallbackManager([StreamingHandle(objId)])
#           llm = LlamaCpp(
#     model_path="c:/Users/DELL/Desktop/apni/LLAMA 2 model/llama-2-7b-chat.Q2_K.gguf",
#     temperature=0.75,
#     max_tokens=2000,
#     top_p=1,
#     n_ctx=1012,
#     callback_manager=callback_manager,
#     verbose=True,  # Verbose is required to pass to the callback manager
# )

          template=prompt
          prompt_template = PromptTemplate(input_variables=["text","query"],template=template)
          print("================prompt tem")
          summarize_chain = LLMChain(llm=llm, prompt=prompt_template,verbose=False)
          print("-----741-----",text,"------741-------")
          print(sys.getrecursionlimit(),"============",socketio.async_mode)

      except Exception as e:
          print("-----453-----",str(e))
          return str(e)
      try:
        answer = summarize_chain.predict(text=text,query=query)
        print(answer,"=============answer")
      except Exception as e:
        print(str(e),"===============644")  
      

      try:
        # config = {'max_new_tokens': 216, 'repetition_penalty': 1.1, 'context_length':1096}
        # config = { 'repetition_penalty': 1.1}
        template_DNF = "Does this {answer} is roughly means 'Couldn't find the specific info to answer'? Answer in yes or no only"
        prompt_template_DNF = PromptTemplate(input_variables=["answer"],template=template_DNF)
        llm_DNF = ChatOpenAI(model_name="gpt-4",temperature=1,openai_api_key=OPENAI_API_KEY)
        # llm_DNF = CTransformers(model='c:/Users/DELL/Desktop/apni/LLAMA 2 model/llama-2-7b-32k-instruct.Q2_K.gguf', model_type='llama', config=config) 

        chain_DNF = LLMChain(llm=llm_DNF, prompt=prompt_template_DNF,verbose=False)
        with get_openai_callback() as cb_DNF:
           answer_DNF = chain_DNF.predict(answer=answer)
        print("------------605--------",answer_DNF,'--',cb_DNF.total_tokens)
      except Exception as e:
        print("---------607------",str(e))  
        return str(e)





    #   print("--------748------",cb)
      encoding = tiktoken.get_encoding("cl100k_base")
      if answer.lower() == "relevant data not found.":
        print("-------634---------could work--------")
        return [ len(encoding.encode(input_string_F + "Human: "))+cb_DNF.total_tokens+5+len(encoding.encode(answer)),"RDNF"]
      if "relevant data not found." in answer.lower():
        print("-------634---------could work--------")
        return [ len(encoding.encode(input_string_F + "Human: "))+cb_DNF.total_tokens+5+len(encoding.encode(answer)),"RDNF"]
      if str(answer_DNF.lower()) == 'yes':
         return [answer,"RDN", len(encoding.encode(input_string_F + "Human: "))+cb_DNF.total_tokens+5+len(encoding.encode(answer))]
      return [answer, len(encoding.encode(input_string_F + "Human: "))+cb_DNF.total_tokens+5+len(encoding.encode(answer)),"OK"]

  except Exception as e:
    print("--626--",str(e))
    return str(e)  
   

############################################### get message from users chatbot and send data back after getting response from LLM
@application.route('/api/msg',methods=['POST'])
def user_msg():
  try:  
    # print("------------655--",request.url)
    # return str(request.url)
    data = request.get_json()['inputValue']
    userData = request.get_json()['botID']['botID']
    uniqueCon = request.get_json()['uniqueCon']
    if request.get_json()['chatUiDe']:
        chatUiDe = request.get_json()['chatUiDe']

    getid_1  = db['users_website_crawl_data']
    try:
        getid_2 = getid_1.find_one({'_id': ObjectId(userData)})
        if getid_2 == None:
            return "noid"
    except:
        return "noid"    
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
    if plan_2['status'] == 'Expired':
        return 'SubE'
    if datetime.strptime(datasub['expiration'], "%Y-%m-%d").date() < datetime.now().date()  or CharNo_2['NoOfCharacters'] < 1 or plan_2['plan-Info']['tokens'] < 1:
        plan_1.update_one({"username": userName}, {"$set": {"status":'Expired'}})
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        # port = 465 #-----------------------------------------------for SSL
        sender_email = "thedummydog@gmail.com"
        password = EMAILPASS
        email_headers = f"Subject: Zema Subscription Expired\r\n"
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
                    <p>Your Zema subscription has expired. Kindly renew your subscription to resume the services.</p>
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
            server.sendmail(sender_email, userName, email_message)
            # TODO: Send email here
        except Exception as e:
            # Print any error messages to stdout
            print(e)
        finally:
            server.quit()     

        print("EXpire---------------------------------------")
        return "SubE"

    summariesCb = start_ai(data,userData,uniqueCon)
    users_collection = db['users_website_crawl_data']
    plan_info_1 = db['user_subscription']
    if summariesCb[1] == 'RDNF':
        cb = summariesCb[0]
        summaries = summariesCb[1]
        print("---------676--could work------")
        
        if chatUiDe != 'True':
        # plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.NoOfMsg":-1}})
            plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.tokens":int(-cb)}})
            plan_info_1.update_one({"username": userName}, {"$inc": {"tokensUsed":int(cb)}})

            users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"TokenUsed": int(cb)}})
            users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"NoOfCharacters": -len(str(summaries))}})
        users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"UniqueCon": int(uniqueCon)}})
        
        return 'RDNF'
    if summariesCb[1] == 'RDN':
        cb = summariesCb[2]
        summaries = summariesCb[0]
        # plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.NoOfMsg":-1}})
        if chatUiDe != 'True':
            plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.tokens":int(-cb)}})
            plan_info_1.update_one({"username": userName}, {"$inc": {"tokensUsed":int(cb)}})

            users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"TokenUsed": int(cb)}})
            users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"NoOfCharacters": -len(str(summaries))}})
        users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"UniqueCon": int(uniqueCon)}})
        

        return [summariesCb[0],summariesCb[1]]    
    if summariesCb[2] == "OK":    
        summaries = summariesCb[0]
        cb = summariesCb[1]
        print("-------479 ", summaries,"----tokens--" ,int(cb))
    
        if chatUiDe != 'True':    
        # plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.NoOfMsg":-1}})
            plan_info_1.update_one({"username": userName}, {"$inc": {"plan-Info.tokens":int(-cb)}})
            plan_info_1.update_one({"username": userName}, {"$inc": {"tokensUsed":int(cb)}})

            users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"TokenUsed": int(cb)}})
            users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"NoOfCharacters": -len(str(summaries))}})
        users_collection.update_one({"_id":ObjectId(userData) }, {"$inc": {"UniqueCon": int(uniqueCon)}})
        

        print("-------502-------", planname)

        return [summaries, planname,uniqueCon]
    else:
        return ["Some Error Occured !!!!",summariesCb]    
  except Exception as e:
    print("-----482-------",str(e))
    return["Some Error Occured !!!!",str(e)]  


##################################################### create bot api start and expiration code original  pdf using upload multipart formdata format
@application.route('/api/sendLinkData',methods=['POST'])
def get_link_data():
  try:  
    # print("INSide get the link data")
    urll = request.form.get('sendLink')
    exclude = request.form.get('exclude')
    userData = request.form.get('decoded')
    botName = request.form.get('botName')
    # pdfFile = request.files.get('pdfFile')
    pdfFile = request.files.getlist('pdfFile[]') 
    multiLink = request.form.get('multiLink')
    print("-------pdf",pdfFile)
    # return 'ok'
    print(multiLink,"-----------url",len(urll))
    # return multiLink
    if botName == '':
        return 'noname'

    if pdfFile == None and len(urll) == 0:
        print("-------------------NO ENtry")
        return "FillOne"
    print("-------------------------Entry")
    # pdf = ''
    # unique = ''
    # if pdfFile:
    #     try:
    #        unique = pdfFile.filename.split('.')[0] + str(datetime.now().date()).replace('-', '')  + str(datetime.now().time()).replace(':', '').replace('.', '')+ '.' + pdfFile.filename.split('.')[1] 
    #        pdf = os.path.join(os.path.abspath(os.path.dirname(__file__)),application.config['PDF'],secure_filename(unique))
    #        print("------------------------344----------ok",pdf)
    #        return 'ok'
    #        pdfFile.save(pdf)
    #        print("-----------351----------",str(datetime.now().date()).replace('-', '')  + str(datetime.now().time()).replace(':', '').replace('.', ''))
    #     except Exception as e:
    #         print("-----------346------------NO",e) 
    #         return e        

    pdf = []
    unique = []
    uniqueStr = ''
    for i, pdf_file in enumerate(pdfFile):
        try:
            uniqueStr = f"{pdf_file.filename.split('.')[0]}_{i}_{str(datetime.now().date()).replace('-', '')}_{str(datetime.now().time()).replace(':', '').replace('.', '')}.{pdf_file.filename.split('.')[1]}"
            unique = unique+ [uniqueStr]
            print("1266----------",[uniqueStr])
            pdf_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), application.config['PDF'], secure_filename(uniqueStr))
            pdf.append(pdf_path)
            print(f"-----------File {i + 1} saved successfully: {pdf_path}")
            pdf_file.save(pdf_path)

        except Exception as e:
            print(f"-----------Error saving file {i + 1}: {e}")
            return str(e)

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
    value = get_data(urll,userData,botName,pdf,unique,exclude,multiLink,datasub['plan-Info']['NoOfCharacters'])
    # return value + "This is return at wrong place , fix it"
    # print("-------------567----remove a = get_data() ",a)

    # if os.path.exists(pdf):
    #     print("os path -------568",pdf)
    #     os.remove(pdf)
    for pdf_path in pdf:
        if os.path.exists(pdf_path):
            try:
                os.remove(pdf_path)
                print(f"File removed successfully: {pdf_path}")
            except Exception as e:
                print(f"Error removing file {pdf_path}: {e}")
        else:
            print(f"File does not exist: {pdf_path}")
    if value == "OK":  
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        # port = 465 #-----------------------------------------------for SSL
        sender_email = "thedummydog@gmail.com"
        password = EMAILPASS
        email_headers = f"Subject: Zema Chatbot created successfully\r\n"
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
                    <p>Your Chatbot has been created successfully</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{botName}</h2>
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
            server.sendmail(sender_email, userData, email_message)
            # TODO: Send email here
        except Exception as e:
            # Print any error messages to stdout
            print(e)
        finally:
            server.quit()     
        return "ok"
    else:
        return value   
  except Exception as e:
    return str(e)  



################################################################## exclude links and store data from links in db
# @profile
def get_data(urls ,userData ,botName ,pdf ,unique ,exclude , multiLink ,NoOfCharacters):
  try:  
    print("364---------------------",len(urls))
    data=''
    docs=[]
    page_links = []
    page_links_x=[]
    if len(urls) == 0:
        print("378-------------------")
        data = ''
    else:
        print(multiLink,"-------387--------",urls)
        # return str(type(urls.split()))
        if multiLink == "Y":
            arrStr = scrape_links_and_buttons(urls)
            if isinstance(arrStr, list):
                print("This is an array:", arrStr)
                page_links = arrStr[0]
            else:
                print("This is a string:", arrStr)
                return arrStr 
        else:
            print(urls)
            page_links.append(urls)           
        # return page_links
        # print("------------------414--------",page_links)
        # return page_links

        print("pdf---------------------363----Links-----",page_links)
        print("----------296------",type(exclude.split(","))) 
        if len(page_links) == 1:
            page_links_x = page_links
        else:    
            page_links_x = [link for link in page_links if link not in exclude.split(",")]
        # page_links_x = urls
        # str(type(page_links_x))
        print("Page links x:", page_links_x)
        # return page_links_x
        # loader = SeleniumURLLoader(urls=page_links_x)
        # data = loader.load()

        options = Options()
        options.add_argument('--headless')  
        options.add_argument('--disable-gpu')
        driver = webdriver.Chrome(options=options) 
        # driver = webdriver.Chrome(service=Service(r'/snap/bin/chromium.chromedriver'), options=options)  ###### for server code
        docsSel: List[Document] = list()
        # docsSel = []
        WebDriverWait(driver, timeout=10)
#         .until(
#     EC.visibility_of_element_located((By.XPATH, '//*'))
# )
        try:
            for url in page_links_x:
                try:
                    driver.get(url)
                    page_content = driver.page_source
                    elements = partition_html(text=page_content)
                    text = "\n\n".join([str(el) for el in elements])
                    metadata = {"source": url}
                    docsSel.append(Document(page_content=text, metadata=metadata))
                    # driver.close()
                    print("======================================================================================")
                except Exception as e:
                    print(str(e))
        except exceptions.StaleElementReferenceException as e:
            print(str(e))
            pass         
        driver.quit()

        data = docsSel
        # return "Wrong place to return. just for testing-------"


    
    if len(pdf) != 0 :  #CHange this to not equal to after testing------------------------------------------------------------------  
        print("381--------------",pdf)   
        # loaderPDF = OnlinePDFLoader(
        # pdf
        # )
        
        # print("382--------------",loaderPDF) 
        # docs = loaderPDF.load()
        # print(docs,"--------------------336 pdf")

        

        for pdf_path in pdf:
            print("Processing PDF:", pdf_path)
            try:
                loaderPDF = OnlinePDFLoader(pdf_path)
                # docs = loaderPDF.load()
                docs = docs + loaderPDF.load()

                # print(docs,"--------------------336 pdf")
            except Exception as e:
                print("Error loading PDF:", pdf_path, "-", e)
                return str(e)
    else:
        docs = []  
        print("______-----------------386")  
    print("------------410",type(urls))
    # return docs
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
    docsPdf = text_splitter.split_documents(docs)
    docsUrl = text_splitter.split_documents(data)
    mainDoc = docsUrl + docsPdf

    # embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    try:
        textM = [doc.metadata for doc in mainDoc]
        # return mainDoc
        textD = [doc.page_content for doc in mainDoc]
        # print("======846======",textD)
         ##########################################################3import import uuid
        textI = [str(uuid.uuid1()) for _ in textD]
        # textE = embeddings.embed_documents(texts=textD)
        textE = model.encode(textD).tolist()
        # print(embeddings,"==========850")
        # return
    except Exception as e:
        print(str(e))  
        return str(e)  
    # print(document_embeddings,"==========846") 
#     print("-------",textE)


    # try:
    #     dba = Chroma.from_documents(documents=mainDoc, embedding=embeddings)
    # except Exception as e:
    #     print("----844--",str(e))
    #     return str(e)  

    # Chroma =  <class 'langchain.vectorstores.chroma.Chroma'>     
    # dba = <langchain.vectorstores.chroma.Chroma object at 0x0000021AD9054430>
    # print("------842=---",dba,"------=842--") this is what it returns <langchain.vectorstores.chroma.Chroma object at 0x0000021AD9054430>
    # print("------842=---",dba.get(include=['embeddings','metadatas','documents'])['ids'],"------=842--")
    # print(dir(dba))
    # return str(embeddings)+" ==== "+str(mainDoc)

    users_collection = db['users_website_crawl_data']
    user_sub = db['user_subscription']
    print("hhhh")
    user_data = {
        'NoOfCharacters': NoOfCharacters,
        # 'crawl':dba.get(include=['embeddings','metadatas','documents']),
        'crawl':{
           'ids':textI,
           'metadatas':textM,
           'embeddings':textE,
           'documents':textD,
        },
        'email': userData,
        'botname':botName,
        'url':urls,
        'pdf':unique,
        'urlsUsed':page_links_x,
        'urlsEx':exclude.split(","),
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
        'TokenUsed':0,
        'UniqueCon':0,
        'UniqueConData':[],
        'prompt':" You are a world class analyst.You are having a conversation with the user about the  text and you have to answer the users questions. Please follow these rules: 1. Make it engaging and informative. 2. Should address the {query} very well. 3. Don't repeat your sentences and information 4. Always mention name of things or people you talk about. 5.Don't mention your name when answering, go straight to the answer   {text}  Human: {query} "             
    } 
    print("docs tyep---------------654--44--------","----------654--4---")
    try:
       users_collection.insert_one(user_data)
        #  print(user_sub.find_one({"username":userData}),"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
       user_sub.update_one({"username": userData}, {"$inc": {"plan-Info.NoOfBots":-1}})
       print("Data stored successfully!")
    except Exception as e:
       print("Error storing data:============", str(e),"===========================")
       return str(e) 
    print("dat stored hopefully = ")
    return "OK"
  except Exception as e:
    print("error--------671--",str(e))
    return str(e)  


######################################################################3  Retrain your chatbots sources 
@application.route('/api/updateLinkData/<id>',methods=['POST'])
def retrain(id):
  try:  
    objId= ObjectId(id)
    urll = request.form.get('sendLink')
    exclude = request.form.get('exclude')
    # pdfFile = request.files.get('pdfFile')
    pdfFile = request.files.getlist('pdfFile[]') 
    multiLink = request.form.get('multiLink')
    print("-------pdf",pdfFile)
    print("-----------url",len(urll))

    if pdfFile == None and len(urll) == 0:
        print("-------------------NO ENtry")
        return "FillOne"
    print("-------------------------Entry")
    # pdf = ''
    # unique = ''

    # if pdfFile:
    #     try:
    #        unique = pdfFile.filename.split('.')[0] + str(datetime.now().date()).replace('-', '')  + str(datetime.now().time()).replace(':', '').replace('.', '')+ '.' + pdfFile.filename.split('.')[1] 
    #        pdf = os.path.join(os.path.abspath(os.path.dirname(__file__)),application.config['PDF'],secure_filename(unique))
    #        pdfFile.save(pdf)
    #        print("------------------------568----------ok",pdf)
    #        print("-----------569----------",str(datetime.now().date()).replace('-', '')  + str(datetime.now().time()).replace(':', '').replace('.', ''))
    #     except Exception as e:
    #         print("-----------571------------NO",e) 
    #         return e     

    pdf = []
    unique = []
    uniqueStr = ''
    for i, pdf_file in enumerate(pdfFile):
        try:
            uniqueStr = f"{pdf_file.filename.split('.')[0]}_{i}_{str(datetime.now().date()).replace('-', '')}_{str(datetime.now().time()).replace(':', '').replace('.', '')}.{pdf_file.filename.split('.')[1]}"
            unique = unique+ [uniqueStr]
            print("1266----------",[uniqueStr])
            pdf_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), application.config['PDF'], secure_filename(uniqueStr))
            pdf.append(pdf_path)
            print(f"-----------File {i + 1} saved successfully: {pdf_path}")
            pdf_file.save(pdf_path)

        except Exception as e:
            print(f"-----------Error saving file {i + 1}: {e}")
            return str(e)

    print(unique,"---------573----------",urll,exclude,pdf)
    print("574------exclude initial-------",exclude)
    print("575-------------",pdf)
    userDb = db['users_website_crawl_data']
    print("---------577-------------",objId)
    userData_i = userDb.find_one({'_id':objId})
    
    NoOfCharacters = userData_i.get('NoOfCharacters')
    userData = userData_i.get('email')
    botName = userData_i.get('botname')

    # print("----------579--------------",userData_i)
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

    print(multiLink,"-----593-----------exclude----------",exclude)
    value = get_data_retrain(urll,userData,objId,pdf,unique,exclude,multiLink,NoOfCharacters)
    # if os.path.exists(pdf):
    #     print("os path -------721",pdf)
    #     os.remove(pdf)

    for pdf_path in pdf:
        if os.path.exists(pdf_path):
            try:
                os.remove(pdf_path)
                print(f"File removed successfully: {pdf_path}")
            except Exception as e:
                print(f"Error removing file {pdf_path}: {e}")
        else:
            print(f"File does not exist: {pdf_path}")

    if value == 'OK':   

        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        # port = 465 #-----------------------------------------------for SSL
        sender_email = "thedummydog@gmail.com"
        password = EMAILPASS
        email_headers = f"Subject: Zema Chatbot retrained successfully\r\n"
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
                    <p>Your Chatbot has been retrained successfully</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{botName}</h2>
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
            server.sendmail(sender_email, userData, email_message)
            # TODO: Send email here
        except Exception as e:
            # Print any error messages to stdout
            print(e)
        finally:
            server.quit()


        return "ok"
    else:
        return str(e)    
  except Exception as e:
    return str(e)
 
################################################################## retrain data part 2 - exclude links and store data from links in db
def get_data_retrain(urls,userData,objId,pdf,unique,exclude,multiLink, NoOfCharacters):
  try:  
    print("600---------------------",len(urls))
    data=''
    docs=[]
    page_links = []
    page_links_x=[]
    print("======1015",multiLink)
    if len(urls) == 0:
        print("604-------------------")
        data = ''
    else:
        if multiLink == "Y":
            arrStr = scrape_links_and_buttons(urls)
            if isinstance(arrStr, list):
                print("This is an array:", arrStr)
                page_links = arrStr[0]
            else:
                print("This is a string:", arrStr)
                return arrStr 
        else:
            page_links.append(urls) 
        print("====1030===",page_links)    
        # return page_links              
        # print("------------------929--------",page_links)
        if len(page_links) == 1:
            page_links_x = page_links
        else:    
            page_links_x = [link for link in page_links if link not in exclude.split(",")]
        print("Page links x: -------937---", page_links_x)
        # return page_links_x
        # loader = SeleniumURLLoader(urls=page_links_x)
        # data = loader.load()
        options = Options()
        options.add_argument('--headless')  
        options.add_argument('--disable-gpu')
        driver = webdriver.Chrome(options=options) 
        docsSel: List[Document] = list()
        # docsSel = []
        WebDriverWait(driver, timeout=10)
        
        try:
            for url in page_links_x:
                try:
                    driver.get(url)
                    page_content = driver.page_source
                    elements = partition_html(text=page_content)
                    text = "\n\n".join([str(el) for el in elements])
                    metadata = {"source": url}
                    docsSel.append(Document(page_content=text, metadata=metadata))
                except Exception as e:
                    print(str(e))
        except exceptions.StaleElementReferenceException as e:
            print(str(e))
            pass          

        driver.quit()
        data = docsSel
    
    if len(pdf) != 0 :  #CHange this to not equal to after testing------------------------------------------------------------------  
        print("626--------------",pdf)   
        # loaderPDF = OnlinePDFLoader(
        # pdf
        # )
        
        # print("631--------------",loaderPDF) 
        # docs = loaderPDF.load()
        # print(docs,"--------------------336 pdf")
        
        for pdf_path in pdf:
            print("Processing PDF:", pdf_path)
            try:
                loaderPDF = OnlinePDFLoader(pdf_path)
                # docs = loaderPDF.load()
                docs = docs + loaderPDF.load()

                # print(docs,"--------------------336 pdf")
            except Exception as e:
                print("Error loading PDF:", pdf_path, "-", e)
                return str(e)

    else:
        docs = []  
        print("______-----------------386")  
    print("------------637",type(urls))

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
    docsPdf = text_splitter.split_documents(docs)
    docsUrl = text_splitter.split_documents(data)
    mainDoc = docsUrl + docsPdf


    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    try:
        textM = [doc.metadata for doc in mainDoc]
        # return mainDoc
        textD = [doc.page_content for doc in mainDoc]
        # print("======846======",textD)
         ##########################################################3import import uuid
        textI = [str(uuid.uuid1()) for _ in textD]
        # textE = embeddings.embed_documents(texts=textD)
        textE = model.encode(textD).tolist()
        # print(embeddings,"==========850")
        # return
    except Exception as e:
        print(str(e))  
        return str(e)  
    
    users_collection = db['users_website_crawl_data']
    user_sub = db['user_subscription']

    try:
       users_collection.update_one({'_id':objId},{"$set":
       {
        'NoOfCharacters': NoOfCharacters,
        # 'crawldata': str(data),
        # 'crawldataPdf':str(docs),
        'crawl':{
           'ids':textI,
           'metadatas':textM,
           'embeddings':textE,
           'documents':textD,
        },
        'url':urls,
        'pdf':unique,
        'urlsUsed':page_links_x,
        'urlsEx':exclude.split(","),
        'embeddedQA':[],
        }})
        #  print(user_sub.find_one({"username":userData}),"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
       print("Data stored successfully!")
    except Exception as e:
       print("Error storing data:============", str(e),"===========================")
       return str(e)
    # print("dat stored hopefully = ")
    return "OK"
  except Exception as e:
    return str(e)  

##################################################################################  embed question
@application.route('/api/embedQuestion/<id>',methods=['POST'])
def embedquestion(id):
    try:
        objId= ObjectId(id)
        users_collection = db['users_website_crawl_data']
        dataDb_i = users_collection.find_one({'_id':objId})
        question = request.get_json()['queE']
        answer =  request.get_json()['ansE'] 
        qa = 'question: '+question+', answer: '+answer
   
        print(qa)
        doc=Document(
                page_content=qa,
                metadata={"question": question}
            )
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
        text = text_splitter.split_documents([doc])
        print(text,"===========================1013")

        embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        dba = Chroma.from_documents(documents=text, embedding=embeddings)
        print(dba.get()['ids'],"==1021")
        users_collection = db['users_website_crawl_data']
        users_collection.update_one({'_id':objId},{"$push":
       {
        'crawl.ids':dba.get(include=['embeddings','metadatas','documents'])['ids'][len(dba.get()['ids'])-1],
        'crawl.embeddings':dba.get(include=['embeddings','metadatas','documents'])['embeddings'][len(dba.get()['ids'])-1],
        'crawl.metadatas':dba.get(include=['embeddings','metadatas','documents'])['metadatas'][len(dba.get()['ids'])-1],
        'crawl.documents':dba.get(include=['embeddings','metadatas','documents'])['documents'][len(dba.get()['ids'])-1],
        }})
       
        users_collection.update_one({'_id':objId},{"$addToSet":{ 'embeddedQA': {
                'question': question,
                'answer': answer
            }}})
        users_collection.update_one({'_id':objId},{"$addToSet":{ 'embeddedQAsaved': {
                'question': question,
                'answer': answer
            }}})    
        print("--1008-",dba.get(include=['embeddings','metadatas','documents'])['metadatas'][len(dba.get()['ids'])-1],"---1008")
        dba=None
        
        ##################3333  not complete, embedding needs ids, metadata,etc (4 fields) , pdf metadata is same for all documents .
        return "success"
        
    except Exception as e:
        print(str(e),"---------1001")    
        return str(e)

##########################################################################3  char graph date
@application.route('/api/chartToken/<id>',methods=['POST'])
def gettokendate(id):
  try:  
    objId= ObjectId(id)
    users_collection = db['users_website_crawl_data']
    dataDb_i = users_collection.find_one({'_id':objId})
    time = request.get_json()['selectedTime']
    dataDb = [d for d in dataDb_i.get('tokenData') if d['date'].startswith(time)]
    if dataDb == []:
        return "nodata"
    print("--------693------",dataDb)
    return dataDb
  except Exception as e:
    return ["error",str(e)]  

@application.route('/api/chartCon/<id>',methods=['POST'])
def getcondate(id):
  try:  
    objId= ObjectId(id)
    users_collection = db['users_website_crawl_data']
    dataDb_i = users_collection.find_one({'_id':objId})
    time = request.get_json()['selectedTimeCon']
    dataDb = [d for d in dataDb_i.get('UniqueConData') if d['date'].startswith(time)]
    if dataDb == []:
        return "nodata"
    print("--------693------",dataDb)
    return dataDb
  except Exception as e:
    return ["error",str(e)] 



############################################################# send data about individual bots back to frontend
@application.route('/api/updatebot/<id>',methods=['GET'])
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
        'urlsUsed':dataDb_i.get('urlsUsed'),
        'urlsEx':dataDb_i.get('urlsEx'),
        'initialMsg':dataDb_i.get('initialMsg'),
        'suggestedPrompt':dataDb_i.get('suggestedPrompt'),
        'tokenData':[d for d in dataDb_i.get('tokenData') if d['date'].startswith(current_month)],
        'UniqueConData':[d for d in dataDb_i.get('UniqueConData') if d['date'].startswith(current_month)],
        'embeddedQA':dataDb_i.get('embeddedQA'),
        'embeddedQAsaved':dataDb_i.get('embeddedQAsaved'),
    }
    data={
        'email':dataDb['email'],
        'botname':dataDb['botname'],
        'prompt':dataDb['prompt'],
        'url':dataDb['url'],
        'pdf':dataDb['pdf'],
        'urlsUsed':dataDb['urlsUsed'],
        'urlsEx':dataDb['urlsEx'],
        'initialMsg':dataDb['initialMsg'],
        'sPrompt':dataDb['suggestedPrompt'],
        'tokenData':dataDb['tokenData'],
        'UniqueConData':dataDb['UniqueConData'],
        'embeddedQA':dataDb['embeddedQA'],
        'embeddedQAsaved':dataDb['embeddedQAsaved'],

    }
    # print(data)
    return data

###################################################################### get chatbot ui fontdata
@application.route('/api/fontdata/<id>',methods=['GET'])
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
@application.route('/api/fontdata/<id>',methods=['PUT'])
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
@application.route('/api/deletebot/<id>',methods=['POST'])
def deletebot(id):
    objId= ObjectId(id) 
    users_collection = db['users_website_crawl_data']

    error_log = db['error_log']
    issue_log = db['issue_log']
    user_history = db['user_history']

    user_sub = db['user_subscription']
    del_user = users_collection.find_one({'_id':objId})
    username = del_user['email']
    print("467---------",username,"---",del_user['botname'])
    try:
        users_collection.delete_one({'_id':objId})
        user_sub.update_one({'username': username}, {"$inc": {"plan-Info.NoOfBots":1}})
        print(objId,"=============1555")
        error_log.delete_many({'bot_id':str(objId)})
        issue_log.delete_many({'bot_id':str(objId)})
        user_history.delete_many({'botId':str(objId)})
        
        
        return "suc"
    except Exception as e:
        print(str(e),"================1562")
        return str(e)

######################################################### update individual bot data    
@application.route('/api/updatebot/<id>',methods=['PUT'])
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
@application.route('/api/mybots',methods=['GET','POST'])
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
    # driver = webdriver.Chrome(service=Service(r'/snap/bin/chromium.chromedriver'), options=options)
   
    driver.get(url)
 
    WebDriverWait(driver, timeout=10)

    links = []
    unique_links=[]
    print("-------1280---")
    # # Find all <a> tags for links
    try:
        for link in driver.find_elements(By.TAG_NAME, 'a'):
            href = link.get_attribute('href')
            if href:
                links.append(href)
    except exceptions.StaleElementReferenceException as e:
        print(str(e))
        pass      
        return str(e)        
    print("------1276---",links)
    for link in links:
       if link not in unique_links:
         unique_links.append(link)        

    driver.quit()
    print("================",unique_links,"=======e===")
    return [unique_links,"ok"]
  except Exception as e:
    return "from scrap link and buttons = "+str(e)  

######################################################### send subscription info back to frontend
@application.route('/api/subdata',methods=['POST'])
def subdata():
    data =  request.get_json()['decoded']
    # data =  request.get_json()['decoded']['username']
    print(data,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
    users_collection = db['user_subscription']

    datasub_i = users_collection.find_one({'username':data}) 
    print("BBBBBBBBBBBBBBBbb",datasub_i.get('plan-Info').get('plan'))
    # print("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPp")
    printData = choose_option(datasub_i.get('plan-Info').get('plan'))
    print("--------",datasub_i.get('plan-Info').get('plan'),"-----------------1404----",printData,"---------1404--")
    datasub={
        'username':datasub_i.get('username'),
        'created':datasub_i.get('created'),
        'expiration':datasub_i.get('expiration'),
        'plan-Info':{
            'amount':datasub_i.get('plan-Info').get('amount'),
            'plan':datasub_i.get('plan-Info').get('plan'),
            # 'NoOfMsg':datasub_i.get('plan-Info').get('NoOfMsg'),
            'NoOfBots':datasub_i.get('plan-Info').get('NoOfBots') ,
            'totalBots':printData.get('tBots'),
            'tokens':datasub_i.get('plan-Info').get('tokens') ,
            'totalTokens':printData.get('tokens'),
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
@application.route('/api/paymenthistory',methods=['POST'])
def paymentdata():
    data =  request.get_json()['decoded']
    print("319------",data)
    users_collection = db['user_payment']
    dataDb =[] 

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
@application.route('/api/profiledata',methods=['POST'])
def profileget():
    try:
        data =  request.get_json()['decoded1']
        print("1802----------",data)
        user_collection = db['users']
        user = user_collection.find_one({'username':data})
        print(data,'--------------1805------',user)
        phone = ''
        name = ''
        print(user['phone'],"====1807=====",user['name'])
        if user['phone'] != None or user['phone'] != '' :
            phone = user['phone']   
        if user['name'] != None or user['name'] != '' :   
            name = user['name']
        userdata = {
                'phone': phone,
                'name': name
            }   
        print("528---------------",userdata,"===================",datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        return userdata
    except Exception as e:
        print("------1818--------",str(e)) 
        return [str(e),'error']   

################################################################# update name and phone to account page
@application.route('/api/profiledata',methods=['PUT'])
def profileupdate():
    username =  request.get_json()['decoded1']
    name =  request.get_json()['name']
    phone =  request.get_json()['phone']
    print("1829----------",name)
    user_collection = db['users']
    try:
         result = user_collection.update_one({'username': username}, {'$set': {'name':name, 'phone':phone}})
         result = user_collection.update_one( {'username': username} ,  { "$set": { 'updated': datetime.now().strftime("%Y-%m-%d %H:%M:%S") } }) 

         print(result,"--------------------547")
         return "Update Successful"
    except Exception as e:
        print(e)
        return "Couldn't Update"     

#################################################################  Failure 5 consecutive msg , email super admins     
@application.route('/api/consecFailure',methods=['POST'])
def consecFailure():
    BotID =  request.get_json()['botID']['botID']
    FailMsg = request.get_json()['failmsg']
    ErrorMsg = request.get_json()['consecFailMsgF']
    today_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
       print(str(BotID),"---1274--",FailMsg,"----",ErrorMsg)

       errorData_i = db['error_log']
       data = {
       "error_message": ErrorMsg,
       "fail_message":FailMsg,
       "time": today_date,
       "bot_id":BotID
       }
       errorData_i.insert_one(data)

       user_collection = db['users_website_crawl_data']
       user_data = user_collection.find_one({'_id': ObjectId(str(BotID))})
       user_email = user_data['email'],
       user_bot = user_data['botname']
       print("----------1285--",user_email[0])
    except Exception as e:   
        print("-----1286-----",str(e))

    # return " no email for now chk"    

    EMAILPASS = os.getenv("EMAILPASS")
#     smtp_server = "smtp.gmail.com"
#     port = 587  
#     # port = 465
#     sender_email = "thedummydog@gmail.com"
#     password = EMAILPASS
    formatted_error_msg = "\n\n".join(
    '<h3>' +str(ErrorMsg[i]) + " => \n </h3>" +
    ('<p> "'+"Zema"+'"' if FailMsg[i * 2]['sender'] == '' else ' "'+ FailMsg[i * 2]['sender']+'"') +
    ": " + str(FailMsg[i * 2]['text']) + ",</p> " +
    (' <p>"'+"Zema"+'"' if FailMsg[i * 2 + 1]['sender'] == '' else ' "'+ FailMsg[i * 2 + 1]['sender']+'"</p>') +
    ": " + str(FailMsg[i * 2 + 1]['text'])+"</p>"
    for i in range(len(ErrorMsg))
)

    try:
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        # port = 465 #-----------------------------------------------for SSL
        sender_email = "thedummydog@gmail.com"
        password = EMAILPASS
        email_headers = f"Subject: Zema Chatbot Error\r\n"
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
                    <p>Failure in chatbot = "{user_bot}" </p>
                    <p>ID = "{str(BotID)}"</p>
                    <p>Client = "{user_email[0]}"</p>
                    <p>Failure in chatbot = "{formatted_error_msg}"  </p>
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
        username = user_email

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
            server.sendmail(sender_email,["aniketshival007@gmail.com","aniket@dshgsonic.com"], email_message)
            print("---------304")
            # TODO: Send email here
        except Exception as e:
            # Print any error messages to stdout
            print(e)
        finally:
            server.quit()   
    except Exception as e:
        return str(e)

    return "HELLO FROM CONSEC FAIL BACKEND"

############################################################   admin get user details
@application.route('/api/admin/data',methods=['POST'])
def admingetdata():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"

        userSub_i = db['user_subscription'] 
        user_subscriptions = list(userSub_i.find())

        user_data_i = db['users_website_crawl_data']
        user_data_i2 = list(user_data_i.find())

        userPay_i = db['user_payment']
        userPay = list(userPay_i.find())

        result2 = []

        for d in user_data_i2:
            result2.append({
                'username':d['email'],
                'tokensUsed':d['tokenData'],
                'UniqueCon':d['UniqueConData']
            })

        result = []
        for subscription in user_subscriptions:
            result.append({
                'username': subscription['username'],
                'plan':subscription['plan-Info']['plan'],
                'bots': dataOfSubs[subscription['plan-Info']['plan']]['NoOfBots'] - subscription['plan-Info']['NoOfBots'],
                'id': str(subscription['_id'])
            })
            print(chkAdmin,"1990----------",subscription['_id'])

        result3 = []
        for p in userPay:
            result3.append({
               'date':p['created'],
               'amount':p['product']['amount'],
               'username':p['username'],
               'plan':p['product']['product_id'],
    
            })

        return [result,result2,result3]
    except Exception as e:
        return ["error",str(e)]    


############################################################   admin get user details Individual
@application.route('/api/admin/dataIndi/<id>',methods=['POST'])
def admingetdataindi(id):
    try:
        objId = ObjectId(id)
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        userBot_i = db['users_website_crawl_data']    
        userSub_i = db['user_subscription'] 
        userPay_i = db['user_payment']
        userUser_i = db['users']
        user_subscriptions = userSub_i.find_one({'_id':objId})
        
        # print(user_subscriptions,"------1520")

        user = user_subscriptions['username']
        userSub_i = {
            'plan':user_subscriptions.get('plan-Info').get('plan'),
            'amount':user_subscriptions.get('plan-Info').get('amount'),
            'NoOfBots':user_subscriptions.get('plan-Info').get('NoOfBots'),
            'tokens':user_subscriptions.get('plan-Info').get('tokens'),
            'created':user_subscriptions.get('created'),
            'expiry':user_subscriptions.get('expiration'),
            'username':user_subscriptions.get('username'),
        }
        userSub = []
        userSub.append(userSub_i)
        # print("==========",userSub)
        userPay =[] 
        try:
            for datasub_i in userPay_i.find({'username':user}):
                datasub={
                'username':datasub_i.get('username'),
                'created':datasub_i.get('created'),
                'product_id':datasub_i.get('product').get('product_id'),
                'amount':datasub_i.get('product').get('amount'),
                
                'payment':{
                    'currency':datasub_i.get('payment').get('currency'),
                    'name':datasub_i.get('payment').get('name'),
                    'id':datasub_i.get('payment').get('id'),
                    'email':datasub_i.get('payment').get('email'),
                    'created':datasub_i.get('payment').get('created'),
                    'invoice_prefix':datasub_i.get('payment').get('invoice_prefix'),
                    'name':datasub_i.get('payment').get('name'),
                },    
            }
                userPay.append(datasub) 
        except Exception as e:
            print("-----------1578------",str(e))        
        
        userBot = []
        for dataBot_i in userBot_i.find({'email':user}):
            # print("------1582--------",dataBot_i.get('_id'))
            dataBot = {
                'username':dataBot_i.get('email'),
                'bot':dataBot_i.get('botname'),
                'sourcePdf':dataBot_i.get('pdf'),
                'sourceUrl':dataBot_i.get('url'),
                'tokenData':dataBot_i.get('tokenData'),
                'uniCon':dataBot_i.get('UniqueConData'),   
                'id':str(dataBot_i.get('_id')),  
            }
            userBot.append(dataBot) 
        print(type(userSub),type(userPay),type(userBot)) 
        return [userSub,userPay,userBot,user,'ok']
    except Exception as e:
        print(str(e),"--------1513")    

#################################################################3  admin bot data
@application.route('/api/admin/dataBot/<id>',methods=['POST'])
def admingetdatabot(id):
    try:
        objId = ObjectId(id)
        print(objId)
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        botData_i = db['users_website_crawl_data']
        bot = botData_i.find_one({'_id':objId})
        # print(botData,"-----------------1604")

        botData = {
           'email':bot.get('email'),
           'name':bot.get('botname'),
           'url':bot.get('url'),
           'pdf':bot.get('pdf'),
           'tokenData':bot.get('tokenData'),
           'uniqueData':bot.get('UniqueConData'),
           'bot_id':str(objId),
           'crawl':bot.get('crawl'),
           'botname':bot.get('botname'),
           'initialMsg':bot.get('initialMsg'),
           'suggestedQuery':bot.get('suggestedPrompt'),
           'font':bot.get('FontData'),
           'prompt':bot.get('prompt'),
           'urlsUsed':bot.get('urlsUsed'),
           'embeddedQA':bot.get('embeddedQA'),
           'urlsEx':bot.get('urlsEx'),

        }
        return [botData,'ok']
        
    except Exception as e:
        print(str(e),"--------1513") 
        return str(e)   

############################################################   admin get admin details
@application.route('/api/admin/dataAdmin',methods=['POST'])
def admindata():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        adminData_i = db['admin_data']
        admin_i = list(adminData_i.find())
        print(admin_i,"===========1623")

        admin = []
        for a in admin_i:
            adminD = {
            'admin':a.get('admin'),
            'id':str(a.get('_id')),
        }       
            admin.append(adminD)     
        print(admin,"===========1623")
        return [admin,'ok']
    except Exception as e:
        print(str(e),"==========1743")   

############################################################   admin  add admin
@application.route('/api/admin/addAdmin',methods=['POST'])
def addadmindata():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        dataUsername = request.get_json()['addAdmin']
        adminData_i = db['admin_data']
        userExist_i = db['users']

        userExist = userExist_i.find_one({'username':dataUsername})
        if userExist == None:
            return "No User"
        adminExist = adminData_i.find_one({'admin':dataUsername})   
        if adminExist != None:
            return "Already Admin" 
        inserted_data = adminData_i.insert_one({'admin':dataUsername})
        return "OK"
    except Exception as e:
        print(str(e),"==========1764")  
        return str(e)         


############################################################   admin  remove admin
@application.route('/api/admin/deleteAdmin',methods=['POST'])
def deleteadmindata():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        dataUsername = request.get_json()['e']
        adminData_i = db['admin_data']

        document_count = adminData_i.count_documents({})

        if document_count == 1:
            print("Only one left")
            return "Only1"

        # adminExist = adminData_i.find_one({'admin':dataUsername})   
        # if adminExist != None:
        #     return "Already Admin" 
        inserted_data = adminData_i.delete_one({'_id':ObjectId(dataUsername)})
        return "OK"
    except Exception as e:
        print(str(e),"==========1789")  
        return str(e)  

############################################################   admin  error log in super admin page , less detailed
@application.route('/api/admin/errorLog',methods=['POST'])
def errorLog():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        
        err_i = db['error_log']
        bot_db_i = db['users_website_crawl_data']
        errData_i = list(err_i.find())

        errData = []
        # print('----1804',errData_i)
        if errData_i != None:
            for a in errData_i:
                d =  {
                'err_id':str(a.get('_id')),
                'err_msg':a.get('error_message'),
                'fail_msg':a.get('fail_message'),
                'time':a.get('time'),
                'bot_id':a.get('bot_id'),
                'bot':bot_db_i.find_one({'_id': ObjectId(str(a.get('bot_id')))}).get('botname'),
            } 
                # print("=====1814==",d)
                errData.append(d) 
        return [errData,'ok']
    except Exception as e:
        print(str(e),"=========1816")  
        return str(e)  

############################################################   admin  error log in super admin page , more detailed
@application.route('/api/admin/errorLogIndi/<id>',methods=['POST'])
def errorLogIndi(id):
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        objId = str(id)
        print(objId)
        
        err_i = db['error_log']
        bot_db_i = db['users_website_crawl_data']
        errData_i = err_i.find({'bot_id':objId})

        errData = []
        for a in errData_i:
            d =  {
            'err_id':str(a.get('_id')),
            'err_msg':a.get('error_message'),
            'fail_msg':a.get('fail_message'),
            'time':a.get('time'),
            'bot_id':a.get('bot_id'),
            'bot':bot_db_i.find_one({'_id': ObjectId(str(a.get('bot_id')))}).get('botname'),
        } 
            # print(d)
            errData.append(d) 
        return [errData,'ok']
    except Exception as e:
        print(str(e),"==========1846")  
        return str(e)       

############################################################   admin  remove Zema user
@application.route('/api/admin/deleteUser',methods=['POST'])
def deleteUserdata():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        userToDel = request.get_json()['dataUsername']
        
        adminDb_i = db['admin_data']
        adminDb = adminDb_i.find_one({'admin':userToDel})
        if adminDb != None:
            return "UA"

        userDb_i = db['users']
        userDb = userDb_i.delete_one({'username':userToDel})  #33333333333333

        botDb_i = db['users_website_crawl_data']
        botDb = botDb_i.find({'email':userToDel})  #3333333333333
        
        botArr = []
        for document in botDb:
            botArr.append(str(document['_id']))
        print(botArr,"-----1784")    

        subDb_i = db['user_subscription']
        subDb = subDb_i.delete_one({'username':userToDel})  #3333333333

        payDb_i = db['user_payment']
        payDb = payDb_i.delete_many({'username':userToDel}) #3333333333333
        
        histDb_i = db['user_history']
        errDb_i = db['error_log']
        issDb_i = db['issue_log']

        for x in botArr:
            histDb = histDb_i.delete_many({'botID':str(x)})
            errDb = errDb_i.delete_many({'bot_id':str(x)})
            issDb = issDb_i.delete_many({'bot_id':str(x)})

        botDb = botDb_i.delete_many({'email':userToDel})  #3333333333333
        return "Del"
    except Exception as e:
        print(str(e),"==========1889")  
        return str(e)             

######################################################### update individual bot data Admin   
@application.route('/api/admin/updatebot/<id>',methods=['POST'])
def updatebotadmin(id):
    username =  request.get_json()['decoded']
    admin =  request.get_json()['adminToken']
    adminData = db['admin_data']
    chkAdmin = adminData.find_one({'admin':username})
    if chkAdmin == None or admin == None:
        return "You Are Not Authorized"
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


##################################################################################  Feedback issue submission
@application.route('/api/issue/<id>',methods=['POST'])
def issue(id):
    try:
        objId= ObjectId(id)
        users_collection = db['users_website_crawl_data']
        dataDb_i = users_collection.find_one({'_id':objId})
        username = dataDb_i.get('email')
        botname = dataDb_i.get('botname')
        issue = request.get_json()['issue']
        detailIssue =  request.get_json()['detailIssue'] 
        date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(detailIssue,"----------1884")
       
        issue_db = db['issue_log']

        issue_entry = {
            'bot_id': str(objId),
            'bot':botname,
            'username':username,
            'issue': issue,
            'detailIssue': detailIssue,
            'time':date,
        }
        result = issue_db.insert_one(issue_entry)
        return "success"
        
    except Exception as e:
        print(str(e),"---------1001")    
        return str(e)


############################################################   admin  issue log in super admin page , less detailed
@application.route('/api/admin/issueLog',methods=['POST'])
def issueLog():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        
        issue_i = db['issue_log']
        bot_db_i = db['users_website_crawl_data']
        issueData_i = list(issue_i.find())

        issueData = []
        for a in issueData_i:
            d =  {
            'issue_id':str(a.get('_id')),
            'issue':a.get('issue'),
            'detailIssue':a.get('detailIssue'),
            'username':a.get('username'),
            'bot_id':a.get('bot_id'),
            'bot':a.get('bot'),
            'time':a.get('time'),
        } 
            issueData.append(d) 
        return [issueData,'ok']
    except Exception as e:
        print(str(e),"==========1972")  
        return str(e)


############################################################   admin  issue log in super admin page , more detailed
@application.route('/api/admin/issueLogIndi/<id>',methods=['POST'])
def issueLogIndi(id):
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        objId = str(id)
        print(objId)
        
        issue_i = db['issue_log']
        bot_db_i = db['users_website_crawl_data']
        issueData_i = issue_i.find({'bot_id':objId})

        issueData = []
        for a in issueData_i:
            d =  {
            'issue_id':str(a.get('_id')),
            'issue':a.get('issue'),
            'detailIssue':a.get('detailIssue'),
            'username':a.get('username'),
            'bot_id':a.get('bot_id'),
            'bot':a.get('bot'),
            'time':a.get('time')
        } 
            # print(d)
            issueData.append(d) 
        return [issueData,'ok']
    except Exception as e:
        print(str(e),"==========2004")  
        return str(e) 


##################################################################################  embed question
@application.route('/api/embedQuestionSavedRemove/<id>',methods=['POST'])
def embedquestionremove(id):
    try:
        objId= ObjectId(id)
        users_collection = db['users_website_crawl_data']
        dataDb_i = users_collection.find_one({'_id':objId})
        question = request.get_json()['queE']
        answer =  request.get_json()['ansE'] 
        qa = 'question: '+question+', answer: '+answer
        existing_qa = {'question': question, 'answer': answer}
    
        result = users_collection.update_one(
        {'_id': objId},
        {'$pull': {'embeddedQAsaved': existing_qa}}
    )
        return "success"
        
    except Exception as e:
        print(str(e),"---------1001")    
        return str(e)

##################################################################################  manage super admin get
@application.route('/api/getmanagesa',methods=['POST'])
def getmanagesa():
    try:
        collection = db['manage']
        dataDb = collection.find_one({})
        print(dataDb,"---------2011")
        data = {
            'embedScript':dataDb.get('embedScript'),
             'docSrch':dataDb.get('docSrch'),
              'model_temp':dataDb.get('model_temp'),
              'sssm':dataDb.get('sssm'),
        }
        return ['ok',data]
        
    except Exception as e:
        print(str(e),"---------1001")    
        return str(e)

##################################################################################  manage super admin edit
@application.route('/api/editmanagesa',methods=['POST'])
def editmanagesa():
    try:
        collection = db['manage']
        embedScript = request.get_json()['embedScript']
        model_temp = request.get_json()['rangeV']
        docSrch = request.get_json()['rangeVN']
        sssm = request.get_json()['ss']
        print(collection,"-------2028-----",embedScript)
        data ={
            'embedScript':embedScript,
            'model_temp':model_temp,
            'docSrch':docSrch,
            'sssm':sssm

        }

        document_count = collection.count_documents({})

        if document_count == 1:
            result = collection.update_one({}, {"$set": data})
        else:    
            result = collection.insert_one(data)
        # result = collection.update_one({}, {"$set": {'data':"SSSS"}})
    
        return "success"
        
    except Exception as e:
        print(str(e),"---------1001")    
        return str(e)        

############################################################   admin set chatot home page
@application.route('/api/admin/addBot',methods=['POST'])
def adminaddbot():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        bot =  request.get_json()['credMatch']   
        print("====2481===",bot)
        manage_i = db['manage']
        manage_i.update_one({},{"$set":{'chatbot':str(bot)}})
        return "ok"
    except Exception as e:
        return str(e)     

############################################################   admin get chatot home page
@application.route('/api/admin/gethomepagebot',methods=['POST'])
def admingethomepagebot():
    try:
        username =  request.get_json()['decoded']
        admin =  request.get_json()['adminToken']
        adminData = db['admin_data']
        chkAdmin = adminData.find_one({'admin':username})
        if chkAdmin == None or admin == None:
            return "You Are Not Authorized"
        botData_i = db['manage'].find_one({})
        botData = botData_i['chatbot']
        print(botData_i,"=====2501=====",botData)

        botname_db = db['users_website_crawl_data']
        botname_i = botname_db.find_one({'_id':ObjectId(botData)})
        if botname_i == None:
            botname = "None"
        else:    
            botname = botname_i['botname']
        print("--2506=======",botname)
        return [str(botData),botname]    
    except Exception as e:
        print("---------2503-------",str(e))
        return ["Error",str(e)]     

############################################################    get chatot home page
@application.route('/api/gethomepagebot',methods=['POST'])
def gethomepagebot():
    try:
        botData_i = db['manage'].find_one({})
        botData = botData_i['chatbot']
        print(botData_i,"=====2501=====",botData)
        return str(botData)    
    except Exception as e:
        print("---------2503-------",str(e))
        return ["Error",str(e)]     



# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == '__main__':
    socketio.run(application, debug=True, use_reloader=False)
   
