package com.myproject.healthcare_booking.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private String gender;
    private String phoneNumber;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String image; // duong dan luu anh
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id",referencedColumnName = "keyMap", foreignKey = @ForeignKey(name = "FK_user_role"),  nullable = false)
    private Allcodes role;
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id",referencedColumnName = "keyMap", foreignKey = @ForeignKey(name = "FK_user_position"))
    private Allcodes position;

    @OneToOne(mappedBy = "doctor", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("doctor")
    private DoctorInfo doctorInfor;

    @OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("doctor")
    private List<DoctorClinicSpecialty> doctorClinicSpecialties;

    // 2 truong duoi chi them neu muon truy xuat nguoc danh sach booking (Chi can khi làm phia Doctor va User)
//    @OneToMany(mappedBy = "doctor")
//    private List<Booking> doctorBookings;
//    @OneToMany(mappedBy = "patient")
//    private List<Booking> patientBookings;
}
