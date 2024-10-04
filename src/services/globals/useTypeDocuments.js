import { api } from "../../plugins/axios";

const listTypeDocuments = async () => {
  try {
    const response = await api.get("v1/type-documents");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useTypeDocuments = () => {
  return { listTypeDocuments };
};