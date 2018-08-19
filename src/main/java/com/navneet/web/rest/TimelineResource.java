package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.Timeline;
import com.navneet.repository.TimelineRepository;
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
 * REST controller for managing Timeline.
 */
@RestController
@RequestMapping("/api")
public class TimelineResource {

    private final Logger log = LoggerFactory.getLogger(TimelineResource.class);

    private static final String ENTITY_NAME = "timeline";

    private final TimelineRepository timelineRepository;

    public TimelineResource(TimelineRepository timelineRepository) {
        this.timelineRepository = timelineRepository;
    }

    /**
     * POST  /timelines : Create a new timeline.
     *
     * @param timeline the timeline to create
     * @return the ResponseEntity with status 201 (Created) and with body the new timeline, or with status 400 (Bad Request) if the timeline has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/timelines")
    @Timed
    public ResponseEntity<Timeline> createTimeline(@RequestBody Timeline timeline) throws URISyntaxException {
        log.debug("REST request to save Timeline : {}", timeline);
        if (timeline.getId() != null) {
            throw new BadRequestAlertException("A new timeline cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Timeline result = timelineRepository.save(timeline);
        return ResponseEntity.created(new URI("/api/timelines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /timelines : Updates an existing timeline.
     *
     * @param timeline the timeline to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated timeline,
     * or with status 400 (Bad Request) if the timeline is not valid,
     * or with status 500 (Internal Server Error) if the timeline couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/timelines")
    @Timed
    public ResponseEntity<Timeline> updateTimeline(@RequestBody Timeline timeline) throws URISyntaxException {
        log.debug("REST request to update Timeline : {}", timeline);
        if (timeline.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Timeline result = timelineRepository.save(timeline);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, timeline.getId().toString()))
            .body(result);
    }

    /**
     * GET  /timelines : get all the timelines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of timelines in body
     */
    @GetMapping("/timelines")
    @Timed
    public List<Timeline> getAllTimelines() {
        log.debug("REST request to get all Timelines");
        return timelineRepository.findAll();
    }

    /**
     * GET  /timelines/:id : get the "id" timeline.
     *
     * @param id the id of the timeline to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the timeline, or with status 404 (Not Found)
     */
    @GetMapping("/timelines/{id}")
    @Timed
    public ResponseEntity<Timeline> getTimeline(@PathVariable Long id) {
        log.debug("REST request to get Timeline : {}", id);
        Optional<Timeline> timeline = timelineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(timeline);
    }

    /**
     * DELETE  /timelines/:id : delete the "id" timeline.
     *
     * @param id the id of the timeline to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/timelines/{id}")
    @Timed
    public ResponseEntity<Void> deleteTimeline(@PathVariable Long id) {
        log.debug("REST request to delete Timeline : {}", id);

        timelineRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
