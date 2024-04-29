from flask import Flask, jsonify, request, abort, session, redirect
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base

from datetime import datetime

from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from datetime import datetime
from jose import jwt
import json
from urllib.request import urlopen
from dotenv import load_dotenv
import uuid
import sqlite3
import os

# Initialize Flask App
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
bcrypt = Bcrypt(app)

# Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pomodoro.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://pomodoroCS370:pomodoroAdmin370!@pomodoroplus.c9eokc6gmtps.us-east-1.rds.amazonaws.com:5432/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



# Initialize DB
db = SQLAlchemy(app)

# Initialize Migrate
migrate = Migrate(app, db)

# Load environment variables
load_dotenv()

# Auth0 Configuration
AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN')
API_AUDIENCE = os.getenv('API_AUDIENCE')
ALGORITHMS = ['RS256']


# # Make all of the tables straight to SQL to PGAdmin
# Base = declarative_base()

# Association table for Users and Study Groups
StudyGroupMember = db.Table('StudyGroupMember',
    db.Column('uID', db.Integer, db.ForeignKey('user.uID'), primary_key=True),
    db.Column('sgID', db.Integer, db.ForeignKey('study_group.sgID'), primary_key=True)
)

# Association table for Study Groups and Channels
StudyGroupChannel = db.Table('StudyGroupChannel',
    db.Column('sgID', db.Integer, db.ForeignKey('study_group.sgID'), primary_key=True),
    db.Column('cID', db.Integer, db.ForeignKey('channel.cID'), primary_key=True)
)

# Association table for Channels and Messages
ChannelMessage = db.Table('ChannelMessage',
    db.Column('cID', db.Integer, db.ForeignKey('channel.cID'), primary_key=True),
    db.Column('mID', db.Integer, db.ForeignKey('message.mID'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'
    uID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(254), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=True)
    role = db.Column(db.Integer, nullable=False)
    study_groups = db.relationship('StudyGroup', secondary=StudyGroupMember, back_populates='members')

class ToDo(db.Model):
    __tablename__ = 'todo'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    is_complete = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)

class Session(db.Model):
    __tablename__ = 'session'
    sID = db.Column(db.Integer, primary_key=True)
    uID = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)
    duration = db.Column(db.Integer, nullable=True)
    status = db.Column(db.Integer, nullable=False)
    sessions_studied = db.Column(db.Integer, default=0)  # New column to track completed sessions
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Playlist(db.Model):
    __tablename__ = 'playlist'
    pID = db.Column(db.Integer, primary_key=True)
    uID = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)
    playlist_name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Channel(db.Model):
    __tablename__ = 'channel'
    cID = db.Column(db.Integer, primary_key=True)
    creatorID = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)
    channel_name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=True)
    study_groups = db.relationship('StudyGroup', secondary=StudyGroupChannel, back_populates='channels')
    messages = db.relationship('Message', secondary=ChannelMessage, back_populates='channels')

class Message(db.Model):
    __tablename__ = 'message'
    mID = db.Column(db.Integer, primary_key=True)
    senderID = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
    edited_at = db.Column(db.DateTime, nullable=True)
    channels = db.relationship('Channel', secondary=ChannelMessage, back_populates='messages')

class StudyGroup(db.Model):
    __tablename__ = 'study_group'
    sgID = db.Column(db.Integer, primary_key=True)
    creatorID = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)
    group_name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)
    members = db.relationship('User', secondary=StudyGroupMember, back_populates='study_groups')
    channels = db.relationship('Channel', secondary=StudyGroupChannel, back_populates='study_groups')

# # Setup the database connection and engine
# engine = create_engine('postgresql://postgres:W3ddings@localhost/pomodoroplus-db')
# Base.metadata.create_all(bind=engine)

# Helper Functions
def get_token_auth_header():
    auth = request.headers.get("Authorization", None)
    if not auth:
        abort(401, description="Authorization header is missing")
    parts = auth.split()
    if parts[0].lower() != "bearer":
        abort(401, description="Authorization header must start with Bearer")
    elif len(parts) == 1:
        abort(401, description="Token not found")
    elif len(parts) > 2:
        abort(401, description="Authorization header must be Bearer token")
    token = parts[1]
    return token

def verify_decode_jwt(token):
    jsonurl = urlopen(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json")
    jwks = json.loads(jsonurl.read())
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer=f"https://{AUTH0_DOMAIN}/"
            )
            return payload
        except jwt.ExpiredSignatureError:
            abort(401, description="Token expired.")
        except jwt.JWTClaimsError:
            abort(401, description="Incorrect claims. Please, check the audience and issuer.")
        except Exception:
            abort(401, description="Unable to parse authentication token.")
    abort(401, description="Unable to find appropriate key.")

