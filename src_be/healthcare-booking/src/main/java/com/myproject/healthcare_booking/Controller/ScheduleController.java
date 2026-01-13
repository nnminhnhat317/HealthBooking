package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.DTO.AIScheduleDTO;
import com.myproject.healthcare_booking.DTO.ScheduleRequestDTO;
import com.myproject.healthcare_booking.Entity.Schedule;
import com.myproject.healthcare_booking.Service.ScheduleService;
import com.myproject.healthcare_booking.Service.UsersService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/schedule")
@CrossOrigin(origins = "http://localhost:5173")
public class ScheduleController {
    private final ScheduleService scheduleService;
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/doctor-date")
    public List<Schedule> getScheduleByDate(
            @RequestParam Integer doctorId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return scheduleService.getScheduleByDate(doctorId, date);
    }
}
