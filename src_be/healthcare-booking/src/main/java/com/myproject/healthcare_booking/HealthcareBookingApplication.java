package com.myproject.healthcare_booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class HealthcareBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthcareBookingApplication.class, args);
		System.out.println("Hello World!");
		//Tạo mật khẩu cho admin và encode với bcryt để lưu vào db
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		// Mật khẩu gốc
		String usernameAd = "admin@gmail.com";
		String rawPasswordAd = "Admin@123";
		System.out.println("Tài khoản admin gốc: " + usernameAd +" "+ rawPasswordAd);
		// Mã hóa bằng BCrypt
//		String encodedPasswordAd = encoder.encode(rawPasswordAd);
//		System.out.println("Mật khẩu admin đã mã hóa ngẫu nhiên: " + encodedPasswordAd);
	}

}
