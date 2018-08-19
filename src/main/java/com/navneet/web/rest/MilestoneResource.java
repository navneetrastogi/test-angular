package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.Milestone;
import com.navneet.repository.MilestoneRepository;
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
 * REST controller for managing Milestone.
 */
@RestController
@RequestMapping("/api")
public class MilestoneResource {

    private final Logger log = LoggerFactory.getLogger(MilestoneResource.class);

    private static final String ENTITY_NAME = "milestone";

    private final MilestoneRepository milestoneRepository;

    public MilestoneResource(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    /**
     * POST  /milestones : Create a new milestone.
     *
     * @param milestone the milestone to create
     * @return the ResponseEntity with status 201 (Created) and with body the new milestone, or with status 400 (Bad Request) if the milestone has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/milestones")
    @Timed
    public ResponseEntity<Milestone> createMilestone(@RequestBody Milestone milestone) throws URISyntaxException {
        log.debug("REST request to save Milestone : {}", milestone);
        if (milestone.getId() != null) {
            throw new BadRequestAlertException("A new milestone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Milestone result = milestoneRepository.save(milestone);
        return ResponseEntity.created(new URI("/api/milestones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /milestones : Updates an existing milestone.
     *
     * @param milestone the milestone to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated milestone,
     * or with status 400 (Bad Request) if the milestone is not valid,
     * or with status 500 (Internal Server Error) if the milestone couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/milestones")
    @Timed
    public ResponseEntity<Milestone> updateMilestone(@RequestBody Milestone milestone) throws URISyntaxException {
        log.debug("REST request to update Milestone : {}", milestone);
        if (milestone.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Milestone result = milestoneRepository.save(milestone);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, milestone.getId().toString()))
            .body(result);
    }

    /**
     * GET  /milestones : get all the milestones.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of milestones in body
     */
    @GetMapping("/milestones")
    @Timed
    public List<Milestone> getAllMilestones() {
        log.debug("REST request to get all Milestones");
        return milestoneRepository.findAll();
    }

    /**
     * GET  /milestones/:id : get the "id" milestone.
     *
     * @param id the id of the milestone to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the milestone, or with status 404 (Not Found)
     */
    @GetMapping("/milestones/{id}")
    @Timed
    public ResponseEntity<Milestone> getMilestone(@PathVariable Long id) {
        log.debug("REST request to get Milestone : {}", id);
        Optional<Milestone> milestone = milestoneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(milestone);
    }

    /**
     * DELETE  /milestones/:id : delete the "id" milestone.
     *
     * @param id the id of the milestone to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/milestones/{id}")
    @Timed
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long id) {
        log.debug("REST request to delete Milestone : {}", id);

        milestoneRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
