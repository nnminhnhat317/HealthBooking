import type { BookingAppointmentRequest } from "@/types/booking";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/booking",
  headers: {
    "Content-Type": "application/json",
  },
});
//POST
export const addBookingApi = async (
  bookingData: BookingAppointmentRequest
) => {
  try {
    const response = await API.post(
      "/book-appointment",
      bookingData
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi API tai api booking addBookingApi:", error);
  }
};