import * as z from "zod";

//type validate: Zod schema để validate runtime, kiểm tra khi chương trình đang chạy 
export const bookingFormSchema = z.object({
    email: z
      .email("Email không hợp lệ.")
      .min(5, "Email phải có ít nhất 5 ký tự."),
    // password: z
    //   .string()
    //   .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    //   .max(32, "Mật khẩu không được vượt quá 32 ký tự."),
    firstName: z.string().min(1, "Vui lòng nhập họ."),
    lastName: z.string().min(1, "Vui lòng nhập tên."),
    // address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự."),
    // gender: z.string().min(1, "Vui lòng chọn giới tính."),
    // roleId: z.string().min(1, "Role không được bỏ trống."),
    // positionId: z.string().min(1, "Vui lòng chọn chức vụ."),
    phoneNumber: z
      .string()
      .regex(/^[0-9]{9,11}$/, "Số điện thoại phải từ 9–11 chữ số."),
    // image: z.string().optional(), // base64 hoặc URL ảnh
  }); 
//type sử dụng trong typescript, kiểm tra khi compile time (code-biên dịch)
export type BookingFormData = z.infer<typeof bookingFormSchema>;