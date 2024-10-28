import { createServer } from 'http';
import { Redis } from 'ioredis';
import { WebSocket, WebSocketServer } from 'ws';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('HTTP server is running');
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});

// WebSocket Server
const wss = new WebSocketServer({ server });

// Redis subscriber
const subscriber = new Redis();


subscriber.subscribe('DEPTH', (err, count) => {
  if (err) {
    console.error("Failed to subscribe:", err);
  } else {
    console.log(`Subscribed successfully! This client is subscribed to ${count} channel(s).`);
  }
});

// When a message is received from the Redis 'DEPTH' channel, broadcast it to all WebSocket clients
subscriber.on('message', (channel, message) => {
  if (channel === 'DEPTH') {
    console.log(`Received message from ${channel}: ${message}`);


    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
});


wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');


  ws.send('You are connected to the WebSocket server.');


  ws.on('message', (message: string) => {
    console.log(`Received message from client: ${message}`);

  });


  ws.on('close', () => {
    console.log('Client disconnected');
  });


  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});
