package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.ImmunizationRecord;
import com.navneet.repository.ImmunizationRecordRepository;
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
 * REST controller for managing ImmunizationRecord.
 */
@RestController
@RequestMapping("/api")
public class ImmunizationRecordResource {

    private final Logger log = LoggerFactory.getLogger(ImmunizationRecordResource.class);

    private static final String ENTITY_NAME = "immunizationRecord";

    private final ImmunizationRecordRepository immunizationRecordRepository;

    public ImmunizationRecordResource(ImmunizationRecordRepository immunizationRecordRepository) {
        this.immunizationRecordRepository = immunizationRecordRepository;
    }

    /**
     * POST  /immunization-records : Create a new immunizationRecord.
     *
     * @param immunizationRecord the immunizationRecord to create
     * @return the ResponseEntity with status 201 (Created) and with body the new immunizationRecord, or with status 400 (Bad Request) if the immunizationRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/immunization-records")
    @Timed
    public ResponseEntity<ImmunizationRecord> createImmunizationRecord(@RequestBody ImmunizationRecord immunizationRecord) throws URISyntaxException {
        log.debug("REST request to save ImmunizationRecord : {}", immunizationRecord);
        if (immunizationRecord.getId() != null) {
            throw new BadRequestAlertException("A new immunizationRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImmunizationRecord result = immunizationRecordRepository.save(immunizationRecord);
        return ResponseEntity.created(new URI("/api/immunization-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /immunization-records : Updates an existing immunizationRecord.
     *
     * @param immunizationRecord the immunizationRecord to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated immunizationRecord,
     * or with status 400 (Bad Request) if the immunizationRecord is not valid,
     * or with status 500 (Internal Server Error) if the immunizationRecord couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/immunization-records")
    @Timed
    public ResponseEntity<ImmunizationRecord> updateImmunizationRecord(@RequestBody ImmunizationRecord immunizationRecord) throws URISyntaxException {
        log.debug("REST request to update ImmunizationRecord : {}", immunizationRecord);
        if (immunizationRecord.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImmunizationRecord result = immunizationRecordRepository.save(immunizationRecord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, immunizationRecord.getId().toString()))
            .body(result);
    }

    /**
     * GET  /immunization-records : get all the immunizationRecords.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of immunizationRecords in body
     */
    @GetMapping("/immunization-records")
    @Timed
    public List<ImmunizationRecord> getAllImmunizationRecords() {
        log.debug("REST request to get all ImmunizationRecords");
        return immunizationRecordRepository.findAll();
    }

    /**
     * GET  /immunization-records/:id : get the "id" immunizationRecord.
     *
     * @param id the id of the immunizationRecord to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the immunizationRecord, or with status 404 (Not Found)
     */
    @GetMapping("/immunization-records/{id}")
    @Timed
    public ResponseEntity<ImmunizationRecord> getImmunizationRecord(@PathVariable Long id) {
        log.debug("REST request to get ImmunizationRecord : {}", id);
        Optional<ImmunizationRecord> immunizationRecord = immunizationRecordRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(immunizationRecord);
    }

    /**
     * DELETE  /immunization-records/:id : delete the "id" immunizationRecord.
     *
     * @param id the id of the immunizationRecord to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/immunization-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteImmunizationRecord(@PathVariable Long id) {
        log.debug("REST request to delete ImmunizationRecord : {}", id);

        immunizationRecordRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
