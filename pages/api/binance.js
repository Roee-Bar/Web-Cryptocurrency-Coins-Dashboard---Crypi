import WebSocket from 'ws';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // Define the coins to listen to
  const coins = ['btcusdt', 'ethusdt', 'bnbusdt', 'adausdt', 'solusdt', 'xrpusdt', 'dogeusdt', 'ltcusdt', 'xlmusdt', 'dotusdt'];

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Object to store price data
  const prices = {};

  // Function to send updates every 2 seconds
  let lastUpdateTime = Date.now();
  const sendUpdate = () => {
    if (Date.now() - lastUpdateTime >= 2000) {
      res.write(`data: ${JSON.stringify(prices)}\n\n`);
      lastUpdateTime = Date.now();
    }
  };

  // Initialize WebSocket connections for each coin
  coins.forEach((coin) => {
    const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@trade`);

    binanceSocket.on('message', (data) => {
      const parsedData = JSON.parse(data);
      const { s: symbol, p: price } = parsedData;

      // Update the price data for the coin
      prices[symbol] = { symbol, price };

      // Send updates to the client
      sendUpdate();
    });

    binanceSocket.on('error', (err) => {
      console.error(`WebSocket error for ${coin}:`, err);
    });

    // Close WebSocket on client disconnect
    req.on('close', () => {
      console.log('Client disconnected.');
      binanceSocket.close();
      res.end();
    });
  });
}
