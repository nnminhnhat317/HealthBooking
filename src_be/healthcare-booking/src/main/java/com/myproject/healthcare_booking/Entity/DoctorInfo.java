package com.myproject.healthcare_booking.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "doctor_infor")
public class DoctorInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id",
            nullable = false,
            unique = true,
            foreignKey = @ForeignKey(name = "FK_doctorinfo_user"))
    @JsonIgnoreProperties({"doctorInfor", "doctorClinicSpecialties"})
    private Users doctor;

    @ManyToOne //(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_id",referencedColumnName = "keyMap")
    private Allcodes priceId;

    @ManyToOne //(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_id",referencedColumnName = "keyMap")
    private Allcodes provinceId;

    @ManyToOne //(fetch = FetchType.EAGER)
    @JoinColumn(name = "payment_id",referencedColumnName = "keyMap")
    private Allcodes paymentId;

    private String note;
    private Integer count;

}
