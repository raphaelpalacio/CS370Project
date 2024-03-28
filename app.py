from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid
from jose import jwt
import json 
from urllib.request import urlopen
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pomodoro.db'  # SQLite database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
AUTH0_DOMAIN = 'dev-otrfj0d3n15cdjdz.us.auth0.com' # 
API_AUDIENCE = 'https://dev-otrfj0d3n15cdjdz.us.auth0.com/api/v2/' #
ALGORITHMS = ['RS256']

# 
def get_token_auth_header():
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise Exception("Authorization header is missing")

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise Exception("Authorization header must start with Bearer")
    elif len(parts) == 1:
        raise Exception("Token not found")
    elif len(parts) > 2:
        raise Exception("Authorization header must be Bearer token")

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
            raise Exception("Token expired.")
        except jwt.JWTClaimsError:
            raise Exception("Incorrect claims. Please, check the audience and issuer.")
        except Exception:
            raise Exception("Unable to parse authentication token.")

    raise Exception("Unable to find appropriate key.")

# Models
class User(db.Model):
    __tablename__ = 'user'
    uID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(82), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=True)
    role = db.Column(db.Integer, nullable=False)

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
    data = request.json # username, email, password, role
    new_user = User(uID = int(uuid.uuid4()), username=data['username'], email=data['email'], password=data['password'], updated_at = datetime.now(), role = 1)
    db.user.add(new_user)
    db.user.commit()
    return jsonify({'message': 'User created successfully.', 'uID': new_user.uID}), 201

@app.route('/users/login', mehtods=['POST'])
def login_user():
    token = get_token_auth_header()
    try:
        payload = verify_decode_jwt(token)
        return jsonify({"success": True, "message": "User authenticated", "user": payload["sub"]}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 401

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

    user_profile = users_db[user]

    # return username, email, and role
    return jsonify({
        "username": user_profile["username"],
        "email": user_profile["email"],
        "role": user_profile["role"]
    }), 200

@app.route('/users/profile/update', methods=['PATCH'])
def update_profile():

    
    return

@app.route('/users/delete', methods=['DELETE'])
def delete_user():

    return


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensures tables are created before the first request if they don't exist
    app.run(debug=True)
