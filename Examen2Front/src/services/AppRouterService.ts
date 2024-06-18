import axios from 'axios';

const API_URL = 'https://localhost:7088/api/Menu'; 

export const GetAppRoutes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};