package com.myproject.healthcare_booking.DTO;

import com.myproject.healthcare_booking.Entity.Allcodes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorInfoDTO {
    private Integer id;
    private Allcodes priceId;
    private Allcodes paymentId;
    private Allcodes provinceId;
    private String note;
}
