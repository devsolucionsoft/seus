import { api } from "../../plugins/axios";

const login = async (data) => {
  try {
    const response = await api.post("v1/auth/login", data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const useAuthService = () => {
  return { login };
};
