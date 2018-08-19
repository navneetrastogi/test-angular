package com.navneet.repository;

import com.navneet.domain.IllnessRecord;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IllnessRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IllnessRecordRepository extends JpaRepository<IllnessRecord, Long> {

}
