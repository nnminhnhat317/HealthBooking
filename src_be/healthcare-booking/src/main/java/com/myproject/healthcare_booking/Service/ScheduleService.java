package com.myproject.healthcare_booking.Service;

import com.myproject.healthcare_booking.Entity.Schedule;
import com.myproject.healthcare_booking.Repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<Schedule> getScheduleByDate(Integer doctorId,LocalDate date) {
        return scheduleRepository.findByDoctor_IdAndDate(doctorId, date);
    }
}
