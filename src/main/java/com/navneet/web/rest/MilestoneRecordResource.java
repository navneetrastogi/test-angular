package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.MilestoneRecord;
import com.navneet.repository.MilestoneRecordRepository;
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
 * REST controller for managing MilestoneRecord.
 */
@RestController
@RequestMapping("/api")
public class MilestoneRecordResource {

    private final Logger log = LoggerFactory.getLogger(MilestoneRecordResource.class);

    private static final String ENTITY_NAME = "milestoneRecord";

    private final MilestoneRecordRepository milestoneRecordRepository;

    public MilestoneRecordResource(MilestoneRecordRepository milestoneRecordRepository) {
        this.milestoneRecordRepository = milestoneRecordRepository;
    }

    /**
     * POST  /milestone-records : Create a new milestoneRecord.
     *
     * @param milestoneRecord the milestoneRecord to create
     * @return the ResponseEntity with status 201 (Created) and with body the new milestoneRecord, or with status 400 (Bad Request) if the milestoneRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/milestone-records")
    @Timed
    public ResponseEntity<MilestoneRecord> createMilestoneRecord(@RequestBody MilestoneRecord milestoneRecord) throws URISyntaxException {
        log.debug("REST request to save MilestoneRecord : {}", milestoneRecord);
        if (milestoneRecord.getId() != null) {
            throw new BadRequestAlertException("A new milestoneRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MilestoneRecord result = milestoneRecordRepository.save(milestoneRecord);
        return ResponseEntity.created(new URI("/api/milestone-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /milestone-records : Updates an existing milestoneRecord.
     *
     * @param milestoneRecord the milestoneRecord to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated milestoneRecord,
     * or with status 400 (Bad Request) if the milestoneRecord is not valid,
     * or with status 500 (Internal Server Error) if the milestoneRecord couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/milestone-records")
    @Timed
    public ResponseEntity<MilestoneRecord> updateMilestoneRecord(@RequestBody MilestoneRecord milestoneRecord) throws URISyntaxException {
        log.debug("REST request to update MilestoneRecord : {}", milestoneRecord);
        if (milestoneRecord.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MilestoneRecord result = milestoneRecordRepository.save(milestoneRecord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, milestoneRecord.getId().toString()))
            .body(result);
    }

    /**
     * GET  /milestone-records : get all the milestoneRecords.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of milestoneRecords in body
     */
    @GetMapping("/milestone-records")
    @Timed
    public List<MilestoneRecord> getAllMilestoneRecords() {
        log.debug("REST request to get all MilestoneRecords");
        return milestoneRecordRepository.findAll();
    }

    /**
     * GET  /milestone-records/:id : get the "id" milestoneRecord.
     *
     * @param id the id of the milestoneRecord to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the milestoneRecord, or with status 404 (Not Found)
     */
    @GetMapping("/milestone-records/{id}")
    @Timed
    public ResponseEntity<MilestoneRecord> getMilestoneRecord(@PathVariable Long id) {
        log.debug("REST request to get MilestoneRecord : {}", id);
        Optional<MilestoneRecord> milestoneRecord = milestoneRecordRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(milestoneRecord);
    }

    /**
     * DELETE  /milestone-records/:id : delete the "id" milestoneRecord.
     *
     * @param id the id of the milestoneRecord to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/milestone-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteMilestoneRecord(@PathVariable Long id) {
        log.debug("REST request to delete MilestoneRecord : {}", id);

        milestoneRecordRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
