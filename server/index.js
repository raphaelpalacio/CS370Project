const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client URL
    methods: ["GET", "POST"],
  },
});
const path = require("path");
const serveStatic = require("serve-static");

// Serve the React application's build folder
app.use(serveStatic(path.join(__dirname, "..", "build")));

// Catch-all route to serve the React application's index.html file
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newMessage", (data) => {
    console.log("New message:", data);
    io.emit("newMessage", data); // Broadcast the message to all connected clients
    // will have to change this functionality
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
