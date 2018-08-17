package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.IllnessRecord;
import com.navneet.repository.IllnessRecordRepository;
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
 * REST controller for managing IllnessRecord.
 */
@RestController
@RequestMapping("/api")
public class IllnessRecordResource {

    private final Logger log = LoggerFactory.getLogger(IllnessRecordResource.class);

    private static final String ENTITY_NAME = "illnessRecord";

    private final IllnessRecordRepository illnessRecordRepository;

    public IllnessRecordResource(IllnessRecordRepository illnessRecordRepository) {
        this.illnessRecordRepository = illnessRecordRepository;
    }

    /**
     * POST  /illness-records : Create a new illnessRecord.
     *
     * @param illnessRecord the illnessRecord to create
     * @return the ResponseEntity with status 201 (Created) and with body the new illnessRecord, or with status 400 (Bad Request) if the illnessRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/illness-records")
    @Timed
    public ResponseEntity<IllnessRecord> createIllnessRecord(@RequestBody IllnessRecord illnessRecord) throws URISyntaxException {
        log.debug("REST request to save IllnessRecord : {}", illnessRecord);
        if (illnessRecord.getId() != null) {
            throw new BadRequestAlertException("A new illnessRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IllnessRecord result = illnessRecordRepository.save(illnessRecord);
        return ResponseEntity.created(new URI("/api/illness-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /illness-records : Updates an existing illnessRecord.
     *
     * @param illnessRecord the illnessRecord to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated illnessRecord,
     * or with status 400 (Bad Request) if the illnessRecord is not valid,
     * or with status 500 (Internal Server Error) if the illnessRecord couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/illness-records")
    @Timed
    public ResponseEntity<IllnessRecord> updateIllnessRecord(@RequestBody IllnessRecord illnessRecord) throws URISyntaxException {
        log.debug("REST request to update IllnessRecord : {}", illnessRecord);
        if (illnessRecord.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IllnessRecord result = illnessRecordRepository.save(illnessRecord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, illnessRecord.getId().toString()))
            .body(result);
    }

    /**
     * GET  /illness-records : get all the illnessRecords.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of illnessRecords in body
     */
    @GetMapping("/illness-records")
    @Timed
    public List<IllnessRecord> getAllIllnessRecords() {
        log.debug("REST request to get all IllnessRecords");
        return illnessRecordRepository.findAll();
    }

    /**
     * GET  /illness-records/:id : get the "id" illnessRecord.
     *
     * @param id the id of the illnessRecord to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the illnessRecord, or with status 404 (Not Found)
     */
    @GetMapping("/illness-records/{id}")
    @Timed
    public ResponseEntity<IllnessRecord> getIllnessRecord(@PathVariable Long id) {
        log.debug("REST request to get IllnessRecord : {}", id);
        Optional<IllnessRecord> illnessRecord = illnessRecordRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(illnessRecord);
    }

    /**
     * DELETE  /illness-records/:id : delete the "id" illnessRecord.
     *
     * @param id the id of the illnessRecord to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/illness-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteIllnessRecord(@PathVariable Long id) {
        log.debug("REST request to delete IllnessRecord : {}", id);

        illnessRecordRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
