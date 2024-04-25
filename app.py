from flask import Flask, jsonify, request, abort, session, redirect
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from flask import g

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
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:W3ddings@localhost/pomodoroplus-db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'



# Initialize DB
db = SQLAlchemy(app)

# Auth0 Configuration
AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN')
API_AUDIENCE = os.getenv('API_AUDIENCE')
ALGORITHMS = ['RS256']

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

# def current_user():
#     # Attempt to retrieve user ID from session first
#     user_id = session.get('user_id')
    
#     # If not found in session, decode the JWT token to get the user ID
#     if not user_id:
#         token = get_token_auth_header()
#         if not token:
#             abort(401, description="No authorization token found")
#         try:
#             payload, _ = verify_decode_jwt(token)
#             user_id = payload.get('sub')  # 'sub' is typically the user ID in JWT
#         except Exception as e:
#             print(str(e))  # For debugging purposes
#             abort(401, description="Could not verify the user token")
    
#     return user_id

# def is_token_blacklisted(token):
#     return token in blacklisted_tokens
#     # You would need to create a storage mechanism for the blacklisted tokens
# blacklisted_tokens = set()

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            token = get_token_auth_header()
            payload = verify_decode_jwt(token)
            g.current_user = payload.get('sub')  # 'sub' is typically the user ID in JWT
        except Exception as e:
            print(str(e))  # For debugging purposes
            abort(401, description="Authentication failed: " + str(e))
        return f(*args, **kwargs)
    return decorated

# Models

class User(db.Model):
    __tablename__ = 'user'
    uID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=True)
    email = db.Column(db.String(254), unique=True, nullable=False)  # 254 character limit
    updated_at = db.Column(db.DateTime, nullable=True)
    role = db.Column(db.Integer, nullable=False)
    # Many-to-Many Relationship with StudyGroup
    study_groups = db.relationship('StudyGroup', secondary='StudyGroupMember',
                                   back_populates='members')


class ToDo(db.Model):
    __tablename__ = 'todo'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    is_complete = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)

    def __repr__(self):
        return '<ToDo %r>' % self.title
class Session(db.Model):
    __tablename__ = 'session'
    sID = db.Column(db.Integer, primary_key=True)
    uID = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)
    duration = db.Column(db.Integer, nullable=True)
    status = db.Column(db.Integer, nullable=False)
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
    # Many-to-Many Relationship with StudyGroup
    study_groups = db.relationship('StudyGroup', secondary='StudyGroupChannel',
                                   back_populates='channels')
    # Many-to-Many Relationship with Message
    messages = db.relationship('Message', secondary='ChannelMessage',
                               back_populates='channels')

class Message(db.Model):
    __tablename__ = 'message'
    mID = db.Column(db.Integer, primary_key=True)
    senderID = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
    edited_at = db.Column(db.DateTime, nullable=True)
    # Many-to-Many Relationship with Channel
    channels = db.relationship('Channel', secondary='ChannelMessage',
                               back_populates='messages')

# Many to Many Relationship Models
class StudyGroup(db.Model):
    __tablename__ = 'study_group'
    sgID = db.Column(db.Integer, primary_key=True)
    creatorID = db.Column(db.Integer, db.ForeignKey('user.uID'), nullable=False)
    group_name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)
    duration = db.Column(db.Integer)
     # Many-to-Many Relationships
    members = db.relationship('User', secondary='StudyGroupMember',
                              back_populates='study_groups')
    channels = db.relationship('Channel', secondary='StudyGroupChannel',
                               back_populates='study_groups')

# Association Tables
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

@app.route('/')
def index():
    """Endpoint for home - returns a welcome message."""
    return jsonify({'message': "Welcome to the Pomodoro API!"}), 200

# Protected todos get route
@app.route('/todos', methods=['GET'])
@cross_origin(origin='http://localhost:3000')
@requires_auth
def get_todos():
    user_sub = g.current_user
    user = User.query.filter_by(sub=user_sub).first()

    if not user:
        return jsonify({'message': 'User not found.'}), 404

    todos = ToDo.query.filter_by(user_id=user.uID).all()
    return jsonify([
        {
            'id': todo.id,
            'title': todo.title,
            'description': todo.description,
            'is_complete': todo.is_complete
        } for todo in todos
    ]), 200

# Protected add todo post route
@app.route('/add-todo', methods=['POST'])
@cross_origin(origin='http://localhost:3000')
@requires_auth
def add_todo():
    data = request.json
    new_todo = ToDo(title=data['title'], description=data['description'], user_id=g.current_user)
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'message': 'ToDo created successfully.'}), 201

