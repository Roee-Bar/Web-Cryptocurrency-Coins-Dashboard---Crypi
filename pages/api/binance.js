import WebSocket from 'ws';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const coins = ['btcusdt', 'ethusdt', 'bnbusdt', 'adausdt', 'solusdt','xrpusdt', 'dogeusdt', 'ltcusdt', 'xlmusdt', 'dotusdt']; 

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const prices = {};

  // Stream data every 2 seconds
  let lastUpdateTime = Date.now();
  const sendUpdate = () => {
    if (Date.now() - lastUpdateTime >= 2000) {
      res.write(`data: ${JSON.stringify(prices)}\n\n`);
      lastUpdateTime = Date.now();
    }
  };

  // For each coin, create a separate WebSocket connection
  coins.forEach((coin) => {
    const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@trade`);

    binanceSocket.on('message', (data) => {
      const parsedData = JSON.parse(data);
      const { s: symbol, p: price } = parsedData;
      prices[symbol] = { symbol, price };
      sendUpdate();
    });

    binanceSocket.on('error', (err) => {
      console.error(`WebSocket error for ${coin}:`, err);
    });

    req.on('close', () => {
      console.log('Client disconnected.');
      binanceSocket.close();
      res.end();
    });
  });
}
