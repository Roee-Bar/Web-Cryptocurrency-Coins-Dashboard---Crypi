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
    const streams = COINS.map((coin) => `${coin.symbol.toLowerCase()}@trade`).join('/');
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const symbol = data.data.s;
      const price = parseFloat(data.data.p);

      setPrices((prevPrices) => ({
        ...prevPrices,
        [symbol]: { symbol, price },
      }));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className={`min-h-screen px-6 py-12 transition-colors duration-200
      ${isDarkMode 
        ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
        : 'bg-white'}`}>
      <div className="mb-8 text-center">
        <h1 className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Cryptocurrency Dashboard
        </h1>
      </div>
      
      {/* Main grid content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-screen-lg mx-auto">
        {COINS.map((coin) => (
          <div
            key={coin.symbol}
            className={`p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300
              ${isDarkMode 
                ? 'bg-gradient-to-br from-gray-700 to-gray-900'
                : 'bg-gradient-to-br from-cyan-500 to-blue-500'}`}
          >
            <img
              src={coin.image}
              alt={coin.name}
              className="w-16 h-16 object-cover rounded-full border-2 border-white mb-4"
            />
            <div>
              <h2 className={`text-lg font-bold truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {coin.name}
              </h2>
              <p className={`text-xl font-semibold mt-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {prices[coin.symbol]?.price
                  ? `$${prices[coin.symbol].price.toFixed(2)}`
                  : 'Loading...'}
              </p>
              <Link href={`/${coin.symbol}`}>
                <div className={`mt-4 text-sm font-medium underline hover:text-gray-200 cursor-pointer
                  ${isDarkMode ? 'text-white' : 'text-black'}`}>
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