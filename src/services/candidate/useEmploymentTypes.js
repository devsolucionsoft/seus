import { api } from "../../plugins/axios";
import store from 'store2'; 

const listEmploymentTypes = async () => {
  try {
    const token = store.get('token');
    const response = await api.get("v1/employment-training-types", {
        headers: {
            Authorization: `Bearer ${token}` // Agrega el token en la cabecera
        }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useEmploymentTypes = () => {
  return { listEmploymentTypes };
};