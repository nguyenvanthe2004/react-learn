import axios from 'axios';
import { BASE_URL } from '../constants';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const normalizeError = error.response.data
    return Promise.reject(normalizeError);
  }
);

export default instance; 