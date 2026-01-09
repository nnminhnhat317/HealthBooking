package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.DTO.BookingRequestDTO;
import com.myproject.healthcare_booking.Service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/booking")
public class BookingController {
    private BookingService bookingService;
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/book-appointment")
    public ResponseEntity<String> postBooking(@RequestBody BookingRequestDTO request) {
        try {
            bookingService.createBooking(request);
            return ResponseEntity.ok("Đặt lịch thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi Controller đặt lịch: " + e.getMessage());
        }
    }
}
