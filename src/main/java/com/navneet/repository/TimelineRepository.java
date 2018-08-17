package com.navneet.repository;

import com.navneet.domain.Timeline;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Timeline entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimelineRepository extends JpaRepository<Timeline, Long> {

}
