package com.myproject.healthcare_booking.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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

    @Column(name = "price_id")
    private String priceId;

    @Column(name = "province_id")
    private String provinceId;

    @Column(name = "payment_id")
    private String paymentId;

    private String note;
    private Integer count;

}
