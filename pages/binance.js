// pages/binance.js
import { useEffect, useState } from 'react';

const BinancePage = () => {
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/binance');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setPriceData(data);
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Binance Live Price Tracker</h1>
      {priceData ? (
        <div>
          <p>
            <strong>Symbol:</strong> {priceData.symbol}
          </p>
          <p>
            <strong>Price:</strong> ${parseFloat(priceData.price).toFixed(2)}
          </p>
          <p>
            <strong>Last Updated:</strong>{' '}
            {new Date(priceData.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BinancePage;
