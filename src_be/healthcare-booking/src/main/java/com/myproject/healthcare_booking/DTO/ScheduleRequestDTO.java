package com.myproject.healthcare_booking.DTO;

import lombok.Data;

@Data //su dung cho schedule trong AI khi goi tool lich kham
public class ScheduleRequestDTO {
    private Integer doctorId;
    private String date; // Nhận chuỗi "yyyy-MM-dd" từ Python
}
