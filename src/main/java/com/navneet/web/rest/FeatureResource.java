package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.Feature;
import com.navneet.repository.FeatureRepository;
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
 * REST controller for managing Feature.
 */
@RestController
@RequestMapping("/api")
public class FeatureResource {

    private final Logger log = LoggerFactory.getLogger(FeatureResource.class);

    private static final String ENTITY_NAME = "feature";

    private final FeatureRepository featureRepository;

    public FeatureResource(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    /**
     * POST  /features : Create a new feature.
     *
     * @param feature the feature to create
     * @return the ResponseEntity with status 201 (Created) and with body the new feature, or with status 400 (Bad Request) if the feature has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/features")
    @Timed
    public ResponseEntity<Feature> createFeature(@RequestBody Feature feature) throws URISyntaxException {
        log.debug("REST request to save Feature : {}", feature);
        if (feature.getId() != null) {
            throw new BadRequestAlertException("A new feature cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Feature result = featureRepository.save(feature);
        return ResponseEntity.created(new URI("/api/features/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /features : Updates an existing feature.
     *
     * @param feature the feature to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated feature,
     * or with status 400 (Bad Request) if the feature is not valid,
     * or with status 500 (Internal Server Error) if the feature couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/features")
    @Timed
    public ResponseEntity<Feature> updateFeature(@RequestBody Feature feature) throws URISyntaxException {
        log.debug("REST request to update Feature : {}", feature);
        if (feature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Feature result = featureRepository.save(feature);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, feature.getId().toString()))
            .body(result);
    }

    /**
     * GET  /features : get all the features.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of features in body
     */
    @GetMapping("/features")
    @Timed
    public List<Feature> getAllFeatures() {
        log.debug("REST request to get all Features");
        return featureRepository.findAll();
    }

    /**
     * GET  /features/:id : get the "id" feature.
     *
     * @param id the id of the feature to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the feature, or with status 404 (Not Found)
     */
    @GetMapping("/features/{id}")
    @Timed
    public ResponseEntity<Feature> getFeature(@PathVariable Long id) {
        log.debug("REST request to get Feature : {}", id);
        Optional<Feature> feature = featureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(feature);
    }

    /**
     * DELETE  /features/:id : delete the "id" feature.
     *
     * @param id the id of the feature to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/features/{id}")
    @Timed
    public ResponseEntity<Void> deleteFeature(@PathVariable Long id) {
        log.debug("REST request to delete Feature : {}", id);

        featureRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
