import type { BookingFormData } from "@/types/booking";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/booking",
  headers: {
    "Content-Type": "application/json",
  },
});
//POST
export const addBookingApi = async (
  bookingData: BookingFormData
) => {
  try {
    const response = await API.post(
      "/book",
      bookingData
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi API tai api booking addBookingApi:", error);
  }
};