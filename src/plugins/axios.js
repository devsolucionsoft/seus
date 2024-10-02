// src/plugins/axios.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://3.233.173.228:5003/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = api;
  },
};