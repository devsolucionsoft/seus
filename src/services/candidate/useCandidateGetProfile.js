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
            return { success: true, data: response.data.data }; 
        } else {
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error('Error fetching candidate profile:', error);
        return { success: false, message: error.message || 'Error desconocido' };
    }
};

export const useCandidateGetProfile = () => {
  return { getCandidateProfile };
};