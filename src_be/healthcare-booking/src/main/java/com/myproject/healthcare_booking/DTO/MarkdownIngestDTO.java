package com.myproject.healthcare_booking.DTO;

import com.myproject.healthcare_booking.Entity.Markdown;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarkdownIngestDTO {

    private Integer id;
    private Integer doctorId;
    private Integer clinicId;
    private Integer specialtyId;
    private String contentMarkdown;
//    private LocalDateTime updatedAt;
    public static MarkdownIngestDTO fromEntity(Markdown md) {
        return new MarkdownIngestDTO(
                md.getId(),
                md.getDoctorId(),
                md.getClinicId(),
                md.getSpecialtyId(),
                md.getContentMarkdown()
//                md.getUpdatedAt()
        );
    }
}
