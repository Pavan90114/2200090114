import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  MenuItem,
  Select,
  Typography,
  Box,
  FormControl,
  InputLabel,
} from '@mui/material';
import { getStockList, getStockPrices } from '../services/api';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const StockChart = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [minutes, setMinutes] = useState(10);
  const [data, setData] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    getStockList().then(res => {
      const keys = Object.keys(res.data.stocks);
      setStocks(keys);
      setSelectedStock(keys[0]);
    });
  }, []);

  useEffect(() => {
    if (!selectedStock) return;
    getStockPrices(selectedStock, minutes).then(res => {
      const points = res.data;
      const values = points.map(p => p.price);
      setData(points);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      setAverage(avg.toFixed(2));
    });
  }, [selectedStock, minutes]);

  const chartData = {
    labels: data.map(d => new Date(d.lastUpdatedAt).toLocaleTimeString()),
    datasets: [
      {
        label: 'Price',
        data: data.map(d => d.price),
        fill: false,
        borderColor: 'blue',
        tension: 0.1
      },
      {
        label: `Average (${average})`,
        data: new Array(data.length).fill(average),
        borderDash: [5, 5],
        borderColor: 'red',
        fill: false
      }
    ]
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4">📊 Stock Price Chart</Typography>
      <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
        <FormControl>
          <InputLabel>Stock</InputLabel>
          <Select
            value={selectedStock}
            label="Stock"
            onChange={e => setSelectedStock(e.target.value)}
          >
            {stocks.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Minutes</InputLabel>
          <Select value={minutes} label="Minutes" onChange={e => setMinutes(e.target.value)}>
            {[5, 10, 15, 30, 60].map(m => (
              <MenuItem key={m} value={m}>{m} min</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Line data={chartData} />
    </Box>
  );
};

export default StockChart;
