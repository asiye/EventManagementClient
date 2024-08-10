require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  signalRUrl: process.env.SIGNALR_URL || 'http://localhost:5150/eventHub',
  methodName: process.env.METHOD_NAME || 'ReceiveUpdate'
};