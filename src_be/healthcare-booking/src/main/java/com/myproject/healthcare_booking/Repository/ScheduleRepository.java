package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.Entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    List<Schedule> findByDoctor_IdAndDate(
            Integer doctorId,
            LocalDate date
    );
}

