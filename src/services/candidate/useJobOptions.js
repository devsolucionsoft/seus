import { api } from "../../plugins/axios";
import store from 'store2'; 


const listJobOptions = async () => {
  try {
    const token = store.get('token');
    const response = await api.get("v1/jornada-options", {
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

export const useJobOptions = () => {
  return { listJobOptions };
};