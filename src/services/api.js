import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';
const TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your token

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

export const getStockList = () => api.get('/stocks');

export const getStockPrices = (ticker, minutes) =>
  api.get(`/stocks/${ticker}?minutes=${minutes}`);
