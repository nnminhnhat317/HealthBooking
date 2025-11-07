import axios from "axios";

interface LoginRequestType {
    email: string;
    password: string;
}
interface LoginResponseType {
  id: string;
  token: string;
  email: string;
  roleId: string;
}

const API = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = async (
  data: LoginRequestType
): Promise<LoginResponseType> => {
  const response = await API.post<LoginResponseType>("/login", data); //post<> khai báo kiểu dữ liệu trả về từ BE
  return response.data; // { id, token, email, roleId }
};