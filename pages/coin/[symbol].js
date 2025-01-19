import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../../context/ThemeContext';
import CoinInfo from '/components/CoinInfo';
import LiveGraph from '/components/LiveGraph';
import HistoricalData from '/components/HistoricalData';
import LivePrice from '/components/LivePrice';

const CoinDetail = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { isDarkMode } = useTheme();

  const [timeRange, setTimeRange] = useState('1d');
  const [error, setError] = useState(null);

  const timeRangeOptions = ['5y', '1y', '1m', '1d'];

  return (
    <div className={`min-h-screen w-full px-4 md:px-6 py-8 transition-colors duration-200
      ${isDarkMode 
        ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
        : 'bg-white'}`}>
      
      {/* Header Section */}
      <div className="mb-6 text-center">
        {/* TEST FOR MY SELF
      <h1 className={`text-3xl md:text-4xl font-extrabold ${
          isDarkMode ? 'text-white' : 'text-gray-800' }`}>
     {symbol?.toUpperCase()} Data
</h1>*/}
      </div>
      {/* Main Content Container */}
      <div className="max-w-[1920px] mx-auto space-y-6">
        {/* Top Section: Split into two halves */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Half: Coin Info and Live Price */}
          <div className="space-y-4">
            {/* Coin Info */}
            <div className={`p-6 rounded-xl shadow-xl h-fit
              ${isDarkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'}`}>
              <CoinInfo symbol={symbol} />
            </div>
            {/* Live Price */}
            <div className={`p-6 rounded-xl shadow-xl h-fit
              ${isDarkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'}`}>
              <LivePrice symbol={symbol} />
            </div>
          </div>

          {/* Right Half: Live Graph */}
          <div className={`p-6 rounded-xl shadow-xl h-full
            ${isDarkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'}`}>
            <div className="h-[400px] md:h-[500px]">
              <LiveGraph symbol={symbol} />
            </div>
          </div>
        </div>

        {/* Bottom Section: Full Width Historical Data */}
        <div className={`w-full p-6 rounded-xl shadow-xl
          ${isDarkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'}`}>
          <HistoricalData
            symbol={symbol}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            timeRangeOptions={timeRangeOptions}
          />
        </div>
      </div>

      {error && 
        <div className="text-red-600 text-center mt-6 p-4 rounded-lg bg-red-100">
          {error}
        </div>
      }
    </div>
  );
};

export default CoinDetail;