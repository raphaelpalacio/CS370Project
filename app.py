from flask import Flask, jsonify, request
import json
from datetime import datetime, time, timedelta
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#app.config['']   add database URI
#db = SQLAlchemy(app) 



# REQUEST : Start a new pomodoro timer -> store the data
# RESPONSE: The timer widget counts down the duration(int)
@app.route('/sesions/start', methods=['POST'])
def start_session():

    # timer = 
    data = request.json.get('data')
    duration = data['duration']
    start_time = data['start_time']
    # end_time ... etc. 
    

    # db. session.add(timer)
    # db. session.commit

   
    # return   


@app.route('/sessions/stop', methods=['POST'])
def stop_session():
    return
@app.route('/sessions/history')
def session_history():
    return