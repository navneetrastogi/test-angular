package com.navneet.repository;

import com.navneet.domain.StudentProfile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StudentProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {

}
