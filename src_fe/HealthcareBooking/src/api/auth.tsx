import axios from "axios";

interface LoginRequestType {
    email: string;
    password: string;
}
interface LoginResponseType {
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
  return response.data; // { token, username, roleId }
};
//await sẽ tạm dừng việc thực thi các dòng code tiếp theo trong hàm async,
//cho đến khi Promise phía sau nó (ở đây là API.post(...)) hoàn tất: