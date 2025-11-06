package com.myproject.healthcare_booking.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "allcodes", uniqueConstraints =
        {@UniqueConstraint(columnNames = {"key_map", "type"})}
)
public class Allcodes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String keyMap;
    private String type;
    private String value;
}

