package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.navneet.domain.enumeration.AttendanceEvent;

/**
 * A Attendance.
 */
@Entity
@Table(name = "attendance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Attendance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "attendance_event")
    private AttendanceEvent attendanceEvent;

    @Column(name = "datetime")
    private LocalDate datetime;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @ManyToOne
    @JsonIgnoreProperties("attendances")
    private StudentProfile studentProfile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttendanceEvent getAttendanceEvent() {
        return attendanceEvent;
    }

    public Attendance attendanceEvent(AttendanceEvent attendanceEvent) {
        this.attendanceEvent = attendanceEvent;
        return this;
    }

    public void setAttendanceEvent(AttendanceEvent attendanceEvent) {
        this.attendanceEvent = attendanceEvent;
    }

    public LocalDate getDatetime() {
        return datetime;
    }

    public Attendance datetime(LocalDate datetime) {
        this.datetime = datetime;
        return this;
    }

    public void setDatetime(LocalDate datetime) {
        this.datetime = datetime;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Attendance createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public Attendance studentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
        return this;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Attendance attendance = (Attendance) o;
        if (attendance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), attendance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Attendance{" +
            "id=" + getId() +
            ", attendanceEvent='" + getAttendanceEvent() + "'" +
            ", datetime='" + getDatetime() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            "}";
    }
}
