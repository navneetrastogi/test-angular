package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A KudosRecord.
 */
@Entity
@Table(name = "kudos_record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class KudosRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "notes")
    private String notes;

    @ManyToOne
    @JsonIgnoreProperties("kudosRecords")
    private StudentProfile studentProfile;

    @ManyToOne
    @JsonIgnoreProperties("kudosRecords")
    private Kudos kudos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public KudosRecord createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public String getNotes() {
        return notes;
    }

    public KudosRecord notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public KudosRecord studentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
        return this;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
    }

    public Kudos getKudos() {
        return kudos;
    }

    public KudosRecord kudos(Kudos kudos) {
        this.kudos = kudos;
        return this;
    }

    public void setKudos(Kudos kudos) {
        this.kudos = kudos;
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
        KudosRecord kudosRecord = (KudosRecord) o;
        if (kudosRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kudosRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KudosRecord{" +
            "id=" + getId() +
            ", createdOn='" + getCreatedOn() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
