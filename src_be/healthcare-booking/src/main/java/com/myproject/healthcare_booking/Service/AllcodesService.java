package com.myproject.healthcare_booking.Service;

import com.myproject.healthcare_booking.Entity.Allcodes;
import com.myproject.healthcare_booking.Repository.AllcodesRepository;
import com.myproject.healthcare_booking.Repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllcodesService {

    private final AllcodesRepository allcodesRepository;
    public AllcodesService(AllcodesRepository allcodesRepository) {
        this.allcodesRepository = allcodesRepository;
    }

    public List<Allcodes> getAllByType(String type) {
        return allcodesRepository.findByType(type);
    }
}
