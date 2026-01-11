package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.DTO.DoctorMarkdownDTO;
import com.myproject.healthcare_booking.Entity.Markdown;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MarkdownRepository extends JpaRepository<Markdown, Integer> {

    Optional<Markdown> findByDoctorId(Integer doctorId);

    Optional<Markdown> findByClinicId(Integer clinicId);

    Optional<Markdown> findBySpecialtyId(Integer specialtyId);

    // RAGwMarkdown Specialty
    List<Markdown> findBySpecialtyIdNotNull();
    // RAGwMarkdown Doctor (bao gom specialtyName de co ngu canh lon')
    @Query("SELECT new com.myproject.healthcare_booking.DTO.DoctorMarkdownDTO(" +
            "m.id, m.doctorId, m.contentMarkdown, " + // lay id, doctorId, contentMarkdown tu bang Markdown
            "CONCAT(u.firstName, ' ', u.lastName), " + // lay firsstName, lastName tu bang Users
            "s.name, " + // lay specialtyName tu bang: markdown->users->doctorClinicSpecialty->Specialty
            "m.description) " + // lay description tu bang Markdown
            "FROM Markdown m " +
            "LEFT JOIN Users u ON m.doctorId = u.id " + // join bang Users
            "LEFT JOIN DoctorClinicSpecialty dcs ON u.id = dcs.doctor.id " + // join bang trung gian Dcs
//            "LEFT JOIN Specialty s ON m.specialtyId = s.id " +
            "LEFT JOIN Specialty s ON dcs.specialty.id = s.id " + // Join tiếp sang bảng Specialty để lấy tên
//            "WHERE m.doctorId IS NOT NULL " +
//            "GROUP BY m.id") // Group By để tránh trùng lặp nếu bác sĩ làm ở nhiều nơi
            "WHERE m.doctorId IS NOT NULL") // Group By để tránh trùng lặp nếu bác sĩ làm ở nhiều nơi
    List<DoctorMarkdownDTO> getDoctorMarkdownsForIngest();
    // Luu y 1: van de 1 bac si nhieu chuyen khoa thi JPQL nay kh xu ly vi no kha phuc tap, lenh nay chi lay thang` dau tien gap dc - tuc chi xu ly 1 chuyen khoa dau tien
    // Luu y 2: thuong bac si se gan voi 1 chuyen khoa chinh tai 1 thoi diem trong ngu canh hien thi danh sách, tam thoi lam RAG o muc do co ban
}
