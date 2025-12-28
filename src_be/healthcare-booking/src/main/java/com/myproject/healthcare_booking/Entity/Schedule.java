package com.myproject.healthcare_booking.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "schedule"
//        uniqueConstraints = { //1 bác sĩ – 1 ngày – 1 khung giờ chỉ tồn tại 1 record
//                @UniqueConstraint(columnNames = {"doctor_id", "date", "time_type"})
//        }
        )
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "current_number")
    private Integer currentNumber = 0;

    @Column(name = "max_number", nullable = false)
    private Integer maxNumber;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "time_type",referencedColumnName = "keyMap")
    private Allcodes time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnore
    private Users doctor;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /* ==================== JPA CALLBACK ==================== */

//    @PrePersist
//    protected void onCreate() {
//        this.createdAt = LocalDateTime.now();
//        this.updatedAt = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        this.updatedAt = LocalDateTime.now();
//    }

    /* ==================== BUSINESS LOGIC ==================== */

//    public boolean isAvailable() {
//        return currentNumber < maxNumber;
//    }
}
