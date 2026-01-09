package com.myproject.healthcare_booking.DTO;

import lombok.Data;

@Data
public class BookingRequestDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Integer doctorId;
    private String date; // Định dạng "yyyy-MM-dd"
    private String timeType;
}
