package com.myproject.healthcare_booking.Entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

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
    private String image;
    @ManyToOne //(fetch = FetchType.LAZY)
//    name = "role_id",
    @JoinColumn(name = "role_id",referencedColumnName = "keyMap", foreignKey = @ForeignKey(name = "FK_user_role"))
    private Allcodes role;
    @ManyToOne //(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id",referencedColumnName = "keyMap", foreignKey = @ForeignKey(name = "FK_user_position"))
    private Allcodes position;
}
