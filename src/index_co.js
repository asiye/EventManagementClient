const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const signalR = require('@microsoft/signalr');
const config = require('../config/config')

const app = express();
const server = http.createServer(app);  // Pass 'app' to 'http.createServer'
const io = socketIo(server);

const connection = new signalR.HubConnectionBuilder()
    .withUrl(config.signalRUrl)
    .build();

connection.on(config.methodName, function (message) {
    console.log("Real-time update received: " + message);

    // Optionally, emit the update to all connected Socket.IO clients
    io.emit(config.methodName, message);

     // Create a new span element
     const span = document.createElement('span');
     span.textContent = message;
     span.style.display = 'block';
     document.getElementById('events').appendChild(span);
});

connection.start().catch(e => console.error('SignalR connection error:', e));

app.get('/', (req, res) => {
    res.send('Event Management Real-Time Server');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Optionally, listen for events from clients
    socket.on('clientEvent', (data) => {
        console.log('Client sent data:', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(config.port, () => {
    console.log(`listening on *: ${config.port}`);
});
