import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const coins = ["bitcoin", "ethereum", "binancecoin", "cardano"];

export default function Dashboard() {
  const [livePrices, setLivePrices] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch live prices
  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
            ","
          )}&vs_currencies=usd`
        );
        setLivePrices(response.data);
      } catch (error) {
        console.error("Error fetching live prices:", error);
      }
    };

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch historical data (last 30 days)
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const promises = coins.map((coin) =>
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30`
          )
        );
        const results = await Promise.all(promises);

        const data = results.reduce((acc, result, index) => {
          acc[coins[index]] = result.data.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price,
          }));
          return acc;
        }, {});

        setHistoricalData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Prepare graph data
  const graphData = coins.map((coin) => ({
    labels: historicalData[coin].map((item) => item.date),
    datasets: [
      {
        label: `${coin.toUpperCase()} Price (USD)`,
        data: historicalData[coin].map((item) => item.price),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  }));

  return (
    <div>
      <h1>Crypto Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Object.keys(livePrices).map((coin) => (
          <div key={coin} style={{ textAlign: "center", margin: "20px" }}>
            <h2>{coin.toUpperCase()}</h2>
            <p>Live Price: ${livePrices[coin].usd}</p>
          </div>
        ))}
      </div>
      <div>
        {graphData.map((data, index) => (
          <div key={coins[index]} style={{ marginBottom: "50px" }}>
            <h3>{coins[index].toUpperCase()} Price Trend (Last 30 Days)</h3>
            <Line data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}
