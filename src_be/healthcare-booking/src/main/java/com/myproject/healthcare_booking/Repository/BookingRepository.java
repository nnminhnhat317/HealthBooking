package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
}
