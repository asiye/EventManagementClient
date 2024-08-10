const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const signalR = require('@microsoft/signalr');
const config = require('../config/config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const connection = new signalR.HubConnectionBuilder()
    .withUrl(config.signalRUrl, {
        transport: signalR.HttpTransportType.ServerSentEvents
      })
    .build();

connection.on(config.methodName, function (message) {
    console.log("Real-time update received: " + message);
    io.emit(config.methodName, message);
});

connection.start().catch(e => console.error('SignalR connection error:', e));

app.get('/', (req, res) => {
    res.send('Event Management Real-Time Server');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(config.port, () => {
    console.log(`listening on *: ${config.port}`);
});
