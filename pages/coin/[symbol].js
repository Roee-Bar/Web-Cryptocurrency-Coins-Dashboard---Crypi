import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CoinDetail = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const [coinDetails, setCoinDetails] = useState(null);
  const [livePrice, setLivePrice] = useState(null);
  const [error, setError] = useState(null);
  const [loadingSymbol, setLoadingSymbol] = useState(true); // Add a state to track symbol loading

  useEffect(() => {
    if (symbol) {
      setLoadingSymbol(false); // Symbol is loaded
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
      const sse = new EventSource('/api/binance');

      sse.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const priceData = data[symbol.toUpperCase()];
        if (priceData) {
          setLivePrice(priceData.price);
        }
      };

      sse.onerror = (err) => {
        console.error('SSE error:', err);
        setError('Error fetching live prices');
        sse.close();
      };

      return () => {
        sse.close();
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

      {livePrice && (
        <p className="text-2xl font-semibold text-green-600 mb-6">
          Live Price: ${parseFloat(livePrice).toFixed(2)}
        </p>
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
