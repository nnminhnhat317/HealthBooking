package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.Entity.Users;
import com.myproject.healthcare_booking.JWTconfig.JwtUtils;
import com.myproject.healthcare_booking.Repository.UsersRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {

    private final UsersRepository userRepository;
    private final JwtUtils jwtUtils;
    public UsersController(UsersRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    //Nhận dữ liệu JSON từ request body dưới dạng Map<String, String> vì nguyên tắc bảo mật dùng DTO
    //DTO chỉ duy nhất cung cấp username và password, field khác kh cần
    //Nếu dùng Entity Users thì vi phạm ngtac và lỗi mapping khi không liệt kê toàn bo filed của User
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        //lấy email,password tu request body
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        // lấy email tu db theo email cua request
        Users userdb = userRepository.findByEmail(email);
        // so sanh 2 password thong qua bcrypt
        if (userdb != null && passwordEncoder.matches(password, userdb.getPassword())) {
            //generate token
            String token = jwtUtils.generateToken(userdb.getEmail(), userdb.getRole().getKeyMap());
            //Trả về JWT token dưới dạng JSON cho client qua reponse
            Map<String, Object> response = new HashMap<>();
            response.put("email", userdb.getEmail());
            response.put("roleId", userdb.getRole().getKeyMap());
            response.put("token", token);
            ResponseEntity.ok().body(response);
            return ResponseEntity.ok().body(response);
        } else {
            //trả về mã lỗi HTTP 401: nhưng cần DTO
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
        }
    }
}

