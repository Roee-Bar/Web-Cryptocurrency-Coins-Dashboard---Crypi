// pages/api/binance.js
import WebSocket from 'ws';

let binanceSocket = null;

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // Set up headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Initialize WebSocket connection if not already active
  if (!binanceSocket) {
    binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
  }

  let lastUpdateTime = Date.now();

  // Send updates from WebSocket to client every 2 seconds
  const sendUpdate = (data) => {
    if (Date.now() - lastUpdateTime >= 2000) {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      lastUpdateTime = Date.now();
    }
  };

  binanceSocket.on('message', (data) => {
    const parsedData = JSON.parse(data);
    const priceData = {
      symbol: parsedData.s, // Symbol (e.g., BTCUSDT)
      price: parsedData.p,  // Latest price
      timestamp: parsedData.T, // Timestamp
    };
    sendUpdate(priceData);
  });

  binanceSocket.on('error', (err) => {
    console.error('WebSocket error:', err);
  });

  // Handle client disconnect
  req.on('close', () => {
    console.log('Client disconnected.');
    res.end();
  });
}
