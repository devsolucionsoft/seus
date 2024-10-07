import { api } from "../../plugins/axios";
import store from 'store2'; 

const listProfessionalLevels = async () => {
  try {
    const token = store.get('token');
    const response = await api.get("v1/professional-levels", {
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

export const useProfessionalLevels = () => {
  return { listProfessionalLevels };
};