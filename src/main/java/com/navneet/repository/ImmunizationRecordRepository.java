package com.navneet.repository;

import com.navneet.domain.ImmunizationRecord;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ImmunizationRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImmunizationRecordRepository extends JpaRepository<ImmunizationRecord, Long> {

}
