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

export const useCandidateService = () => {
  return { registerCandidate };
};