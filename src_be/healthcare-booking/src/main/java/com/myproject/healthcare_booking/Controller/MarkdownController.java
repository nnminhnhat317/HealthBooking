package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.Entity.Markdown;
import com.myproject.healthcare_booking.Service.MarkdownService;
import com.myproject.healthcare_booking.Service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/markdown")
@CrossOrigin(origins = "http://localhost:5173")
public class MarkdownController {

    private final MarkdownService markdownService;
    public MarkdownController(MarkdownService markdownService) {
        this.markdownService = markdownService;
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<Markdown> getDoctorMarkdown(@PathVariable Integer doctorId) {
        return ResponseEntity.ok(
                markdownService.getDoctorMarkdown(doctorId)
        );
    }

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<?> getClinicMarkdown(@PathVariable Integer clinicId) {
        return ResponseEntity.ok(
                markdownService.getClinicMarkdown(clinicId)
        );
    }

    @GetMapping("/specialty/{specialtyId}")
    public ResponseEntity<?> getSpecialtyMarkdown(@PathVariable Integer specialtyId) {
        return ResponseEntity.ok(
                markdownService.getSpecialtyMarkdown(specialtyId)
        );
    }
}

