import { api } from "../../plugins/axios";
import store from 'store2'; 

const listJobSkills = async () => {
  try {
    const token = store.get('token');
    const response = await api.get("v1/job-skills/", {
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

export const useJobSkills = () => {
  return { listJobSkills };
};