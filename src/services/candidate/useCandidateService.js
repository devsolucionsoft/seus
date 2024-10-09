import { api } from "../../plugins/axios";

const registerCandidate = async (data) => {
  try {
    const response = await api.post("v1/candidate", data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCandidateProfile = async (token) => {
  try {
      const response = await api.get("v1/candidate/profile", {
      headers: {
          Authorization: `Bearer ${token}`
      }
      });
      return response.data.data; 
  } catch (error) {
      console.error('Error fetching candidate profile:', error);
      throw error;
  }
};

export const useCandidateService = () => {
  return { registerCandidate, getCandidateProfile };
};