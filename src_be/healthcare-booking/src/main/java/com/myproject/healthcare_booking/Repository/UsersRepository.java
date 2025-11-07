package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String Email);
//    // Lấy user kèm thông tin role (EAGER FETCH hoặc JOIN FETCH)
//    @Query("SELECT u FROM Users u JOIN FETCH u.role WHERE u.email = :email")
//    Optional<Users> findByEmailWithRole(@Param("email") String email);
//
//    // Hoặc chỉ lấy giá trị role (ví dụ: ROLE_ADMIN)
//    @Query("SELECT u.role.keyMap FROM Users u WHERE u.email = :email")
//    Optional<String> findRoleIdByEmail(@Param("email") String email);
//
//    // Hoặc lấy value
//    @Query("SELECT u.role.value FROM Users u WHERE u.email = :email")
//    Optional<String> findRoleValueByEmail(@Param("email") String email);
}   
