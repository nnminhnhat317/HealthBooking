package com.myproject.healthcare_booking.Service;

import com.myproject.healthcare_booking.DTO.DoctorClinicSpecialtyDTO;
import com.myproject.healthcare_booking.DTO.DoctorDetailResponse;
import com.myproject.healthcare_booking.DTO.DoctorInfoDTO;
import com.myproject.healthcare_booking.Entity.Users;
import com.myproject.healthcare_booking.Repository.DoctorClinicSpecialtyRepository;
import com.myproject.healthcare_booking.Repository.DoctorInfoRepository;
import com.myproject.healthcare_booking.Repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    private final UsersRepository usersRepository;
    private final DoctorClinicSpecialtyRepository dcsRepository; // Truyen them repo tu dcsRepository
    private final DoctorInfoRepository diRepository;

    public UsersService(UsersRepository usersRepository,
                        DoctorClinicSpecialtyRepository dcsRepository,
                        DoctorInfoRepository dinfoRepository) {
        this.usersRepository = usersRepository;
        this.dcsRepository = dcsRepository; // Truyen them repo tu dcsRepository
        this.diRepository = dinfoRepository; // truyen doctorInfo
    }

    // Trả ve reponse ghep tu nhieu thanh phan, và tu lop DTO, lop nay la su ket hop 2 Repo User va dcs
    public DoctorDetailResponse getDoctorDetail(Integer doctorId) {

        Users user = usersRepository.findDoctorById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        DoctorInfoDTO doctorInfo =
                diRepository.findDoctorInfo(doctorId);

        List<DoctorClinicSpecialtyDTO> dcs =
                dcsRepository.findDoctorClinicsSpecialtys(doctorId);

        return new DoctorDetailResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddress(),
                user.getGender(),
                user.getRole(),
                user.getPhoneNumber(),
                user.getPosition(),
                user.getImage(),
                doctorInfo,
                dcs

        );
    }

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    //Xu ly anh upload
    public void updateAvatar(Integer userId, String avatarPath) {
        Users user = usersRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setImage(avatarPath);
        usersRepository.save(user);
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

    // Lấy User trả về DoctorInfo và DoctorClinicSpectialty (lỗi)
//    @Transactional(readOnly = true) //đảm bảo Hibernate không lỗi khi serialize entity
//    public Users getUserById(Integer id) {
//        return usersRepository.findUserDetailById(id)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//    }

}