def current_user():
    # Attempt to retrieve user ID from session first
    user_id = session.get('user_id')
    
    # If not found in session, decode the JWT token to get the user ID
    if not user_id:
        token = get_token_auth_header()
        if not token:
            abort(401, description="No authorization token found")
        try:
            payload, _ = verify_decode_jwt(token)
            user_id = payload.get('sub')  # 'sub' is typically the user ID in JWT
        except Exception as e:
            print(str(e))  # For debugging purposes
            abort(401, description="Could not verify the user token")
    
    return user_id

def is_token_blacklisted(token):
    return token in blacklisted_tokens
    # You would need to create a storage mechanism for the blacklisted tokens
blacklisted_tokens = set()

# Routes
@app.route('/')
def index():
    return "Welcome to the Pomodoro API!"

@app.route('/todos', methods=['GET'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def get_todos():
    user_sub = current_user()  # This is the unique identifier for the user.
    user = User.query.filter_by(sub=user_sub).first()  # Find the user in the database.

    if not user:
        return jsonify({'message': 'User not found.'}), 404

    todos = ToDo.query.filter_by(user_id=user.uID).all()
    return jsonify([{'id': todo.id, 'title': todo.title, 'description': todo.description, 'is_complete': todo.is_complete} for todo in todos])


@app.route('/todos', methods=['POST'])
def add_todo():
    user_id = current_user()
    data = request.json
    new_todo = ToDo(title=data['title'], description=data['description'], user_id=user_id)
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'message': 'ToDo created successfully.'}), 201

