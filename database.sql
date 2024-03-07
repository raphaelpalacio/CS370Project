CREATE TABLE User (
  uID INT PRIMARY KEY,
  username VARCHAR(40),
  email VARCHAR(50),
  password CHAR(82),
  updated_at DATETIME,
  role INT,
);

CREATE TABLE Session (
  sID INT PRIMARY KEY,
  uID INT FOREIGN KEY REFERENCES User(uID),
  start_time DATETIME,
  end_time DATETIME,
  duration INT,
  status INT,
  created_at DATETIME,
);

CREATE TABLE Playlist (
  pID INT PRIMARY KEY,
  uID INT FOREIGN KEY REFERENCES User(uID),
  playlist_name VARCHAR(50),
  created_at DATETIME,
);

CREATE TABLE StudyGroup (
  sgID INT PRIMARY KEY,
  creatorID INT FOREIGN KEY REFERENCES USER(uID), 
  group_name VARCHAR(50),
  created_at DATETIME,
  updated_at DATETIME,
  duration INT,
);

CREATE TABLE Channel (
  cID INT PRIMARY KEY,
  creatorID INT FOREIGN KEY REFERENCES USER(uID), 
  channel_name VARCHAR(50),
  created_at DATETIME,
  updated_at DATETIME,
);

CREATE TABLE Message (
  mID INT PRIMARY KEY,
  senderID INT FOREIGN KEY REFERENCES USER(uID), 
  text VARCHAR(500),
  sent_at DATETIME,
  edited_at DATETIME,
);

--Many-To-Many User and Study Group relationship
CREATE TABLE StudyGroupMember (
    PRIMARY KEY (mID, sgID),
    FOREIGN KEY (mID) REFERENCES User(uID),
    FOREIGN KEY (sgID) REFERENCES StudyGroup(sgID)
);

--Many-To-Many Study Group and Text Channel relationship
CREATE TABLE StudyGroupChannel (
    PRIMARY KEY (sgID, cID),
    FOREIGN KEY (sgID) REFERENCES StudyGroup(sgID),
    FOREIGN KEY (cID) REFERENCES Channel(cID)
);

--Many-To-Many Text Channel and Message relationship
CREATE TABLE StudyGroupChannel (
    PRIMARY KEY (cID, mID),
    FOREIGN KEY (cID) REFERENCES Channel(cID),
    FOREIGN KEY (mID) REFERENCES Message(mID)
);

CREATE TABLE BlockedWebsites (
  wID INT PRIMARY KEY,
  uID INT FOREIGN KEY REFERENCES USER(uID), 
  base_url VARCHAR(500),
  is_blocked boolean,
  created_at DATETIME,
  updated_at DATETIME,
)