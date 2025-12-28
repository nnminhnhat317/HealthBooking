package com.myproject.healthcare_booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorClinicSpecialtyDTO { // kh trả về object clinic và specialty, chỉ trả về column cần
// DTO nay su dung trong DTO tong de tra ve
    private Integer doctorClinicSpecialtyId;
    // column clinic
    private Integer clinicId;
    private String clinicName;
    private String clinicAddress;
    private String clinicImage;
    // image
    // column specialty
    private Integer specialtyId;
    private String specialtyName;
    private String specialtyImage;
}
