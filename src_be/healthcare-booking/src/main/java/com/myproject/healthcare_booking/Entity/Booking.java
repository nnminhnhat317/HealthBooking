package com.myproject.healthcare_booking.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", referencedColumnName = "keyMap", nullable = false)
    private Allcodes status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Users doctor;

    // Liên kết với bảng Users (Bệnh nhân)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Users patient;

    @Column(nullable = false)
    private LocalDate date;

    // Liên kết với bảng Allcodes cho khung giờ (time_type)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "time_type", referencedColumnName = "keyMap", nullable = false)
    private Allcodes timeType;

//    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

//    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
