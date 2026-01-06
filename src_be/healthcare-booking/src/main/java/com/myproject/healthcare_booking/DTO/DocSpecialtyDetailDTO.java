package com.myproject.healthcare_booking.DTO;

import com.myproject.healthcare_booking.Entity.Allcodes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocSpecialtyDetailDTO {// bang phụ: tra ve thong tin bac si, tu` do render danh sach bac si theo chuyen khoa
    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String gender;
    private String phoneNumber;
    private String image;
    private Allcodes role;
    private Allcodes position;

    private DoctorInfoDTO doctorInfo;
}
