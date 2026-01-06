package com.myproject.healthcare_booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialtyDetailDTO { // trả về tổng có thông tin chuyen khoa va thong tin bac si
    private Integer id;
    private String name;
    private String description;
    private String image;
    private List<DocSpecialtyDetailDTO> doctors;
}
