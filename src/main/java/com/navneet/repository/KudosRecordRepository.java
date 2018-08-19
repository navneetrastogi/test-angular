package com.navneet.repository;

import com.navneet.domain.KudosRecord;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the KudosRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KudosRecordRepository extends JpaRepository<KudosRecord, Long> {

}
