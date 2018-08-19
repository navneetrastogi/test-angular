package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.TaskType;
import com.navneet.repository.TaskTypeRepository;
import com.navneet.web.rest.errors.BadRequestAlertException;
import com.navneet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TaskType.
 */
@RestController
@RequestMapping("/api")
public class TaskTypeResource {

    private final Logger log = LoggerFactory.getLogger(TaskTypeResource.class);

    private static final String ENTITY_NAME = "taskType";

    private final TaskTypeRepository taskTypeRepository;

    public TaskTypeResource(TaskTypeRepository taskTypeRepository) {
        this.taskTypeRepository = taskTypeRepository;
    }

    /**
     * POST  /task-types : Create a new taskType.
     *
     * @param taskType the taskType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taskType, or with status 400 (Bad Request) if the taskType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/task-types")
    @Timed
    public ResponseEntity<TaskType> createTaskType(@RequestBody TaskType taskType) throws URISyntaxException {
        log.debug("REST request to save TaskType : {}", taskType);
        if (taskType.getId() != null) {
            throw new BadRequestAlertException("A new taskType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskType result = taskTypeRepository.save(taskType);
        return ResponseEntity.created(new URI("/api/task-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /task-types : Updates an existing taskType.
     *
     * @param taskType the taskType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taskType,
     * or with status 400 (Bad Request) if the taskType is not valid,
     * or with status 500 (Internal Server Error) if the taskType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/task-types")
    @Timed
    public ResponseEntity<TaskType> updateTaskType(@RequestBody TaskType taskType) throws URISyntaxException {
        log.debug("REST request to update TaskType : {}", taskType);
        if (taskType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaskType result = taskTypeRepository.save(taskType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taskType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /task-types : get all the taskTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of taskTypes in body
     */
    @GetMapping("/task-types")
    @Timed
    public List<TaskType> getAllTaskTypes() {
        log.debug("REST request to get all TaskTypes");
        return taskTypeRepository.findAll();
    }

    /**
     * GET  /task-types/:id : get the "id" taskType.
     *
     * @param id the id of the taskType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taskType, or with status 404 (Not Found)
     */
    @GetMapping("/task-types/{id}")
    @Timed
    public ResponseEntity<TaskType> getTaskType(@PathVariable Long id) {
        log.debug("REST request to get TaskType : {}", id);
        Optional<TaskType> taskType = taskTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taskType);
    }

    /**
     * DELETE  /task-types/:id : delete the "id" taskType.
     *
     * @param id the id of the taskType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/task-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteTaskType(@PathVariable Long id) {
        log.debug("REST request to delete TaskType : {}", id);

        taskTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
