package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.ActivityType;
import com.navneet.repository.ActivityTypeRepository;
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
 * REST controller for managing ActivityType.
 */
@RestController
@RequestMapping("/api")
public class ActivityTypeResource {

    private final Logger log = LoggerFactory.getLogger(ActivityTypeResource.class);

    private static final String ENTITY_NAME = "activityType";

    private final ActivityTypeRepository activityTypeRepository;

    public ActivityTypeResource(ActivityTypeRepository activityTypeRepository) {
        this.activityTypeRepository = activityTypeRepository;
    }

    /**
     * POST  /activity-types : Create a new activityType.
     *
     * @param activityType the activityType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new activityType, or with status 400 (Bad Request) if the activityType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/activity-types")
    @Timed
    public ResponseEntity<ActivityType> createActivityType(@RequestBody ActivityType activityType) throws URISyntaxException {
        log.debug("REST request to save ActivityType : {}", activityType);
        if (activityType.getId() != null) {
            throw new BadRequestAlertException("A new activityType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ActivityType result = activityTypeRepository.save(activityType);
        return ResponseEntity.created(new URI("/api/activity-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /activity-types : Updates an existing activityType.
     *
     * @param activityType the activityType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated activityType,
     * or with status 400 (Bad Request) if the activityType is not valid,
     * or with status 500 (Internal Server Error) if the activityType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/activity-types")
    @Timed
    public ResponseEntity<ActivityType> updateActivityType(@RequestBody ActivityType activityType) throws URISyntaxException {
        log.debug("REST request to update ActivityType : {}", activityType);
        if (activityType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ActivityType result = activityTypeRepository.save(activityType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, activityType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /activity-types : get all the activityTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of activityTypes in body
     */
    @GetMapping("/activity-types")
    @Timed
    public List<ActivityType> getAllActivityTypes() {
        log.debug("REST request to get all ActivityTypes");
        return activityTypeRepository.findAll();
    }

    /**
     * GET  /activity-types/:id : get the "id" activityType.
     *
     * @param id the id of the activityType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the activityType, or with status 404 (Not Found)
     */
    @GetMapping("/activity-types/{id}")
    @Timed
    public ResponseEntity<ActivityType> getActivityType(@PathVariable Long id) {
        log.debug("REST request to get ActivityType : {}", id);
        Optional<ActivityType> activityType = activityTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(activityType);
    }

    /**
     * DELETE  /activity-types/:id : delete the "id" activityType.
     *
     * @param id the id of the activityType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/activity-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteActivityType(@PathVariable Long id) {
        log.debug("REST request to delete ActivityType : {}", id);

        activityTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
