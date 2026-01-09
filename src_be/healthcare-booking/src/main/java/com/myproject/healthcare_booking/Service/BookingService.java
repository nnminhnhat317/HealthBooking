package com.myproject.healthcare_booking.Service;

import com.myproject.healthcare_booking.DTO.BookingRequestDTO;
import com.myproject.healthcare_booking.Entity.Allcodes;
import com.myproject.healthcare_booking.Entity.Booking;
import com.myproject.healthcare_booking.Entity.Users;
import com.myproject.healthcare_booking.Repository.AllcodesRepository;
import com.myproject.healthcare_booking.Repository.BookingRepository;
import com.myproject.healthcare_booking.Repository.MarkdownRepository;
import com.myproject.healthcare_booking.Repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UsersRepository usersRepository;
    private AllcodesRepository allcodesRepository;
    public BookingService(BookingRepository bookingRepository,
                          UsersRepository usersRepository,
                          AllcodesRepository allcodesRepository) {
        this.bookingRepository = bookingRepository;
        this.usersRepository = usersRepository;
        this.allcodesRepository = allcodesRepository;
    }

    @Transactional
    public void createBooking(BookingRequestDTO request) {
        // 1. Kiểm tra hoặc tạo mới User (Patient)
        Users patient = usersRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    Users newUser = new Users();
                    newUser.setEmail(request.getEmail());
                    newUser.setFirstName(request.getFirstName());
                    newUser.setLastName(request.getLastName());
                    newUser.setPhoneNumber(request.getPhoneNumber());
                    newUser.setPassword("$2a$10$xQhQD1eCa1MaYowxJ2uSw.RlP0mx/PUlDoqt7FIZ3jcNv2F2xEKmy"); // mat khau mac dinh 123456

                    // Gán role mặc định là PATIENT (Giả sử mã keyMap cho Role bệnh nhân là 'R3')
                    Allcodes rolePatient = allcodesRepository.findByKeyMap("R3")
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    newUser.setRole(rolePatient);

                    // Gán position mặc định (nếu cần, ví dụ 'P0' cho None)
//                    Allcodes positionNone = allcodesRepository.findByKeyMap("P0")
//                            .orElseThrow(() -> new RuntimeException("Position not found"));
//                    newUser.setPosition(positionNone);

                    return usersRepository.save(newUser);
                });

        // 2. Lấy status S1 (Lịch hẹn mới)
        Allcodes statusNew = allcodesRepository.findByKeyMap("S1")
                .orElseThrow(() -> new RuntimeException("Status S1 not found"));

        // 3. Lấy timeType từ Allcodes
        Allcodes timeType = allcodesRepository.findByKeyMap(request.getTimeType())
                .orElseThrow(() -> new RuntimeException("Time type not found"));

        // 4. Tạo thực thể Booking
        Booking booking = new Booking();
        booking.setPatient(patient);
        booking.setStatus(statusNew);
        booking.setTimeType(timeType);
        booking.setDate(LocalDate.parse(request.getDate()));

        // Gán bác sĩ (Giả định bạn đã có doctorId từ frontend)
        Users doctor = usersRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        booking.setDoctor(doctor);

        // 5. Lưu vào database
        bookingRepository.save(booking);
    }
}
