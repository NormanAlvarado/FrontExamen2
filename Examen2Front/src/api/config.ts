import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7088/api/'
})

export default api;