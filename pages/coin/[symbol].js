import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CoinDetail = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const [coinDetails, setCoinDetails] = useState(null);
  const [liveTradeData, setLiveTradeData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingSymbol, setLoadingSymbol] = useState(true);

  useEffect(() => {
    if (symbol) {
      setLoadingSymbol(false);

      // Fetch coin details from the API
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
    }
  }, [symbol]);

  useEffect(() => {
    if (symbol) {
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received trade data:', message); // Debug log for WebSocket messages
        setLiveTradeData({
          price: message.p, // Trade price
          quantity: message.q, // Trade quantity
          time: new Date(message.T).toLocaleTimeString(), // Trade time
        });
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        setError('Error fetching live trade data');
      };

      return () => {
        ws.close(); // Clean up WebSocket on unmount
      };
    }
  }, [symbol]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8 flex flex-col items-center">
      {/* Back Button */}
      <Link href="/binance" className="mb-6 text-lg text-blue-600 hover:text-blue-800 underline">
        ← Back to Binance
      </Link>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {coinDetails?.name || (!loadingSymbol ? symbol?.toUpperCase() : 'Loading...')} Coin Details
      </h1>

      {liveTradeData ? (
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold text-green-600">
            Live Price: ${parseFloat(liveTradeData.price).toFixed(2)}
          </p>
          <p className="text-md text-gray-600">
            Quantity: {liveTradeData.quantity}, Time: {liveTradeData.time}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Fetching live trade data...</p>
      )}

      {coinDetails ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-2xl">
          <div className="mb-6 text-center">
            <img
              src={coinDetails.image}
              alt={coinDetails.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-white"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{coinDetails.name}</h2>
            <p className="text-lg text-gray-600">{coinDetails.symbol.toUpperCase()}</p>
          </div>
          <p className="text-lg text-gray-700 mb-4">{coinDetails.description}</p>
          <p className="text-md text-gray-500">{coinDetails?.additionalInfo || 'No additional info available.'}</p>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Loading coin details...</p>
      )}

      {error && <p className="mt-4 text-red-500 text-lg">{error}</p>}
    </div>
  );
};

export default CoinDetail;
