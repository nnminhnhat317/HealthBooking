package com.myproject.healthcare_booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AIScheduleDTO {
    private String timeSlot;      // Giá trị giờ (VD: "8:00 - 9:00")
    private Integer currentNumber;
    private Integer maxNumber;
    private Boolean isAvailable;  // True nếu còn chỗ
}
