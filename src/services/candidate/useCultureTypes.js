import { api } from "../../plugins/axios";
import store from 'store2'; 


const listCultureTypes = async () => {
  try {
    const token = store.get('token');
    const response = await api.get("v1/cultures", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useCultureTypes = () => {
  return { listCultureTypes };
};