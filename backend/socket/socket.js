import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();  // Creates an Express app instance (app).

const server = http.createServer(app);
// http.createServer(app) function creates an HTTP server using the Express app.
// This allows the same server to handle both HTTP requests and WebSocket connection
const io = new Server(server, {
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET', 'POST'],
    },
});
// Creates a new Socket.IO server instance and binds it to the server.

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}
// Given a receiverId, this function returns the corresponding socketId.
// This allows us to send private messages to a specific user.

const userSocketMap = {}; // {userId->socketId}
// This object stores mappings of user IDs to socket IDs.
// Whenever a user connects, their userId is stored as a key, and their Socket.IO connection ID (socket.id) is stored as the value.
// This helps in sending private messages by looking up the socket ID of a user.


io.on('connection', (socket)=>{
    console.log("socket connected");
    // Listens for a new WebSocket connection.
// When a client connects, a socket object is created for that connection.
// Each socket represents a unique WebSocket connection.

    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 
//     Extracts userId from the connection query parameters.
// This is sent by the client when establishing a connection.
// Checks if userId exists in the connection request.
// If valid, stores the socket.id in userSocketMap against the user's ID.
// This allows us to identify the socket for each connected user.

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

//     Object.keys(userSocketMap) →
// Retrieves an array of all online users' IDs.

// io.emit("getOnlineUsers", ...) →
// Sends the updated list of online users to all connected clients.

// Why?
// So the frontend knows who is online and updates the UI accordingly.

    socket.on('disconnect', ()=>{
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })

//     After removing the user, we emit the updated online users list.
// This ensures that all connected clients see the updated online user list.

})

export {app, io, server};
