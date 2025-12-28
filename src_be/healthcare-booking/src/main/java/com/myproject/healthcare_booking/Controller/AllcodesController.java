package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.Entity.Allcodes;
import com.myproject.healthcare_booking.Repository.AllcodesRepository;
import com.myproject.healthcare_booking.Service.AllcodesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/allcodes")
@CrossOrigin(origins = "http://localhost:5173")
public class AllcodesController {
    private final AllcodesService allcodesService;
    public AllcodesController(AllcodesService allcodesService) {
        this.allcodesService = allcodesService;
    }

    @GetMapping("/get-type")
    public List<Allcodes> getAllcodesByType(@RequestParam String type) {
        return allcodesService.getAllByType(type);
    }
}
