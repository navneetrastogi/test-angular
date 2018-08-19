package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.StudentProfile;
import com.navneet.repository.StudentProfileRepository;
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
 * REST controller for managing StudentProfile.
 */
@RestController
@RequestMapping("/api")
public class StudentProfileResource {

    private final Logger log = LoggerFactory.getLogger(StudentProfileResource.class);

    private static final String ENTITY_NAME = "studentProfile";

    private final StudentProfileRepository studentProfileRepository;

    public StudentProfileResource(StudentProfileRepository studentProfileRepository) {
        this.studentProfileRepository = studentProfileRepository;
    }

    /**
     * POST  /student-profiles : Create a new studentProfile.
     *
     * @param studentProfile the studentProfile to create
     * @return the ResponseEntity with status 201 (Created) and with body the new studentProfile, or with status 400 (Bad Request) if the studentProfile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/student-profiles")
    @Timed
    public ResponseEntity<StudentProfile> createStudentProfile(@RequestBody StudentProfile studentProfile) throws URISyntaxException {
        log.debug("REST request to save StudentProfile : {}", studentProfile);
        if (studentProfile.getId() != null) {
            throw new BadRequestAlertException("A new studentProfile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentProfile result = studentProfileRepository.save(studentProfile);
        return ResponseEntity.created(new URI("/api/student-profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /student-profiles : Updates an existing studentProfile.
     *
     * @param studentProfile the studentProfile to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated studentProfile,
     * or with status 400 (Bad Request) if the studentProfile is not valid,
     * or with status 500 (Internal Server Error) if the studentProfile couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/student-profiles")
    @Timed
    public ResponseEntity<StudentProfile> updateStudentProfile(@RequestBody StudentProfile studentProfile) throws URISyntaxException {
        log.debug("REST request to update StudentProfile : {}", studentProfile);
        if (studentProfile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentProfile result = studentProfileRepository.save(studentProfile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, studentProfile.getId().toString()))
            .body(result);
    }

    /**
     * GET  /student-profiles : get all the studentProfiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of studentProfiles in body
     */
    @GetMapping("/student-profiles")
    @Timed
    public List<StudentProfile> getAllStudentProfiles() {
        log.debug("REST request to get all StudentProfiles");
        return studentProfileRepository.findAll();
    }

    /**
     * GET  /student-profiles/:id : get the "id" studentProfile.
     *
     * @param id the id of the studentProfile to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the studentProfile, or with status 404 (Not Found)
     */
    @GetMapping("/student-profiles/{id}")
    @Timed
    public ResponseEntity<StudentProfile> getStudentProfile(@PathVariable Long id) {
        log.debug("REST request to get StudentProfile : {}", id);
        Optional<StudentProfile> studentProfile = studentProfileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(studentProfile);
    }

    /**
     * DELETE  /student-profiles/:id : delete the "id" studentProfile.
     *
     * @param id the id of the studentProfile to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/student-profiles/{id}")
    @Timed
    public ResponseEntity<Void> deleteStudentProfile(@PathVariable Long id) {
        log.debug("REST request to delete StudentProfile : {}", id);

        studentProfileRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
