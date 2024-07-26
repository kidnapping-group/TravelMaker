import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/06-02/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default axiosInstance;