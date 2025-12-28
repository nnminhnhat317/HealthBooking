package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.Entity.Markdown;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarkdownRepository extends JpaRepository<Markdown, Integer> {

    Optional<Markdown> findByDoctorId(Integer doctorId);

    Optional<Markdown> findByClinicId(Integer clinicId);

    Optional<Markdown> findBySpecialtyId(Integer specialtyId);
}
