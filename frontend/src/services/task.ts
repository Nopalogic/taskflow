import { Task } from "@/types/task";
import api, { handleApiError } from "./api";

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createTask = async (data: Task) => {
  try {
    const response = await api.post("/tasks", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTask = async (id: string) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateTask = async (id: string, taskData: Task) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
