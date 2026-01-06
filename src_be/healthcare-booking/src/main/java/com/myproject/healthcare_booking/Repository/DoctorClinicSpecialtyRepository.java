package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.DTO.DoctorClinicSpecialtyDTO;
import com.myproject.healthcare_booking.Entity.DoctorClinicSpecialty;
import com.myproject.healthcare_booking.Entity.Specialty;
import com.myproject.healthcare_booking.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorClinicSpecialtyRepository
        extends JpaRepository<DoctorClinicSpecialty, Integer> {
    // detail doctor
    @Query("""
        SELECT new com.myproject.healthcare_booking.DTO.DoctorClinicSpecialtyDTO(
            dcs.id,
            c.id,
            c.name,
            c.address,
            c.image,
            s.id,
            s.name,
            s.image
        )
        FROM DoctorClinicSpecialty dcs
        JOIN dcs.clinic c
        JOIN dcs.specialty s
        WHERE dcs.doctor.id = :doctorId
    """)
    List<DoctorClinicSpecialtyDTO> findDoctorClinicsSpecialtys(Integer doctorId);

    // detail specialty
    @Query("SELECT DISTINCT u FROM Users u " +
            "JOIN u.doctorClinicSpecialties dcs " +
            "JOIN FETCH u.doctorInfor di " + // Fetch để lấy luôn thông tin info
            "LEFT JOIN FETCH di.priceId " +   // Fetch các bảng Allcodes nếu cần
            "LEFT JOIN FETCH di.provinceId " +
            "LEFT JOIN FETCH di.paymentId " +
            "WHERE dcs.specialty.id = :specialtyId")
    List<Users> findDoctorsBySpecialtyId(Integer specialtyId);

    // new detail specialty
    @Query("SELECT dcs FROM DoctorClinicSpecialty dcs " +
            "JOIN FETCH dcs.specialty s " +
            "JOIN FETCH dcs.doctor u " +
            "LEFT JOIN FETCH u.role r " +      // Ép lấy Role
            "LEFT JOIN FETCH u.position p " +  // Ép lấy Position
            "LEFT JOIN FETCH u.doctorInfor di " +
            "LEFT JOIN FETCH di.priceId " +
            "LEFT JOIN FETCH di.provinceId " +
            "LEFT JOIN FETCH di.paymentId " +
            "WHERE s.id = :specialtyId")
    List<DoctorClinicSpecialty> findAllBySpecialtyId(@Param("specialtyId") Integer specialtyId);
    
}
