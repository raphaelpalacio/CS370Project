# Welcome to Pomordoro+

# Link to Website
https://cs-370-project-x41n.vercel.app/

## Description

Welcome to Pomodoro+, a safe space where you can study using the versatile Pomodoro studying technique, join study groups, and install our chrome extension to block distracting websites on your computer to get the most out of your study session.

## How to Use

1. Login into our app using your own login creditions, Google, or Github.
2. After making an account, login and check out our Pomodoro page where you will find a timer, study sessions, and a to-do list
3. When you are ready, download the chrome extention, block the websites that distract, and begin your study session!

## Frontend Installation

To run a local copy of this project, follow the steps below depending on your operating system.

1. **Install Homebrew**  
   Open the Terminal and run the following command to install Homebrew (if it's not already installed):

   ```
   /bin/bash -c "$(curl -fsSL -o install.sh https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js**  
   After installing Homebrew, install Node.js using this command:

   ```
   brew install node
   ```

3. **Clone the repository**

   ```
   git clone https://github.com/raphaelpalacio/CS370Project.git
   ```
3a. **After cloning the repository download package.json and package-lock.json from this link. After you have downloaded them, please put it in the root folder of the repository**
https://drive.google.com/drive/folders/1v0PrW5etrfCxgw0iECQ4WVbgJ9lj7CT8?usp=drive_link


4. **Navigate to the directory and install dependencies**

   ```
   cd CS370Project
   npm install
   ```

5. **Start the development server**

   ```
   npm start
   ```

   Alternatively, if you are using React:

   ```
   npm install react-scripts
   npm run start
   ```

6. **View your local frontend**
   Open a browser and go to: [http://localhost:3000](http://localhost:3000)

## Frontend Technlogies

Our website is crafted using React, JavaScript, HTML, CSS, and Tailwind CSS. React helps us build dynamic and reusable UI components, while JavaScript enables interactive elements. HTML structures our content, CSS adds styling, and Tailwind CSS facilitates rapid, utility-first design. This combination ensures a responsive and visually appealing user experience across all devices

For more details and insights into the architecture, refer to the ./src sub-directory

## Architecture

<img src="https://github.com/raphaelpalacio/CS370Project/blob/main/doc/architecture.svg" >


## The Pomodoro API

### Overview
The Pomodoro API is a Flask-based RESTful API designed for managing tasks, sessions, and user interactions in a study-oriented application. The API includes user authentication via Auth0, session management, task tracking, and supports a CORS configuration to allow requests from a specific origin.

### Setup and Configuration
- **Flask App Initialization**: The API uses Flask for server setup and SQLAlchemy for ORM.
- **CORS**: Cross-Origin Resource Sharing is enabled for all routes, allowing access from `http://localhost:3000`.
- **Database Configuration**: Connects to a PostgreSQL database. SQLAlchemy is used to handle database operations.
- **Migration**: Flask-Migrate is used for handling database migrations. (This is alembic)
- **Authentication**: Utilizes Auth0 for handling user authentication with JWTs.
- **Requirements.txt**: All of the python dependencies are kept in `requriments.txt` and is up to date to the latest versions
- **Python Virtual Environment**: For ease of use, we have set up a virtual python environment with all of the dependencies installed properly
- **.env File**: To run the API properly you need to add these two variables within a `.env` file:
	```bash
	AUTH0_DOMAIN = 'dev-otrfj0d3n15cdjdz.us.auth0.com'
	API_AUDIENCE = 'https://dev-otrfj0d3n15cdjdz.us.auth0.com/api/v2/'
	```

### Environment Variables
- `AUTH0_DOMAIN` and `API_AUDIENCE` must be set in your environment variables for JWT verification.

### Models
1. **User**: Represents a user with fields like username, email, password, and associated roles.
2. **ToDo**: Tasks that users can create, update, or delete.
3. **Session**: Represents a study session with fields like start and end times, duration, and status.
4. **Playlist**: User-created playlists for managing study music or sounds.
5. **Channel**: Communication channels for users within study groups.
6. **Message**: Messages within channels.
7. **StudyGroup**: Groups for users to study together, linked to channels and users.

### Association Tables (Many to Many)
- **StudyGroupMember**: Links users to study groups.
- **StudyGroupChannel**: Links channels to study groups.
- **ChannelMessage**: Links messages to channels.

### Routes
1. **Base Route (`/`)**: Welcomes users to the API.
2. **Todo Management (`/todos`, `/todos/<int:todo_id>`)**: Endpoints for retrieving, adding, and updating todos.
3. **Session Management (`/sessions/start`, `/sessions/stop`, `/sessions/history`)**: Manage study sessions.
4. **User Management (`/users/register`, `/users/login`, `/users/logout`, `/users/profile`, `/users/delete`)**: User registration, login, logout, profile management, and deletion.

### Authentication and Authorization
- **Token Handling**: Includes functions to extract and verify JWT tokens, with error handling for expired or invalid tokens.
- **Cross-Origin Requests**: Handles cross-origin requests with proper headers.

### Helper Functions
- `get_token_auth_header()`: Extracts the authorization token from the header.
- `verify_decode_jwt()`: Verifies and decodes the JWT using the public keys fetched from Auth0.
- `current_user()`: Identifies the current user based on the session or JWT token.

### Security
- Passwords are hashed using Flask-Bcrypt.
- Sensitive routes require JWT authentication.

### Example Usage
- **Add a ToDo**:
```bash
curl -X POST http://localhost:5000/todos -H 'Content-Type: application/json' -d '{"title": "New Task", "description": "Complete the task"}'
```
  
- **Start a session:**
```bash
curl -X POST http://localhost:5000/sessions/start -H 'Content-Type: application/json' -d '{"uID": 1, "duration": 120}'
```

### Running the API in a Development Setting
- To run our API in a developer setting you would just need to type this command in the terminal
```bash
python3 app.py

or

flask run
```
