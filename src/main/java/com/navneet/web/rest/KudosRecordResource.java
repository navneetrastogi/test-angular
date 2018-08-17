package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.KudosRecord;
import com.navneet.repository.KudosRecordRepository;
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
 * REST controller for managing KudosRecord.
 */
@RestController
@RequestMapping("/api")
public class KudosRecordResource {

    private final Logger log = LoggerFactory.getLogger(KudosRecordResource.class);

    private static final String ENTITY_NAME = "kudosRecord";

    private final KudosRecordRepository kudosRecordRepository;

    public KudosRecordResource(KudosRecordRepository kudosRecordRepository) {
        this.kudosRecordRepository = kudosRecordRepository;
    }

    /**
     * POST  /kudos-records : Create a new kudosRecord.
     *
     * @param kudosRecord the kudosRecord to create
     * @return the ResponseEntity with status 201 (Created) and with body the new kudosRecord, or with status 400 (Bad Request) if the kudosRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/kudos-records")
    @Timed
    public ResponseEntity<KudosRecord> createKudosRecord(@RequestBody KudosRecord kudosRecord) throws URISyntaxException {
        log.debug("REST request to save KudosRecord : {}", kudosRecord);
        if (kudosRecord.getId() != null) {
            throw new BadRequestAlertException("A new kudosRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KudosRecord result = kudosRecordRepository.save(kudosRecord);
        return ResponseEntity.created(new URI("/api/kudos-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /kudos-records : Updates an existing kudosRecord.
     *
     * @param kudosRecord the kudosRecord to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated kudosRecord,
     * or with status 400 (Bad Request) if the kudosRecord is not valid,
     * or with status 500 (Internal Server Error) if the kudosRecord couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/kudos-records")
    @Timed
    public ResponseEntity<KudosRecord> updateKudosRecord(@RequestBody KudosRecord kudosRecord) throws URISyntaxException {
        log.debug("REST request to update KudosRecord : {}", kudosRecord);
        if (kudosRecord.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KudosRecord result = kudosRecordRepository.save(kudosRecord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, kudosRecord.getId().toString()))
            .body(result);
    }

    /**
     * GET  /kudos-records : get all the kudosRecords.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of kudosRecords in body
     */
    @GetMapping("/kudos-records")
    @Timed
    public List<KudosRecord> getAllKudosRecords() {
        log.debug("REST request to get all KudosRecords");
        return kudosRecordRepository.findAll();
    }

    /**
     * GET  /kudos-records/:id : get the "id" kudosRecord.
     *
     * @param id the id of the kudosRecord to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the kudosRecord, or with status 404 (Not Found)
     */
    @GetMapping("/kudos-records/{id}")
    @Timed
    public ResponseEntity<KudosRecord> getKudosRecord(@PathVariable Long id) {
        log.debug("REST request to get KudosRecord : {}", id);
        Optional<KudosRecord> kudosRecord = kudosRecordRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kudosRecord);
    }

    /**
     * DELETE  /kudos-records/:id : delete the "id" kudosRecord.
     *
     * @param id the id of the kudosRecord to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/kudos-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteKudosRecord(@PathVariable Long id) {
        log.debug("REST request to delete KudosRecord : {}", id);

        kudosRecordRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
