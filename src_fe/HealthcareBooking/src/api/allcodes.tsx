import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8080/allcodes",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllPrices = async () => {
  const res = await API.get("/get-type", {
    params: { type: "PRICE" }
  });
  return res.data;
};
export const getAllPayments = async () => {
  const res = await API.get("/get-type", {
    params: { type: "PAYMENT" }
  });
  return res.data;
}
export const getAllProvinces = async () => {
  const res = await API.get("/get-type", {
    params: { type: "PROVINCE" }
  });
  return res.data;
}
export const getAllTimes = async () => {
  const res = await API.get("/get-type", {
    params: { type: "TIME" }
  });
  return res.data;
}
export const getAllRoles = async () => {
  const res = await API.get("/get-type", {
    params: { type: "ROLE" }
  });
  return res.data;
}
export const getAllPositions = async () => {
  const res = await API.get("/get-type", {
    params: { type: "POSITION" }
  });
  return res.data;
}