package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A IllnessRecord.
 */
@Entity
@Table(name = "illness_record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IllnessRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "is_cured")
    private Boolean isCured;

    @ManyToOne
    @JsonIgnoreProperties("illnessRecords")
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

    public IllnessRecord createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public String getName() {
        return name;
    }

    public IllnessRecord name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public IllnessRecord description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isIsCured() {
        return isCured;
    }

    public IllnessRecord isCured(Boolean isCured) {
        this.isCured = isCured;
        return this;
    }

    public void setIsCured(Boolean isCured) {
        this.isCured = isCured;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public IllnessRecord studentProfile(StudentProfile studentProfile) {
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
        IllnessRecord illnessRecord = (IllnessRecord) o;
        if (illnessRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), illnessRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IllnessRecord{" +
            "id=" + getId() +
            ", createdOn='" + getCreatedOn() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", isCured='" + isIsCured() + "'" +
            "}";
    }
}
