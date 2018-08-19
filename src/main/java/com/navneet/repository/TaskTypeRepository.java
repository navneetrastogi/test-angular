package com.navneet.repository;

import com.navneet.domain.TaskType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaskType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskTypeRepository extends JpaRepository<TaskType, Long> {

}
