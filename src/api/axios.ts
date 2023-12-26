import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_CLIENT_ID
});

export default axiosInstance;