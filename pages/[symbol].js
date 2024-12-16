import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CoinInfo from '/components/CoinInfo';
import LiveGraph from '/components/LiveGraph';
import HistoricalData from '/components/HistoricalData';
import LivePrice from '/components/LivePrice'; // Import LivePrice component

const CoinDetail = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const [timeRange, setTimeRange] = useState('1d');
  const [error, setError] = useState(null);

  const timeRangeOptions = ['5y', '1y', '1m', '1d'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 transition-colors duration-200">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          {symbol?.toUpperCase()} Data
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Coin Info and Live Price */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CoinInfo symbol={symbol} />
          {/* Live Price */}
          <LivePrice symbol={symbol} /> {/* Add LivePrice under CoinInfo */}
        </div>

        {/* Historical Data */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <HistoricalData
            symbol={symbol}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            timeRangeOptions={timeRangeOptions}
          />
        </div>

        {/* Live Graph */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <LiveGraph symbol={symbol} />
        </div>
      </div>

      {error && <p className="text-red-600 text-center mt-6">{error}</p>}
    </div>
  );
};

export default CoinDetail;
