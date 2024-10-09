import { api } from "../../plugins/axios";
import store from 'store2'; 

const getCandidateProfile = async () => {
  try {
    const token = store.get('token');
    const response = await api.get("v1/candidate/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.status_code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useCandidateGetProfile = () => {
  return { getCandidateProfile };
};