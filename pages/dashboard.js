import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

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

const Dashboard = () => {
  const [prices, setPrices] = useState({});
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Construct the combined stream URL
    const streams = COINS.map((coin) => `${coin.symbol.toLowerCase()}@trade`).join('/');
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const symbol = data.data.s;
      const price = parseFloat(data.data.p);

      // Update the price state for the specific coin
      setPrices((prevPrices) => ({
        ...prevPrices,
        [symbol]: { symbol, price },
      }));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 transition-colors duration-200 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-screen-lg w-full">
        {COINS.map((coin) => (
          <div
            key={coin.symbol}
            className="bg-gradient-to-br from-cyan-500 to-blue-500 dark:from-blue-600 dark:to-blue-800 text-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
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
                  ? `$${prices[coin.symbol].price.toFixed(2)}`
                  : 'Loading...'}
              </p>
              <Link href={`/${coin.symbol}`}>
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

export default Dashboard;
