package com.navneet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.navneet.domain.Attendance;
import com.navneet.repository.AttendanceRepository;
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
 * REST controller for managing Attendance.
 */
@RestController
@RequestMapping("/api")
public class AttendanceResource {

    private final Logger log = LoggerFactory.getLogger(AttendanceResource.class);

    private static final String ENTITY_NAME = "attendance";

    private final AttendanceRepository attendanceRepository;

    public AttendanceResource(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    /**
     * POST  /attendances : Create a new attendance.
     *
     * @param attendance the attendance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attendance, or with status 400 (Bad Request) if the attendance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/attendances")
    @Timed
    public ResponseEntity<Attendance> createAttendance(@RequestBody Attendance attendance) throws URISyntaxException {
        log.debug("REST request to save Attendance : {}", attendance);
        if (attendance.getId() != null) {
            throw new BadRequestAlertException("A new attendance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Attendance result = attendanceRepository.save(attendance);
        return ResponseEntity.created(new URI("/api/attendances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attendances : Updates an existing attendance.
     *
     * @param attendance the attendance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attendance,
     * or with status 400 (Bad Request) if the attendance is not valid,
     * or with status 500 (Internal Server Error) if the attendance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/attendances")
    @Timed
    public ResponseEntity<Attendance> updateAttendance(@RequestBody Attendance attendance) throws URISyntaxException {
        log.debug("REST request to update Attendance : {}", attendance);
        if (attendance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Attendance result = attendanceRepository.save(attendance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, attendance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attendances : get all the attendances.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of attendances in body
     */
    @GetMapping("/attendances")
    @Timed
    public List<Attendance> getAllAttendances() {
        log.debug("REST request to get all Attendances");
        return attendanceRepository.findAll();
    }

    /**
     * GET  /attendances/:id : get the "id" attendance.
     *
     * @param id the id of the attendance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attendance, or with status 404 (Not Found)
     */
    @GetMapping("/attendances/{id}")
    @Timed
    public ResponseEntity<Attendance> getAttendance(@PathVariable Long id) {
        log.debug("REST request to get Attendance : {}", id);
        Optional<Attendance> attendance = attendanceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(attendance);
    }

    /**
     * DELETE  /attendances/:id : delete the "id" attendance.
     *
     * @param id the id of the attendance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/attendances/{id}")
    @Timed
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        log.debug("REST request to delete Attendance : {}", id);

        attendanceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
