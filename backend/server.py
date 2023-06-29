import time
from flask import Blueprint
import ast
import tiktoken
from bson import ObjectId
from auth import auth
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

load_dotenv(find_dotenv())
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

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

app = Flask(__name__)
CORS(app) 

app.register_blueprint(auth, url_prefix="/auth")

Gsummary = None

def start_ai(query,userData):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['chatbot']
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(userData)
    dataDb = users_collection.find_one({'_id':objId})
    
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
            global Gsummary
            Gsummary = summaries
            # print("/////////",Gsummary,"////////") 
            return Gsummary
        # print(summaries) 
    summaries = summarize(data,query) 

@app.route('/api/msg',methods=['POST'])
def user_msg():
    global query
    data = request.get_json()['inputValue']
    userData = request.get_json()['botID']['botID']
    # print("user msg ////////////////////////",userData)
    # remove return new addition
    start_ai(data,userData)
    # print("X ==",Gsummary)
    return Gsummary

urll = None

@app.route('/api/sendLinkData',methods=['POST'])
def get_link_data():
    # print("INSide get the link data")
    global urll
    urll = [request.get_json()['sendLink']]
    userData = request.get_json()['decoded']['username']
    botName =  request.get_json()['botName']
    exclude = request.get_json()['exclude']
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

    client = MongoClient('mongodb://localhost:27017/')
    db = client['chatbot']
    users_collection = db['users_website_crawl_data']
    user_data = {
        'crawldata': str(data),
        'email': userData,
        'botname':botName,
        'url':str(urls[0]),
        'prompt':" You are a world class analyst.You are having a conversation with the user about the  text and you have to answer the users questions. Please follow these rules: 1. Make it engaging and informative. 2. Should address the {query} very well. 3. Don't repeat your sentences and information 4. Always mention name of things or people you talk about. 5.Don't mention your name when answering, go straight to the answer   {text}  Human: {query} "             
    } 
    try:
       users_collection.insert_one(user_data)
    #    print("Data stored successfully!")
    except Exception as e:
       print("Error storing data:============", str(e),"===========================")
    # print("dat stored hopefully = ")

@app.route('/api/updatebot/<id>',methods=['GET'])
def getupdatebot(id):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['chatbot']
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(id)
    dataDb = users_collection.find_one({'_id':objId})
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
    client = MongoClient('mongodb://localhost:27017/')
    db = client['chatbot']
    users_collection = db['users_website_crawl_data']
    objId= ObjectId(id)
    # dataDb = users_collection.find_one({'_id':objId})
    data =  request.get_json()
    try:
         result = users_collection.update_one({'_id': ObjectId(id)}, {'$set': data})
    except Exception as e:
        return "Couldn't Update"     
    # print(data)
    return "Update Successful"    

@app.route('/api/mybots',methods=['GET','POST'])
def get_mybots():
    data =  request.get_json()['decoded']['username']
    # print("my bots ",data)

    client = MongoClient('mongodb://localhost:27017/')
    db = client['chatbot']
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



if __name__ == '__main__':
    app.run(debug=True)