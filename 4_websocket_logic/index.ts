import { createServer } from 'http';
import { Redis } from 'ioredis';
import { WebSocket, WebSocketServer } from 'ws';

// Setup native HTTP server
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('HTTP server is running');
});

server.listen(2005, () => {
  console.log("Server listening on port 2005");
});

// WebSocket Server
const wss = new WebSocketServer({ server });

// Redis subscriber
const subscriber = new Redis();

// Subscribe to Redis 'DEPTH' channel
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

    // Broadcast the message to all connected WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
});

// Handle new WebSocket client connections
wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  // Send an initial message to the client
  ws.send('You are connected to the WebSocket server.');

  // Handle incoming messages from the client (if needed)
  ws.on('message', (message: string) => {
    console.log(`Received message from client: ${message}`);
    // You can respond to the client if needed, based on the message
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Handle any errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});
