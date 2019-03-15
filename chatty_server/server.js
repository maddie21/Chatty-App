// server.js
const uuidv4 = require('uuid/v4');
const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  const totalActiveUsers = wss.clients.size;
  const activeUsersBroadcast = {
    type: 'activeUsers',
    content: totalActiveUsers
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(activeUsersBroadcast));
    }
  });

  ws.on('close', () => {
    const totalActiveUsers = wss.clients.size;
    const activeUsersBroadcast = {
      type: 'activeUsers',
      content: totalActiveUsers
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(activeUsersBroadcast));
      }
    });
  });

  ws.on('message', function incoming(message) {
    const { type, username, content } = JSON.parse(message);
    let broadcastMessage = {};
    if(type === 'newMessage') {
      const messageId = uuidv4();
      broadcastMessage = {
        id: messageId,
        type: "message",
        username: username, 
        content: content
      }
    } else if(type === 'newNotification') {
      const messageId = uuidv4();
      broadcastMessage = {
        id: messageId,
        type: "notification",
        content: content
      }
    }
    
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(broadcastMessage));
        }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
