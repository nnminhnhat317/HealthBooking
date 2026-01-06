package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.DTO.DocSpecialtyDetailDTO;
import com.myproject.healthcare_booking.DTO.SpecialtyDetailDTO;
import com.myproject.healthcare_booking.Service.DoctorClinicSpecialtyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/dcs")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorClinicSpecialtyController {
    private final DoctorClinicSpecialtyService dcsService;

    public DoctorClinicSpecialtyController(DoctorClinicSpecialtyService specialtyService) {
        this.dcsService = specialtyService;
    }

    // old, khong co thong tin name, address,.. cua bang specialty
    @GetMapping("specialty/{id}")
    public ResponseEntity<?> getDoctorsBySpecialty(@PathVariable Integer id) {
        List<DocSpecialtyDetailDTO> data = dcsService.getDoctorsBySpecialty(id);
        return ResponseEntity.ok(data);
    }
    // new: bo sung them thong tin của specialty. Lay danh sach cac bac si va thong tin chuyen khoa
    @GetMapping("specialty-list-doctor/{id}")
    public ResponseEntity<SpecialtyDetailDTO> getDetail(@PathVariable Integer id) {
        SpecialtyDetailDTO data = dcsService.getSpecialtyDetailById(id);
        if (data == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(data);
    }

}
