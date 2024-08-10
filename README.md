# My EventClient Project

A simple EventClient project using Express.

## Configuration

### Create a .env file in the root directory with the following content:

PORT=3000

SIGNALR_URL=http://localhost:5150/eventHub

METHOD_NAME=ReceiveUpdate

## Installation

Run `npm install` to install dependencies.

## Usage

Run `npm start` to start the server.

Run `npm run dev` for development with auto-reload.

## Common Issues

- **SignalR Connection Issues**: Ensure the SignalR server is running and accessible from the Node.js client. Verify CORS settings and transport configuration.
- **Database Connection Issues**: Check your connection strings and ensure the database server is reachable.
- **Port Conflicts**: Ensure that the ports used by Node.js and .NET Core are not conflicting with other services.
