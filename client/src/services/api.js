import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('user');
  if (profile) {
    const { token } = JSON.parse(profile);
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;