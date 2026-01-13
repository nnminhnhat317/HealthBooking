package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.DTO.AIScheduleDTO;
import com.myproject.healthcare_booking.Service.AIToolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.myproject.healthcare_booking.DTO.ScheduleRequestDTO;

import java.util.List;

@RestController
@RequestMapping("/ai")
public class AIToolController {

    private AIToolService aiToolService;
    public AIToolController(AIToolService aiToolService) {
        this.aiToolService = aiToolService;
    }

    // Định nghĩa POST để khớp với Python requests.post
    @PostMapping("/check-schedule")
    public ResponseEntity<List<AIScheduleDTO>> checkSchedule(@RequestBody ScheduleRequestDTO request) {
        List<AIScheduleDTO> result = aiToolService.getDoctorSchedules(request);
        return ResponseEntity.ok(result);
    }
}
