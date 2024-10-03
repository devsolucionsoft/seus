import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'http://3.233.173.228:5003' // Backend url config for production
    : '/api', // Dev is config by proxy
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
