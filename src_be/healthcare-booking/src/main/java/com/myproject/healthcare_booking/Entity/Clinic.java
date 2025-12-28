package com.myproject.healthcare_booking.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "clinic")
@JsonIgnoreProperties({"doctorClinicSpecialties"})
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String address;
    private String description;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String image;

    @OneToMany(mappedBy = "clinic")
    private List<DoctorClinicSpecialty> doctorClinicSpecialties;
}
