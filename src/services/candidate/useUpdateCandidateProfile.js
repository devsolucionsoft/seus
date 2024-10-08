import { api } from "../../plugins/axios";
import store from 'store2'; 

const updateCandidateProfile = async (data) => {
  try {
    const token = store.get('token');
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }

    const response = await api.post("v1/candidate/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useUpdateCandidateProfile = () => {
  return { updateCandidateProfile };
};