package com.myproject.healthcare_booking.Service;

import com.myproject.healthcare_booking.DTO.AIScheduleDTO;
import com.myproject.healthcare_booking.DTO.ScheduleRequestDTO;
import com.myproject.healthcare_booking.Entity.Schedule;
import com.myproject.healthcare_booking.Repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIToolService {
    private final ScheduleRepository scheduleRepository;
    public AIToolService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<AIScheduleDTO> getDoctorSchedules(ScheduleRequestDTO request) {
        try {
            // 1. Chuyển đổi String date -> LocalDate
            LocalDate localDate = LocalDate.parse(request.getDate());

            // 2. Gọi DB
            List<Schedule> schedules = scheduleRepository.findByDoctorIdAndDate(
                    request.getDoctorId(),
                    localDate
            );

            // 3. Convert Entity -> DTO
            return schedules.stream().map(s -> {
                // Lấy giá trị giờ từ bảng Allcodes (biến time)
                String timeValue = "Không xác định";
                if (s.getTime() != null) {
                    timeValue = s.getTime().getValue();
                }

                // Kiểm tra còn chỗ không
                boolean isAvailable = s.getCurrentNumber() < s.getMaxNumber();

                return new AIScheduleDTO(
                        timeValue,
                        s.getCurrentNumber(),
                        s.getMaxNumber(),
                        isAvailable
                );
            }).collect(Collectors.toList());

        } catch (Exception e) {
            // Log lỗi nếu parse ngày sai
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
