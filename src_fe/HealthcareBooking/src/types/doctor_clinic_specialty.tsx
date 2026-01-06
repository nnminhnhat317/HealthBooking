import type { AllCodes } from '@/types/allcodes'
// DUNG GỌI API DOCTOR DETAIL TRONG COMPONENT DOCTOR/SECTIONINFO
export interface DoctorClinicSpecialty { // dung trong doctor detail
  id: number;
  priceId: AllCodes | null;
  provinceId: AllCodes | null;
  paymentId: AllCodes | null;
  note: string | null;
  count: number | null;
}

export interface DoctorClinicSpecialtyDTO { 
  // Các trường thực tế xuất hiện trong console log của bạn:
  doctorClinicSpecialtyId: number;
  clinicId: number;
  clinicName: string;
  clinicAddress: string;
  clinicImage: string | null;
  
  specialtyId: number;
  specialtyName: string;
  specialtyImage: string | null;
}

// DÙNG GỌI LIST BAC SI KHI NHẤP VÀO TRANG DETAIL SPECIALTY
// Sử dụng cho trang specialty chi tiết, có list doctor
export interface SpecialtyDetailDTO {
  id: number;
  name: string;
  description: string;
  image: string;
  doctors: DocSpecialtyDetailDTO[];
}
// Thông tin 1 doctor trong list doctor
export interface DocSpecialtyDetailDTO {
  id: number;
  firstName: string;
  lastName: string;
  role: AllCodes | null;
  position: AllCodes | null;
  image: string| undefined;
  doctorInfo: {
    priceId: AllCodes;
    provinceId: AllCodes;
    paymentId: AllCodes;
    note: string | null;
  } | null;
}