@app.route('/addTodo', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def add_todos():
    data = request.json
    print(data)
    return jsonify('todo added')
    

@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todo = ToDo.query.get_or_404(todo_id)
    data = request.json
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    todo.is_complete = data.get('is_complete', todo.is_complete)
    db.session.commit()
    return jsonify({'message': 'ToDo updated successfully.'})

@app.route('/todosDelete', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def delete_todo():
    data = request.json
    print(data)
    return jsonify('todo deleted')

@app.route('/sessions/start', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def start_session():
    data = request.json
    new_session = Session(uID=data['uID'], start_time=datetime.utcnow(), duration=data['duration'], status=1)
    db.session.add(new_session)
    db.session.commit()
    return jsonify({'message': 'Session started successfully.', 'session_id': new_session.sID}), 201

@app.route('/session/counter', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def count_sessions():
    data = request.json
    print(data)
    return jsonify('session started')

    # session_id = request.json.get('session_id')
    #     session = Session.query.filter_by(sID=session_id).first()
        
    #     if session:
    #         if session.status == 1:  # Check if the session is currently active
    #             session.status = 0   # Mark the session as completed
    #             session.end_time = datetime.utcnow()  # Set the end time to now
    #             session.sessions_studied += 1  # Increment the completed sessions count
    #             db.session.commit()
    #             return jsonify({'message': 'Session completed successfully.'}), 200
    #         else:
    #             return jsonify({'message': 'Session is already completed.'}), 400
    #     else:
    #         return jsonify({'message': 'Session not found.'}), 404





@app.route('/sessions/stop', methods=['POST'])
def stop_session():
    session_id = request.json.get('session_id')
    session = Session.query.filter_by(sID=session_id).first()
    if session:
        session.end_time = datetime.utcnow()
        session.status = 0  # Assuming 0 means stopped
        db.session.commit()
        return jsonify({'message': 'Session stopped successfully.'}), 200
    else:
        return jsonify({'message': 'Session not found.'}), 404

@app.route('/sessions/history', methods=['GET'])
def session_history():
    sessions = Session.query.all()
    sessions_data = [{'session_id': session.sID, 'start_time': session.start_time.isoformat(), 'end_time': session.end_time.isoformat() if session.end_time else None, 'duration': session.duration, 'status': session.status} for session in sessions]
    return jsonify(sessions_data), 200

# @app.route('/session/counter', methods=['POST'])
# def create_session_counter():
#     data = request.json
#     new_counter = session_count(uID=data['uID'], session_count=data['session_count'])
#     db.session.add(new_counter)
#     db.session.commit()
#     return jsonify({'message': 'Session counter created successfully.', 'counter_id': new_counter.scID}), 201


# @app.route('/session/count', methods=['GET'])
# def session_count():
#     session_count = session_count.query.all()
#     session_count_data = [{'counter_id': counter.scID, 'session_count': counter.session_count} for counter in session_count]
#     return jsonify(session_count_data), 200

@app.route('/users/register', methods=['POST'])
def register_user():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password, updated_at=datetime.now(), role=1)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully.', 'uID': new_user.uID}), 201


@app.route('/users/login', methods=['POST'])
def login_user():
    token = get_token_auth_header()
    try:
        payload = verify_decode_jwt(token)
        return jsonify({"success": True, "message": "User authenticated", "user": payload["sub"]}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 401
    

@app.route('/users/logout', methods=['POST'])
def logout_user():
    token = get_token_auth_header()
    # Add the token to the blacklist
    blacklisted_tokens.add(token)

    return jsonify({"success": True, "message": "User logged out successfully."}), 200


@app.route('/users/profile', methods=['GET'])
def user_profile():
    # Authenticate with token
    token = get_token_auth_header()
    if not token:
        return jsonify({"error": "Authorization token is missing"}), 401

    payload = verify_decode_jwt(token)
    if not payload:
        return jsonify({"error": "Invalid token"}), 401

    # Search for profile using info in the token
    user_id = payload.get("sub")  # Assuming the user's unique identifier is in the 'sub' claim
    user = User.query.filter_by(uID=user_id).first()  # Query the User table for the user ID
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_profile = {
        "username": user.username,
        "email": user.email,
        "role": user.role
    }

    # return username, email, and role
    return jsonify({
        "username": user_profile["username"],
        "email": user_profile["email"],
        "role": user_profile["role"]
    }), 200

@app.route('/users/profile/update', methods=['PATCH'])
def update_profile():
    # Authenticate with token
    token = get_token_auth_header()
    if not token:
        return jsonify({"error": "Authorization token is missing"}), 401

    payload = verify_decode_jwt(token)
    if not payload:
        return jsonify({"error": "Invalid token"}), 401
    
    user_id = payload.get("sub")
    user = User.query.filter_by(uID=user_id).first()  # Query the User table for the user ID
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.json
    if not data:
        return jsonify({"error": "Request body is missing or not JSON"}), 400, 400

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'role' in data:
        user.role = data['role']
    # password too?

    db.session.commit()
    
    updated_profile = {
        "username": user.username,
        "email": user.email,
        "role": user.role
    }

    # Return success response
    return jsonify({"message": "User profile updated successfully"}), 200

@app.route('/users/delete', methods=['DELETE'])
def delete_user():
    token = get_token_auth_header()
    if not token:
        return jsonify({"error": "Authorization token is missing"}), 401

    payload = verify_decode_jwt(token)
    if not payload:
        return jsonify({"error": "Invalid token"}), 401

    user_id_to_delete = payload.get("sub")
    
    user_to_delete = User.query.filter_by(uID=user_id_to_delete).first()

    if not user_to_delete:
        return jsonify({"error": "User not found"}), 404

    # Delete the user record from the database
    db.session.delete(user_to_delete)
    db.session.commit()

    # Return success response
    return jsonify({"message": "User deleted successfully"}), 200

@app.route('/auth/callback')
def auth0_callback():
    code = request.args.get('code')
    if not code:
        return "Error: No code returned from Auth0.", 400

    token_url = f'https://{AUTH0_DOMAIN}/oauth/token'
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    payload = {
        'grant_type': 'authorization_code',
        'client_id': AUTH0_CLIENT_ID,
        'client_secret': os.getenv('AUTH0_CLIENT_SECRET'),
        'code': code,
        'redirect_uri': os.getenv('AUTH0_CALLBACK_URL')
    }

    response = request.post(token_url, data=payload, headers=headers)
    tokens = response.json()
    id_token = tokens.get('id_token')

    # Optionally, verify the token, extract user information
    user_info = verify_decode_jwt(id_token)

    """
    Here, you would typically check if the user exists in your database,
    create a new user if necessary, and establish a session or token for your app.
    """
    # Decode the token to get user info
    user_info = verify_decode_jwt(id_token)
    if not user_info:
        return "Error: Unable to verify user information.", 400

    # Extract email or other unique identifier from user_info
    email = user_info.get('email')
    if not email:
        return "Error: Email not provided by Auth0.", 400

    # Check if user exists in your database
    user = User.query.filter_by(email=email).first()
    if not user:
        # Create a new user if it does not exist
        user = User(
            username=user_info.get('nickname', email.split('@')[0]),  # Example username
            email=email,
            password='',  # You might not store a password since authentication is handled by Auth0
            updated_at=datetime.utcnow(),
            role=1  # Example role, adjust as necessary
        )
        db.session.add(user)
        db.session.commit()
    else:
        # Update existing user's last login or other relevant fields
        user.updated_at = datetime.utcnow()
        db.session.commit()
    # Redirect to home screen or dashboard after successful authentication
    return redirect('/homePage')

# Make sure to set a secret key for sessions to work
app.secret_key = 'your_secret_key'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        migrate = Migrate(app, db)
    #Base.metadata.create_all(bind=db.engine)  # Ensures tables are created before the first request if they don't exist
    app.run(debug=True)