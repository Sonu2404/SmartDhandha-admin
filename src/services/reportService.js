import axios from 'axios';

const API = axios.create({
  baseURL: "https://smart-dhandha-backend.onrender.com/api",
  // baseURL: 'http://localhost:5000/api',
});

// Attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// All report API calls using /api/report prefix
export const getInvoicesReport = async () => {
  const { data } = await API.get('/report/invoices');
  return data;
};

export const getProductsReport = async () => {
  const { data } = await API.get('/report/products');
  return data;
};

export const getCashflowsReport = async () => {
  const { data } = await API.get('/report/cashflows');
  return data;
};

export const getLedgerReport = async () => {
  const { data } = await API.get('/report/ledger');
  return data;
};