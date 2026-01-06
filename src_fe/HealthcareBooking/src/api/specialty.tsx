import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8080/specialty",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSpecialtyListApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};