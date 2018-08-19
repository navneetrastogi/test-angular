package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.Kudos;
import com.navneet.repository.KudosRepository;
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
 * REST controller for managing Kudos.
 */
@RestController
@RequestMapping("/api")
public class KudosResource {

    private final Logger log = LoggerFactory.getLogger(KudosResource.class);

    private static final String ENTITY_NAME = "kudos";

    private final KudosRepository kudosRepository;

    public KudosResource(KudosRepository kudosRepository) {
        this.kudosRepository = kudosRepository;
    }

    /**
     * POST  /kudos : Create a new kudos.
     *
     * @param kudos the kudos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new kudos, or with status 400 (Bad Request) if the kudos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/kudos")
    @Timed
    public ResponseEntity<Kudos> createKudos(@RequestBody Kudos kudos) throws URISyntaxException {
        log.debug("REST request to save Kudos : {}", kudos);
        if (kudos.getId() != null) {
            throw new BadRequestAlertException("A new kudos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Kudos result = kudosRepository.save(kudos);
        return ResponseEntity.created(new URI("/api/kudos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /kudos : Updates an existing kudos.
     *
     * @param kudos the kudos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated kudos,
     * or with status 400 (Bad Request) if the kudos is not valid,
     * or with status 500 (Internal Server Error) if the kudos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/kudos")
    @Timed
    public ResponseEntity<Kudos> updateKudos(@RequestBody Kudos kudos) throws URISyntaxException {
        log.debug("REST request to update Kudos : {}", kudos);
        if (kudos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Kudos result = kudosRepository.save(kudos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, kudos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /kudos : get all the kudos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of kudos in body
     */
    @GetMapping("/kudos")
    @Timed
    public List<Kudos> getAllKudos() {
        log.debug("REST request to get all Kudos");
        return kudosRepository.findAll();
    }

    /**
     * GET  /kudos/:id : get the "id" kudos.
     *
     * @param id the id of the kudos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the kudos, or with status 404 (Not Found)
     */
    @GetMapping("/kudos/{id}")
    @Timed
    public ResponseEntity<Kudos> getKudos(@PathVariable Long id) {
        log.debug("REST request to get Kudos : {}", id);
        Optional<Kudos> kudos = kudosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kudos);
    }

    /**
     * DELETE  /kudos/:id : delete the "id" kudos.
     *
     * @param id the id of the kudos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/kudos/{id}")
    @Timed
    public ResponseEntity<Void> deleteKudos(@PathVariable Long id) {
        log.debug("REST request to delete Kudos : {}", id);

        kudosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
