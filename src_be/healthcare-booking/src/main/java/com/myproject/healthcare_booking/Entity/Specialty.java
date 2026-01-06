package com.myproject.healthcare_booking.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "specialty")
@Data
@JsonIgnoreProperties({"doctorClinicSpecialties"}) // tránh viec tra ve vòng lap vo han vi quan he 2 chieu`
//bo qua field doctorClinicSpecialties khi tra JSON Specialty
public class Specialty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String image;

    @OneToMany(mappedBy = "specialty")
    private List<DoctorClinicSpecialty> doctorClinicSpecialties;
}
