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
    private String priceValue;
    private String provinceName;
}
//// SỬ dụng hàm tạo thì tai Repo se co the su dung truc tiep DTO, khong co ham tao thi phai tao new DTO tai Repo
//SELECT new com.myproject.healthcare_booking.DTO.DoctorMarkdownDTO.....
//// ... các trường cũ (id, doctorId, ...)
//    private String priceId;     // Thêm trường này
//    private String provinceId;  // Thêm trường này
//
//    // Cập nhật Constructor để khớp với câu lệnh SELECT new...
//    public DoctorMarkdownDTO(Integer id, Integer doctorId, String contentMarkdown,
//                             String doctorName, String specialtyName, String description,
//                             String priceId, String provinceId) { // <--- Thêm 2 tham số cuối
//        this.id = id;
//        this.doctorId = doctorId;
//        this.contentMarkdown = contentMarkdown;
//        this.doctorName = doctorName;
//        this.specialtyName = specialtyName;
//        this.description = description;
//        this.priceId = priceId;       // Gán giá trị
//        this.provinceId = provinceId; // Gán giá trị
//    }