import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8080/markdown",
  headers: {
    "Content-Type": "application/json",
  },
});

// GET markdown theo doctor
export const getMarkdownApi = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`/doctor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
