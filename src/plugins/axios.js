import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://seusapi.solucionsoft.com/' // Backend url config for production
    : '/api', // Dev is config by proxy
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };