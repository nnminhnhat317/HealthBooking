package com.myproject.healthcare_booking.DTO;

import com.myproject.healthcare_booking.Entity.Allcodes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDetailResponse { // DTO tổng de tra ve cho frontend

    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String gender;
    private Allcodes role;
    private String phoneNumber;
    private Allcodes position;
    private String image;

    private DoctorInfoDTO doctorInfo;
    private List<DoctorClinicSpecialtyDTO> clinics;
}
