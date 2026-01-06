package com.myproject.healthcare_booking.Service;

import com.myproject.healthcare_booking.DTO.DoctorInfoDTO;
import com.myproject.healthcare_booking.DTO.DocSpecialtyDetailDTO;
import com.myproject.healthcare_booking.DTO.SpecialtyDetailDTO;
import com.myproject.healthcare_booking.Entity.DoctorClinicSpecialty;
import com.myproject.healthcare_booking.Entity.DoctorInfo;
import com.myproject.healthcare_booking.Entity.Specialty;
import com.myproject.healthcare_booking.Entity.Users;
import com.myproject.healthcare_booking.Repository.DoctorClinicSpecialtyRepository;
import com.myproject.healthcare_booking.Repository.DoctorInfoRepository;
import com.myproject.healthcare_booking.Repository.SpecialtyRepository;
import com.myproject.healthcare_booking.Repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorClinicSpecialtyService {
    private final DoctorClinicSpecialtyRepository dcsRepository; // Truyen them repo tu dcsRepository
    private final UsersRepository usersRepository;
    private final DoctorInfoRepository diRepository;
    private final SpecialtyRepository specialtyRepository;

    public DoctorClinicSpecialtyService(DoctorClinicSpecialtyRepository dcsRepository,
                        UsersRepository usersRepository,
                        DoctorInfoRepository dinfoRepository,
                        SpecialtyRepository srepo) {
        this.dcsRepository = dcsRepository; // Truyen them repo tu dcsRepository
        this.usersRepository = usersRepository;
        this.diRepository = dinfoRepository; // truyen doctorInfo
        this.specialtyRepository = srepo;
    }
    //old
    public List<DocSpecialtyDetailDTO> getDoctorsBySpecialty(Integer specialtyId) {
        List<Users> doctors = dcsRepository.findDoctorsBySpecialtyId(specialtyId);

        return doctors.stream().map(user -> {
            DocSpecialtyDetailDTO dto = new DocSpecialtyDetailDTO();
            dto.setId(user.getId());
            dto.setEmail(user.getEmail());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setAddress(user.getAddress());
            dto.setPhoneNumber(user.getPhoneNumber());
            dto.setImage(user.getImage());

            // Map DoctorInfo
            if (user.getDoctorInfor() != null) {
                DoctorInfo info = user.getDoctorInfor(); // map entity
                DoctorInfoDTO infoDTO = new DoctorInfoDTO();
                infoDTO.setId(info.getId());
                infoDTO.setNote(info.getNote());
                // Gán trực tiếp đối tượng Allcodes
                infoDTO.setPriceId(info.getPriceId());
                infoDTO.setProvinceId(info.getProvinceId());
                infoDTO.setPaymentId(info.getPaymentId());

                dto.setDoctorInfo(infoDTO);
            }
            return dto;
        }).collect(Collectors.toList());
    }
    // new
    public SpecialtyDetailDTO getSpecialtyDetailById(Integer specialtyId) {
        List<DoctorClinicSpecialty> dcsList = dcsRepository.findAllBySpecialtyId(specialtyId);

        if (dcsList.isEmpty()) {
            return null; // Hoặc ném Exception tùy bạn xử lý
        }

        // 1. Khởi tạo SpecialtyDetailDTO từ thông tin của bản ghi đầu tiên
        Specialty specialty = dcsList.get(0).getSpecialty();
        SpecialtyDetailDTO response = new SpecialtyDetailDTO();
        response.setId(specialty.getId());
        response.setName(specialty.getName());
        response.setDescription(specialty.getDescription());
        response.setImage(specialty.getImage());

        // 2. Map danh sách bác sĩ
        List<DocSpecialtyDetailDTO> doctorDTOs = dcsList.stream().map(dcs -> {
            Users user = dcs.getDoctor();
            DocSpecialtyDetailDTO docDto = new DocSpecialtyDetailDTO();

            // Map thông tin cơ bản từ Users
            docDto.setId(user.getId());
            docDto.setEmail(user.getEmail());
            docDto.setFirstName(user.getFirstName());
            docDto.setLastName(user.getLastName());
            docDto.setAddress(user.getAddress());
            docDto.setGender(user.getGender());
            docDto.setPhoneNumber(user.getPhoneNumber());
            docDto.setImage(user.getImage());
            docDto.setRole(user.getRole());         // Gán đối tượng Allcodes
            docDto.setPosition(user.getPosition()); // Gán đối tượng Allcodes

            // Map thông tin từ DoctorInfo
            if (user.getDoctorInfor() != null) {
                DoctorInfo info = user.getDoctorInfor();
                DoctorInfoDTO infoDto = new DoctorInfoDTO();
                infoDto.setId(info.getId());
                infoDto.setNote(info.getNote());
                infoDto.setPriceId(info.getPriceId());       // Gán đối tượng Allcodes
                infoDto.setProvinceId(info.getProvinceId()); // Gán đối tượng Allcodes
                infoDto.setPaymentId(info.getPaymentId());   // Gán đối tượng Allcodes

                docDto.setDoctorInfo(infoDto);
            }

            return docDto;
        }).collect(Collectors.toList());

        response.setDoctors(doctorDTOs);
        return response;
    }


}
