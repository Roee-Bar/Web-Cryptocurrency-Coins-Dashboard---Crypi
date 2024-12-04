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

  // Store prices
  const prices = {};
  let lastUpdateTime = Date.now();

  // Function to send data to the client every 2 seconds
  const sendUpdate = () => {
    if (Date.now() - lastUpdateTime >= 2000) {
      res.write(`data: ${JSON.stringify(prices)}\n\n`);
      lastUpdateTime = Date.now();
    }
  };

  // Set up WebSocket connections for each coin
  const sockets = coins.map((coin) => {
    const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@trade`);

    binanceSocket.on('message', (data) => {
      const parsedData = JSON.parse(data);
      const { s: symbol, p: price } = parsedData;

      // Update price data
      prices[symbol] = { symbol, price };

      // Send updated prices to the client
      sendUpdate();
    });

    binanceSocket.on('error', (err) => {
      console.error(`WebSocket error for ${coin}:`, err);
    });

    return binanceSocket;
  });

  // Clean up WebSocket connections on client disconnect
  req.on('close', () => {
    sockets.forEach((socket) => socket.close());
    res.end();
    console.log('Client disconnected, cleaned up WebSocket connections.');
  });
}
