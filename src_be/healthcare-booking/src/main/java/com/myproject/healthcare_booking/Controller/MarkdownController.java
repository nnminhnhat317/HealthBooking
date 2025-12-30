package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.DTO.MarkdownIngestDTO;
import com.myproject.healthcare_booking.Entity.Markdown;
import com.myproject.healthcare_booking.Service.MarkdownService;
import com.myproject.healthcare_booking.Service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // RAGwMarkdown
    // .map(md -> MarkdownIngestDTO.fromEntity(md))
    @GetMapping("/specialty")
    public List<MarkdownIngestDTO> getSpecialtyMarkdown() {
        return markdownService.getAllSpecialtyMarkdown()
                .stream()// Chuyên ve stream de thao tac .map,....
                .map(MarkdownIngestDTO::fromEntity)// Vì Hibernate chỉ làm việc với Entity(Có @Id, @Table, @Entity)
                // nên cần chuyển DTO về lại dạng Entity
                .toList();// ->Thu stream về List<MarkdownIngestDTO>
    }
}

