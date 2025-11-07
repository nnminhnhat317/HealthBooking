import type { UserFormData } from "@/types/users";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/users",
  headers: {
    "Content-Type": "application/json",
  },
});
//GET
export const getUsersListApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get("/list", {
      headers: {// đính kèm token vào header cho các request
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersIdApi = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//POST
export const addUsersApi = async (
  userData: UserFormData
) => {
  try {
    const response = await API.post(
      "/create",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm nhân viên:", error);
  }
};