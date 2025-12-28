package com.myproject.healthcare_booking.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "specialty")
@JsonIgnoreProperties({"doctorClinicSpecialties"})
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
