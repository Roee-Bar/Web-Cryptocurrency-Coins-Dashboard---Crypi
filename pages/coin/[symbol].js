import React, { useState, useEffect, useCallback } from 'react'; 
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/router';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Bar 
} from 'recharts';

// Custom Hook for Debouncing
const useDebouncedState = (initialValue, delay) => {
  const [value, setValue] = useState(initialValue);

  const setDebouncedValue = useCallback(
    (newValue) => {
      setTimeout(() => {
        setValue(newValue);
      }, delay);
    },
    [delay]
  );

  return [value, setDebouncedValue];
};

const CoinDetail = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const { symbol } = router.query;

  const [coinDetails, setCoinDetails] = useState(null);
  const [liveTradeData, setDebouncedTradeData] = useDebouncedState(null, 200); // Debounced live trade data
  const [candlestickData, setCandlestickData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSymbol, setLoadingSymbol] = useState(true);
  const [timeRange, setTimeRange] = useState('1d');

  const timeRangeOptions = ['5y', '1y', '1m', '1d'];

  useEffect(() => {
    if (symbol) {
      setLoadingSymbol(false);

      // Fetch coin details
      const fetchCoinDetails = async () => {
        try {
          const res = await fetch(`/api/coin-details/${symbol}`);
          const data = await res.json();
          if (res.ok) {
            setCoinDetails(data);
          } else {
            setError(data.error || 'Error fetching coin details');
          }
        } catch (err) {
          setError('Error fetching coin details');
        }
      };
      fetchCoinDetails();

      // WebSocket for live trade data and candlestick
      const symbolLower = symbol.toLowerCase();
      const tradeWs = new WebSocket(`wss://stream.binance.com:9443/ws/${symbolLower}@trade`);
      const candlestickWs = new WebSocket(`wss://stream.binance.com:9443/ws/${symbolLower}@kline_1m`);

      // WebSocket trade data handler
      tradeWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setDebouncedTradeData({
          price: message.p,
          quantity: message.q,
          time: new Date(message.T).toLocaleTimeString(),
        });
      };

      // WebSocket candlestick data handler
      candlestickWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const candle = message.k;

        const newCandlestick = {
          time: new Date(candle.t).toLocaleTimeString(),
          open: parseFloat(candle.o),
          high: parseFloat(candle.h),
          low: parseFloat(candle.l),
          close: parseFloat(candle.c),
          isPositive: parseFloat(candle.c) >= parseFloat(candle.o),
        };

        setCandlestickData((prevData) => {
          // Prevent redundant updates
          if (prevData[prevData.length - 1]?.time !== newCandlestick.time) {
            const updatedData = [...prevData, newCandlestick];
            return updatedData.slice(-20); // Keep only the last 20 candlesticks
          }
          return prevData;
        });
      };

      // Error handlers
      tradeWs.onerror = (err) => {
        console.error('Trade WebSocket error:', err);
        setError('Error fetching live trade data');
      };

      candlestickWs.onerror = (err) => {
        console.error('Candlestick WebSocket error:', err);
        setError('Error fetching candlestick data');
      };

      // Cleanup WebSocket on unmount or symbol change
      return () => {
        tradeWs.close();
        candlestickWs.close();
      };
    }
  }, [symbol]);

  // Fetch historical data based on time range
  const fetchHistoricalData = async (range) => {
    try {
      const intervalMap = {
        '5y': '1d',
        '1y': '1d',
        '1m': '1h',
        '1d': '15m',
      };
      const limitMap = {
        '5y': 2000,
        '1y': 365,
        '1m': 744,
        '1d': 96,
      };

      const interval = intervalMap[range] || '1d';
      const limit = limitMap[range] || 96;

      const res = await fetch(`https://api.binance.com/api/v1/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${limit}`);
      const data = await res.json();

      if (res.ok) {
        const formattedData = data.map(d => ({
          time: new Date(d[0]).toLocaleTimeString(),
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        setHistoricalData(formattedData);
      } else {
        setError('Error fetching historical data');
      }
    } catch (err) {
      setError('Error fetching historical data');
    }
  };

  // Load historical data once the component is mounted or when time range is changed
  useEffect(() => {
    if (symbol) {
      fetchHistoricalData(timeRange);
    }
  }, [symbol, timeRange]);

  // Custom Candlestick Component
  const CandlestickBar = React.memo(({ x, y, width, height, fill, dataPoint }) => {
    const isPositive = dataPoint.isPositive;
    const bodyHeight = Math.abs(height);
    const bodyY = isPositive ? y : y - bodyHeight;

    return (
      <g>
        {/* Candle body */}
        <rect
          x={x}
          y={bodyY}
          width={width}
          height={bodyHeight}
          fill={isPositive ? 'green' : 'red'}
          stroke={isPositive ? 'green' : 'red'}
        />
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={y - (isPositive ? height : 0)}
          x2={x + width / 2}
          y2={y + (isPositive ? 0 : height)}
          stroke={isPositive ? 'green' : 'red'}
          strokeWidth={1}
        />
      </g>
    );
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-8 transition-colors duration-200">
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mt-4">
        {coinDetails?.name || (!loadingSymbol ? symbol?.toUpperCase() : 'Loading...')} Data
      </h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Box */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {liveTradeData ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{coinDetails.name}</h2>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
              Live Price: ${parseFloat(liveTradeData.price).toFixed(2)}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">{coinDetails.symbol.toUpperCase()}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{coinDetails.description}</p>
            <p className="text-md text-gray-500 dark:text-gray-400">{coinDetails?.additionalInfo || 'No additional info available.'}</p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-lg">Fetching live trade data...</p>
        )}
      </div>

      {/* Middle Box */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="text-center mb-6 dark:text-white">Live Candlestick Chart</div>
        {/* ... rest of your chart component */}
      </div>

      {/* Right Box */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <select
            className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {timeRangeOptions.map((range) => (
              <option key={range} value={range}>
                {range === '5y' ? '5 Years' : range === '1y' ? '1 Year' : range === '1m' ? '1 Month' : '1 Day'}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center mb-6 dark:text-white">Historical Candlestick Chart</div>
        {/* ... rest of your chart component */}
      </div>
    </div>
  </div>
);
};

export default CoinDetail;
