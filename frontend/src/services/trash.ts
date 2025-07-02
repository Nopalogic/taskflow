import api, { handleApiError } from "./api";

export const getTrash = async () => {
  try {
    const response = await api.get("/trash");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const restore = async () => {
  try {
    const response = await api.get("/trash");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const permanentDelete = async () => {
  try {
    const response = await api.get("/trash");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
