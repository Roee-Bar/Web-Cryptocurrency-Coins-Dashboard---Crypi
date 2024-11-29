import { useEffect, useState } from 'react';

const COINS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', image: '/images/bitcoin.png' },
  { symbol: 'ETHUSDT', name: 'Ethereum', image: '/images/ethereum.webp' },
  { symbol: 'BNBUSDT', name: 'Binance', image: '/images/binance.png' },
  { symbol: 'ADAUSDT', name: 'Cardano', image: '/images/cardano.png' },
  { symbol: 'SOLUSDT', name: 'Solana', image: '/images/solana.jpg' },
  { symbol: 'XRPUSDT', name: 'Ripple', image: '/images/ripple.png' },
  { symbol: 'DOGEUSDT', name: 'Dogecoin', image: '/images/doge.png' },
  { symbol: 'LTCUSDT', name: 'Litecoin', image: '/images/litecoin.png' },
  { symbol: 'XLMUSDT', name: 'Stellar Lumens', image: '/images/xlm.png' },
  { symbol: 'DOTUSDT', name: 'Polkadot', image: '/images/polkadot.png' },
];

const BinancePage = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const eventSource = new EventSource('/api/binance');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setPrices(data);
      } catch (err) {
        console.error('Error parsing SSE data:', err);
      }
    };

    eventSource.onerror = () => {
      console.error('SSE connection error. Closing connection.');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center mb-8">Real-Time Crypto Price Dashboard</h1>
      <div className="grid-layout">
        {COINS.map((coin) => (
          <div key={coin.symbol} className="coin-box">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-16 h-16 object-cover rounded-full border-2 border-white"
            />
            <div>
              <h2>{coin.name}</h2>
              <p>
                {prices[coin.symbol]?.price
                  ? `$${parseFloat(prices[coin.symbol].price).toFixed(2)}`
                  : 'Loading...'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinancePage;
