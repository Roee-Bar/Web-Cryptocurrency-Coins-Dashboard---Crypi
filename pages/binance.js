import { useEffect, useState } from 'react';
import Link from 'next/link';

const COINS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', image: '/images/bitcoin.png' },
  { symbol: 'ETHUSDT', name: 'Ethereum', image: '/images/ethereum.webp' },
  { symbol: 'BNBUSDT', name: 'Binance', image: '/images/binance.png' },
  { symbol: 'ADAUSDT', name: 'Cardano', image: '/images/cardano.png' },
  { symbol: 'SOLUSDT', name: 'Solana', image: '/images/solana.jpg' },
  { symbol: 'XRPUSDT', name: 'Ripple', image: '/images/ripple.png' },
  { symbol: 'DOGEUSDT', name: 'Dogecoin', image: '/images/doge.png' },
  { symbol: 'LTCUSDT', name: 'Litecoin', image: '/images/litecoin.png' },
  { symbol: 'XLMUSDT', name: 'Stellar', image: '/images/xlm.png' },
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Real-Time Crypto Price Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-screen-lg w-full">
        {COINS.map((coin) => (
          <div
            key={coin.symbol}
            className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
          >
            <img
              src={coin.image}
              alt={coin.name}
              className="w-16 h-16 object-cover rounded-full border-2 border-white mb-4"
            />
            <div>
              <h2 className="text-lg font-bold truncate">{coin.name}</h2>
              <p className="text-xl font-semibold mt-2">
                {prices[coin.symbol]?.price
                  ? `$${parseFloat(prices[coin.symbol].price).toFixed(2)}`
                  : 'Loading...'}
              </p>
              <Link href={`/coin/${coin.symbol}`}>
                <div className="mt-4 text-sm font-medium text-white underline hover:text-gray-200 cursor-pointer">
                  View Details
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinancePage;
