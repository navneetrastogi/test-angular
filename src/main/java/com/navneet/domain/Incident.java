package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Incident.
 */
@Entity
@Table(name = "incident")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Incident implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nature_of_incident")
    private String natureOfIncident;

    @Column(name = "first_aid_provided")
    private Boolean firstAidProvided;

    @Column(name = "first_aid_notes")
    private String firstAidNotes;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "is_admin_only")
    private Boolean isAdminOnly;

    @Column(name = "notes")
    private String notes;

    @ManyToOne
    @JsonIgnoreProperties("incidents")
    private StudentProfile studentProfile;

    @OneToMany(mappedBy = "incident")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Student> students = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNatureOfIncident() {
        return natureOfIncident;
    }

    public Incident natureOfIncident(String natureOfIncident) {
        this.natureOfIncident = natureOfIncident;
        return this;
    }

    public void setNatureOfIncident(String natureOfIncident) {
        this.natureOfIncident = natureOfIncident;
    }

    public Boolean isFirstAidProvided() {
        return firstAidProvided;
    }

    public Incident firstAidProvided(Boolean firstAidProvided) {
        this.firstAidProvided = firstAidProvided;
        return this;
    }

    public void setFirstAidProvided(Boolean firstAidProvided) {
        this.firstAidProvided = firstAidProvided;
    }

    public String getFirstAidNotes() {
        return firstAidNotes;
    }

    public Incident firstAidNotes(String firstAidNotes) {
        this.firstAidNotes = firstAidNotes;
        return this;
    }

    public void setFirstAidNotes(String firstAidNotes) {
        this.firstAidNotes = firstAidNotes;
    }

    public LocalDate getDate() {
        return date;
    }

    public Incident date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Incident createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public Boolean isIsAdminOnly() {
        return isAdminOnly;
    }

    public Incident isAdminOnly(Boolean isAdminOnly) {
        this.isAdminOnly = isAdminOnly;
        return this;
    }

    public void setIsAdminOnly(Boolean isAdminOnly) {
        this.isAdminOnly = isAdminOnly;
    }

    public String getNotes() {
        return notes;
    }

    public Incident notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public Incident studentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
        return this;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Incident students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Incident addStudents(Student student) {
        this.students.add(student);
        student.setIncident(this);
        return this;
    }

    public Incident removeStudents(Student student) {
        this.students.remove(student);
        student.setIncident(null);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
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
        Incident incident = (Incident) o;
        if (incident.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), incident.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Incident{" +
            "id=" + getId() +
            ", natureOfIncident='" + getNatureOfIncident() + "'" +
            ", firstAidProvided='" + isFirstAidProvided() + "'" +
            ", firstAidNotes='" + getFirstAidNotes() + "'" +
            ", date='" + getDate() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", isAdminOnly='" + isIsAdminOnly() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
