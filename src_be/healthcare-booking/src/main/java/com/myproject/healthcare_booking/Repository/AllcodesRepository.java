package com.myproject.healthcare_booking.Repository;

import com.myproject.healthcare_booking.Entity.Allcodes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AllcodesRepository extends JpaRepository<Allcodes, Integer> {

    List<Allcodes> findByType(String type);
    Optional<Allcodes> findByKeyMap(String keyMap);
}
