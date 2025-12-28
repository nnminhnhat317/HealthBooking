package com.myproject.healthcare_booking.Service;

import com.myproject.healthcare_booking.Entity.Markdown;
import com.myproject.healthcare_booking.Repository.MarkdownRepository;
import com.myproject.healthcare_booking.Repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class MarkdownService {

    private final MarkdownRepository markdownRepository;
    public MarkdownService(MarkdownRepository markdownRepository) {
        this.markdownRepository = markdownRepository;
    }

    public Markdown getDoctorMarkdown(Integer doctorId) {
        return markdownRepository.findByDoctorId(doctorId)
                .orElse(null);
    }

    public Markdown getClinicMarkdown(Integer clinicId) {
        return markdownRepository.findByClinicId(clinicId)
                .orElse(null);
    }

    public Markdown getSpecialtyMarkdown(Integer specialtyId) {
        return markdownRepository.findBySpecialtyId(specialtyId)
                .orElse(null);
    }
}

