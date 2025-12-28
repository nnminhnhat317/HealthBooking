import axios from "axios";
import { format } from "date-fns";
const API = axios.create({
  baseURL: "http://localhost:8080/schedule",
  headers: {
    "Content-Type": "application/json",
  },
});

// GET schedule theo doctor + date
export const getScheduleByDateApi = async (
  doctorId: number,
  date: Date
) => {
  try {
    const token = localStorage.getItem("token");
    const formattedDate = format(date, "yyyy-MM-dd");
    const response = await API.get("/doctor-date", {
      params: {
        doctorId,
        date:formattedDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
