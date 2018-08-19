package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A ImmunizationRecord.
 */
@Entity
@Table(name = "immunization_record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ImmunizationRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "vaccination_done_on")
    private LocalDate vaccinationDoneOn;

    @Column(name = "vaccination_name")
    private String vaccinationName;

    @Column(name = "is_on_time")
    private Boolean isOnTime;

    @ManyToOne
    @JsonIgnoreProperties("immunizationRecords")
    private StudentProfile studentProfile;

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

    public ImmunizationRecord createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDate getVaccinationDoneOn() {
        return vaccinationDoneOn;
    }

    public ImmunizationRecord vaccinationDoneOn(LocalDate vaccinationDoneOn) {
        this.vaccinationDoneOn = vaccinationDoneOn;
        return this;
    }

    public void setVaccinationDoneOn(LocalDate vaccinationDoneOn) {
        this.vaccinationDoneOn = vaccinationDoneOn;
    }

    public String getVaccinationName() {
        return vaccinationName;
    }

    public ImmunizationRecord vaccinationName(String vaccinationName) {
        this.vaccinationName = vaccinationName;
        return this;
    }

    public void setVaccinationName(String vaccinationName) {
        this.vaccinationName = vaccinationName;
    }

    public Boolean isIsOnTime() {
        return isOnTime;
    }

    public ImmunizationRecord isOnTime(Boolean isOnTime) {
        this.isOnTime = isOnTime;
        return this;
    }

    public void setIsOnTime(Boolean isOnTime) {
        this.isOnTime = isOnTime;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public ImmunizationRecord studentProfile(StudentProfile studentProfile) {
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
        ImmunizationRecord immunizationRecord = (ImmunizationRecord) o;
        if (immunizationRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), immunizationRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImmunizationRecord{" +
            "id=" + getId() +
            ", createdOn='" + getCreatedOn() + "'" +
            ", vaccinationDoneOn='" + getVaccinationDoneOn() + "'" +
            ", vaccinationName='" + getVaccinationName() + "'" +
            ", isOnTime='" + isIsOnTime() + "'" +
            "}";
    }
}
