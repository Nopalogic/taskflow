import { Project } from "@/types/project";
import api, { handleApiError } from "./api";

export const createProject = async (projectData: Project) => {
  try {
    const response = await api.post("/projects", projectData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProject = async (projectId: string) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateProject = async (
  projectId: string,
  projectData: Project,
) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
