import { api } from "../../plugins/axios";

const registerCandidate = async (data) => {
  try {
    const response = await api.post("v1/candidate", data);
    return response;
  } catch (error) {
    console.error(error);
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
      return response; 
  } catch (error) {
      console.error('Error fetching candidate profile:', error);
      throw error;
  }
};

const editCandidateProfile = async (token, data) => {
  try {
      const response = await api.post("v1/candidate/profile", data, {
      headers: {
          Authorization: `Bearer ${token}`
      }
      });
      return response; 
  } catch (error) {
      console.error('Error fetching candidate profile:', error);
      throw error;
  }
};

export const useCandidateService = () => {
  return { registerCandidate, getCandidateProfile, editCandidateProfile };
};