package com.myproject.healthcare_booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DoctorMarkdownDTO {
    private Integer id;
    private Integer doctorId;
    private String contentMarkdown;
    private String doctorName;    // Bổ sung để Python nhét vào đầu mỗi Chunk
    private String specialtyName; // Bổ sung để AI hiểu ngữ cảnh chuyên khoa
    private String description;
}
