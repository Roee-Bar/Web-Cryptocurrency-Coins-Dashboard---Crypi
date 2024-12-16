import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from 'recharts';

const LiveGraph = ({ symbol }) => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure symbol is available before trying to connect
    if (!symbol) return; // Don't do anything until the symbol is ready

    const connectWebSocket = () => {
      const symbolLower = symbol.toLowerCase();
      const candlestickWs = new WebSocket(`wss://stream.binance.com:9443/ws/${symbolLower}@kline_1m`);

      candlestickWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const candle = message.k;
        const newCandlestick = {
          time: new Date(candle.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          open: parseFloat(candle.o),
          high: parseFloat(candle.h),
          low: parseFloat(candle.l),
          close: parseFloat(candle.c),
          isPositive: parseFloat(candle.c) >= parseFloat(candle.o),
        };
//
        setCandlestickData((prevData) => {
          if (prevData[prevData.length - 1]?.time !== newCandlestick.time) {
            return [...prevData, newCandlestick].slice(-20); // Keep last 20 data points
          }
          return prevData;
        });
      };

      candlestickWs.onerror = (err) => {
        console.error('Candlestick WebSocket error:', err);
        setError('Error fetching live candlestick data');
      };

      return () => candlestickWs.close();
    };

    // Introduce a small delay before connecting to the WebSocket
    const delay = 500; // Delay in milliseconds (500ms)
    const timer = setTimeout(() => {
      connectWebSocket(); // Try connecting after the delay
    }, delay);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [symbol]); // Only re-run when the symbol changes

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Live Graph</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={candlestickData} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
          <Tooltip
            labelStyle={{ color: '#fff' }}
            contentStyle={{ backgroundColor: '#333', color: '#fff' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Bar
            dataKey="close"
            barSize={6} // Reduced the width of the candlesticks
            fill="#8884d8"
            radius={[2, 2, 0, 0]} // Rounded corners for a more modern look
            strokeWidth={0}
            isAnimationActive={false} // Disable animation for faster rendering
          />
          <Bar
            dataKey="open"
            barSize={6} // Same width as the close bar
            fill="#ff4f4f"
            radius={[2, 2, 0, 0]}
            strokeWidth={0}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default LiveGraph;
