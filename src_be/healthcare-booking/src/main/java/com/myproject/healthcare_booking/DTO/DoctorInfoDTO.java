package com.myproject.healthcare_booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorInfoDTO {
    private Integer id;
    private String priceId;
    private String paymentId;
    private String provinceId;
    private String note;
}
