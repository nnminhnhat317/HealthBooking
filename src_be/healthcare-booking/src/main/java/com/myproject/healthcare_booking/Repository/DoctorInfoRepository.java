package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.DTO.DoctorInfoDTO;
import com.myproject.healthcare_booking.Entity.DoctorInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorInfoRepository extends JpaRepository<DoctorInfo, Integer> {
    @Query("""
        SELECT new com.myproject.healthcare_booking.DTO.DoctorInfoDTO(
            di.id,
            di.priceId,
            di.paymentId,
            di.provinceId,
            di.note
        )
        FROM DoctorInfo di
        WHERE di.doctor.id = :doctorId
    """)
    DoctorInfoDTO findDoctorInfo(Integer doctorId);
}
