package com.myproject.healthcare_booking.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "markdown")
public class Markdown {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer doctorId;
    private Integer clinicId;
    private Integer specialtyId;

    @Lob
    private String contentMarkdown;

    @Lob
    private String contentHtml;

    private String description;
}
