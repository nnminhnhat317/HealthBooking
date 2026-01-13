package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.Entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    // Goi Doctor nhu la mot cot doi duong User doctor
    List<Schedule> findByDoctor_IdAndDate(
            Integer doctorId,
            LocalDate date
    );
    // Goi Doctor nhu la mot cot binh thuong String doctor
    // Dung cho API post tu PythonAI
    List<Schedule> findByDoctorIdAndDate(Integer doctorId, LocalDate date);
}

