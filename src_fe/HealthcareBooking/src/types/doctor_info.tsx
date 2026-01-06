import type {AllCodes} from "@/types/allcodes"
// export interface DoctorInfor { // dung trong doctor detail
//   id: number;
//   priceId: AllCodes;
//   provinceId: AllCodes;
//   paymentId: AllCodes;
//   note: string;
//   count: number;
// }
export interface DoctorInfo { // dung trong doctor detail
  id: number;
  priceId: AllCodes | null;
  provinceId: AllCodes | null;
  paymentId: AllCodes | null;
  note: string | null;
  count: number | null;
}