# Protected update todo put route
@app.route('/todos/<int:todo_id>', methods=['PUT'])
@requires_auth
def update_todo(todo_id):
    todo = ToDo.query.get_or_404(todo_id)
    data = request.json
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    todo.is_complete = data.get('is_complete', todo.is_complete)
    db.session.commit()
    return jsonify({'message': 'ToDo updated successfully.'}), 200

# Protected toggle todo put route
@app.route('/todos/<int:todo_id>/toggle-complete', methods=['PUT'])
@cross_origin(origin='http://localhost:3000')
@requires_auth
def toggle_complete(todo_id):
    todo = ToDo.query.get_or_404(todo_id)
    todo.is_complete = not todo.is_complete
    db.session.commit()
    return jsonify({'message': 'ToDo completion status toggled.'}), 200

# Protected delete todo delete route
@app.route('/todos/<int:todo_id>', methods=['DELETE'])
@cross_origin(origin='http://localhost:3000')
@requires_auth
def delete_todo(todo_id):
    todo = ToDo.query.get_or_404(todo_id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'message': 'ToDo deleted successfully.'}), 200

# Protected get sessions route
@app.route('/sessions/start', methods=['POST'])
@cross_origin(origin='http://localhost:3000')
@requires_auth
def start_session():
    data = request.json
    new_session = Session(uID=g.current_user, start_time=datetime.utcnow(), duration=data['duration'], status=1)
    db.session.add(new_session)
    db.session.commit()
    return jsonify({'message': 'Session started successfully.', 'session_id': new_session.sID}), 201

# Protected stop sessions routes
@app.route('/sessions/stop', methods=['POST'])
@cross_origin(origin='http://localhost:3000')
@requires_auth
def stop_session():
    data = request.json
    session_id = data.get('session_id')
    session = Session.query.filter_by(sID=session_id, uID=g.current_user).first() # Verify user owns the session
    if session:
        session.end_time = datetime.utcnow()
        session.status = 0  # Assuming 0 means stopped
        db.session.commit()
        return jsonify({'message': 'Session stopped successfully.'}), 200
    else:
        return jsonify({'message': 'Session not found or you do not have permission.'}), 404

# Protected get sessions route
@app.route('/sessions/history', methods=['GET'])
@cross_origin(origin='http://localhost:3000')
@requires_auth
def session_history():
    sessions = Session.query.filter_by(uID=g.current_user).all() # Fetch sessions for current user
    sessions_data = [
        {
            'session_id': session.sID,
            'start_time': session.start_time.isoformat(),
            'end_time': session.end_time.isoformat() if session.end_time else None,
            'duration': session.duration,
            'status': session.status
        }
        for session in sessions
    ]
    return jsonify(sessions_data), 200

# register user
@app.route('/users/register', methods=['POST'])
def register_user():
    data = request.json
    new_user = User(username=data['username'], email=data['email'], password=bcrypt.generate_password_hash(data['password']).decode('utf-8'), updated_at=datetime.now(), role=1)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully.', 'uID': new_user.uID}), 201

# login user
@app.route('/users/login', methods=['POST'])
def login_user():
    # This endpoint would typically return a token after verifying user credentials.
    return jsonify({"message": "This route should verify user credentials and return a token."}), 200


@app.route('/users/logout', methods=['POST'])
@requires_auth
def logout_user():
    # This would typically instruct the client to delete the stored token.
    return jsonify({"message": "This route should instruct the client to delete the token."}), 200

# Protected get users route
@app.route('/users/profile', methods=['GET'])
@requires_auth
def user_profile():
    user = User.query.filter_by(uID=g.current_user).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_profile = {
        "username": user.username,
        "email": user.email,
        "role": user.role
    }
    return jsonify(user_profile), 200

# Protected get users route
@app.route('/users/profile/update', methods=['PATCH'])
@requires_auth
def update_profile():
    user = User.query.filter_by(uID=g.current_user).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.json
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'role' in data:
        user.role = data['role']
    if 'password' in data:
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    db.session.commit()
    return jsonify({"message": "User profile updated successfully"}), 200

# Protected delete user route
@app.route('/users/delete', methods=['DELETE'])
@requires_auth
def delete_user():
    user = User.query.filter_by(uID=g.current_user).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User account deleted successfully."}), 200


if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all()
    #     migrate = Migrate(app, db)
    #Base.metadata.create_all(bind=db.engine)  # Ensures tables are created before the first request if they don't exist
    # app.run(debug=True)
    app.run()


