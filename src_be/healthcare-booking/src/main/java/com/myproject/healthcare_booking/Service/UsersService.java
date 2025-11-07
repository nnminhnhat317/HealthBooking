package com.myproject.healthcare_booking.Service;

import com.myproject.healthcare_booking.Entity.Users;
import com.myproject.healthcare_booking.Repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    private final UsersRepository usersRepository;
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Users getUsersById(Integer id) {
        return usersRepository.findById(id).orElseThrow(() -> new RuntimeException("Users not found"));
    }

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users createUsers(Users users) {
        return usersRepository.save(users);
    }
//    public Users updateUsers(Integer id, Users UsersDetails) {
//        Users Users = UsersRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Users not found with id: " + id));
//        Users.setFirstName(UsersDetails.getFirstName());
//        Users.setLastName(UsersDetails.getLastName());
//        Users.setDateOfBirth(UsersDetails.getDateOfBirth());
//        Users.setGender(UsersDetails.getGender());
//        Users.setPhone(UsersDetails.getPhone());
//        Users.setEmail(UsersDetails.getEmail());
//        Users.setDepartmentId(UsersDetails.getDepartmentId());
//        Users.setPosition(UsersDetails.getPosition());
//        Users.setHireDate(UsersDetails.getHireDate());
//        return UsersRepository.save(Users);
//    }
//
//    public void deleteUsers(Integer id) {
//        if (!UsersRepository.existsById(id)) {
//            throw new RuntimeException("Users not found " + id);
//        }
//        UsersRepository.deleteById(id);
//    }
}
