import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const CoinDetail = () => {
  const router = useRouter();
  const { symbol } = router.query; // Get the coin symbol from the URL
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (symbol) {
      const fetchCoinDetails = async () => {
        try {
          // API route for fetching coin details
          const res = await fetch(`/api/coin-details/${symbol}`);
          const data = await res.json();

          if (res.ok) {
            setCoinData(data);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('Error fetching coin data');
        } finally {
          setLoading(false);
        }
      };

      fetchCoinDetails();
    }
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        {coinData ? coinData.name : symbol} Coin Details
      </h1>
      <div className="coin-detail">
        <p>{coinData?.description}</p>
        <p>Price: ${coinData?.price}</p>
        <p>Market Cap: ${coinData?.marketCap}</p>
        <p>24h Volume: ${coinData?.volume24h}</p>
      </div>
    </div>
  );
};

export default CoinDetail;
