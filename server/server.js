import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// Step 1: Initialize Express and HTTP Server
const app = express();
const server = createServer(app);

// Step 2: Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"]
  },
});

// Step 3: Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for incoming messages from the client
  socket.on("send_message", (message) => {
    console.log(`Message from ${socket.id}: ${message}`);

    // Broadcast the message to all clients, including the sender
    socket.broadcast.emit("receive_message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Step 4: Start the server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
