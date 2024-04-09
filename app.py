from flask import Flask, jsonify, request, abort, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from datetime import datetime
from jose import jwt
import json
from urllib.request import urlopen
import uuid
import sqlite3
import os

# Initialize Flask App
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pomodoro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db = SQLAlchemy(app)

# Load environment variables
load_dotenv()

# Auth0 Configuration
AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN')
API_AUDIENCE = os.getenv('API_AUDIENCE')
ALGORITHMS = ['RS256']


# Spotify configuration
SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
SPOTIFY_REDIRECT_URI = 'http://localhost:5000/callback'  # Make sure to add this in your Spotify app settings
SPOTIFY_SCOPES = 'user-read-playback-state user-modify-playback-state'  # Example scopes


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

def is_token_blacklisted(token):
    return token in blacklisted_tokens
    # You would need to create a storage mechanism for the blacklisted tokens
blacklisted_tokens = set()

# Models
class User(db.Model):
    __tablename__ = 'user'
    uID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(254), unique=True, nullable=False)  # 254 character limit
    password = db.Column(db.String(60), nullable=False)  # Bcrypt hashes are 60 chars
    updated_at = db.Column(db.DateTime, nullable=True)
    role = db.Column(db.Integer, nullable=False)
    # Many-to-Many Relationship with StudyGroup
    study_groups = db.relationship('StudyGroup', secondary='StudyGroupMember',
                                   back_populates='members')
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
    return "Welcome to the Pomodoro API!"

@app.route('/sessions/start', methods=['POST'])
def start_session():
    data = request.json
    new_session = Session(uID=data['uID'], start_time=datetime.utcnow(), duration=data['duration'], status=1)
    db.session.add(new_session)
    db.session.commit()
    return jsonify({'message': 'Session started successfully.', 'session_id': new_session.sID}), 201

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


@app.route('/login/spotify')
def login_spotify():
    auth_url = f"https://accounts.spotify.com/authorize?client_id={SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri={SPOTIFY_REDIRECT_URI}&scope={SPOTIFY_SCOPES}"
    return redirect(auth_url)

@app.route('/callback')
def spotify_callback():
    code = request.args.get('code')
    auth_token_url = 'https://accounts.spotify.com/api/token'
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET
    }
    post_request = requests.post(auth_token_url, data=data)
    response_data = post_request.json()
    access_token = response_data.get('access_token')
    refresh_token = response_data.get('refresh_token')

    # Here, you would store the access and refresh tokens in your database associated with the user
    # For demonstration, storing it in session
    session['access_token'] = access_token
    session['refresh_token'] = refresh_token

    # Redirect to a page where you want the user to go next
    return redirect('/homePage')

# Make sure to set a secret key for sessions to work
app.secret_key = 'your_secret_key'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensures tables are created before the first request if they don't exist
    app.run(debug=True)