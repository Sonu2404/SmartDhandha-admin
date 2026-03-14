import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://smart-dhandha-backend.onrender.com/api",

});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getProfile = async () => (await API.get("/auth/profile")).data;

export const getDashboardStats = async () =>
  (await API.get("/dashboard/stats")).data;

export const getSalesChartData = async () =>
  (await API.get("/dashboard/sales-chart")).data;

export const getRecentActivity = async () =>
  (await API.get("/dashboard/recent-activity")).data;

export const getLowStockItems = async () =>
  (await API.get("/dashboard/low-stock")).data;

export const getTopSellingProducts = async () =>
  (await API.get("/dashboard/top-selling-products")).data;

export const getIncomeVsExpenseChartData = async () =>
  (await API.get("/dashboard/income-expense-chart")).data;
