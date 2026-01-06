import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/dcs",
  headers: {
    "Content-Type": "application/json",
  },
});

// new bổ sung thêm thông tin bảng specialty
export const getSpecListDocBySpecialtyId = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`specialty-list-doctor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};