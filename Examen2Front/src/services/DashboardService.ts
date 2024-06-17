import axios from 'axios';

const API_URL = 'https://localhost:7088/api/Tickets/dashboard'; 

export const getDashboardData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};