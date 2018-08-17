package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.navneet.domain.enumeration.Gender;

/**
 * A StudentProfile.
 */
@Entity
@Table(name = "student_profile")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StudentProfile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dream")
    private String dream;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ImmunizationRecord> immunizationRecords = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IllnessRecord> illnessRecords = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<KudosRecord> kudosRecords = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MilestoneRecord> milestoneRecords = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Attendance> attendances = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Incident> incidents = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Timeline> timelines = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Parent> parents = new HashSet<>();

    @OneToMany(mappedBy = "studentProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Gallery> galleryItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDream() {
        return dream;
    }

    public StudentProfile dream(String dream) {
        this.dream = dream;
        return this;
    }

    public void setDream(String dream) {
        this.dream = dream;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public StudentProfile birthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public StudentProfile bloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
        return this;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public Gender getGender() {
        return gender;
    }

    public StudentProfile gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Set<ImmunizationRecord> getImmunizationRecords() {
        return immunizationRecords;
    }

    public StudentProfile immunizationRecords(Set<ImmunizationRecord> immunizationRecords) {
        this.immunizationRecords = immunizationRecords;
        return this;
    }

    public StudentProfile addImmunizationRecords(ImmunizationRecord immunizationRecord) {
        this.immunizationRecords.add(immunizationRecord);
        immunizationRecord.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeImmunizationRecords(ImmunizationRecord immunizationRecord) {
        this.immunizationRecords.remove(immunizationRecord);
        immunizationRecord.setStudentProfile(null);
        return this;
    }

    public void setImmunizationRecords(Set<ImmunizationRecord> immunizationRecords) {
        this.immunizationRecords = immunizationRecords;
    }

    public Set<IllnessRecord> getIllnessRecords() {
        return illnessRecords;
    }

    public StudentProfile illnessRecords(Set<IllnessRecord> illnessRecords) {
        this.illnessRecords = illnessRecords;
        return this;
    }

    public StudentProfile addIllnessRecords(IllnessRecord illnessRecord) {
        this.illnessRecords.add(illnessRecord);
        illnessRecord.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeIllnessRecords(IllnessRecord illnessRecord) {
        this.illnessRecords.remove(illnessRecord);
        illnessRecord.setStudentProfile(null);
        return this;
    }

    public void setIllnessRecords(Set<IllnessRecord> illnessRecords) {
        this.illnessRecords = illnessRecords;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public StudentProfile payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public StudentProfile addPayments(Payment payment) {
        this.payments.add(payment);
        payment.setStudentProfile(this);
        return this;
    }

    public StudentProfile removePayments(Payment payment) {
        this.payments.remove(payment);
        payment.setStudentProfile(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Set<KudosRecord> getKudosRecords() {
        return kudosRecords;
    }

    public StudentProfile kudosRecords(Set<KudosRecord> kudosRecords) {
        this.kudosRecords = kudosRecords;
        return this;
    }

    public StudentProfile addKudosRecords(KudosRecord kudosRecord) {
        this.kudosRecords.add(kudosRecord);
        kudosRecord.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeKudosRecords(KudosRecord kudosRecord) {
        this.kudosRecords.remove(kudosRecord);
        kudosRecord.setStudentProfile(null);
        return this;
    }

    public void setKudosRecords(Set<KudosRecord> kudosRecords) {
        this.kudosRecords = kudosRecords;
    }

    public Set<MilestoneRecord> getMilestoneRecords() {
        return milestoneRecords;
    }

    public StudentProfile milestoneRecords(Set<MilestoneRecord> milestoneRecords) {
        this.milestoneRecords = milestoneRecords;
        return this;
    }

    public StudentProfile addMilestoneRecords(MilestoneRecord milestoneRecord) {
        this.milestoneRecords.add(milestoneRecord);
        milestoneRecord.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeMilestoneRecords(MilestoneRecord milestoneRecord) {
        this.milestoneRecords.remove(milestoneRecord);
        milestoneRecord.setStudentProfile(null);
        return this;
    }

    public void setMilestoneRecords(Set<MilestoneRecord> milestoneRecords) {
        this.milestoneRecords = milestoneRecords;
    }

    public Set<Attendance> getAttendances() {
        return attendances;
    }

    public StudentProfile attendances(Set<Attendance> attendances) {
        this.attendances = attendances;
        return this;
    }

    public StudentProfile addAttendance(Attendance attendance) {
        this.attendances.add(attendance);
        attendance.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeAttendance(Attendance attendance) {
        this.attendances.remove(attendance);
        attendance.setStudentProfile(null);
        return this;
    }

    public void setAttendances(Set<Attendance> attendances) {
        this.attendances = attendances;
    }

    public Set<Incident> getIncidents() {
        return incidents;
    }

    public StudentProfile incidents(Set<Incident> incidents) {
        this.incidents = incidents;
        return this;
    }

    public StudentProfile addIncidents(Incident incident) {
        this.incidents.add(incident);
        incident.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeIncidents(Incident incident) {
        this.incidents.remove(incident);
        incident.setStudentProfile(null);
        return this;
    }

    public void setIncidents(Set<Incident> incidents) {
        this.incidents = incidents;
    }

    public Set<Timeline> getTimelines() {
        return timelines;
    }

    public StudentProfile timelines(Set<Timeline> timelines) {
        this.timelines = timelines;
        return this;
    }

    public StudentProfile addTimelines(Timeline timeline) {
        this.timelines.add(timeline);
        timeline.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeTimelines(Timeline timeline) {
        this.timelines.remove(timeline);
        timeline.setStudentProfile(null);
        return this;
    }

    public void setTimelines(Set<Timeline> timelines) {
        this.timelines = timelines;
    }

    public Set<Parent> getParents() {
        return parents;
    }

    public StudentProfile parents(Set<Parent> parents) {
        this.parents = parents;
        return this;
    }

    public StudentProfile addParents(Parent parent) {
        this.parents.add(parent);
        parent.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeParents(Parent parent) {
        this.parents.remove(parent);
        parent.setStudentProfile(null);
        return this;
    }

    public void setParents(Set<Parent> parents) {
        this.parents = parents;
    }

    public Set<Gallery> getGalleryItems() {
        return galleryItems;
    }

    public StudentProfile galleryItems(Set<Gallery> galleries) {
        this.galleryItems = galleries;
        return this;
    }

    public StudentProfile addGalleryItems(Gallery gallery) {
        this.galleryItems.add(gallery);
        gallery.setStudentProfile(this);
        return this;
    }

    public StudentProfile removeGalleryItems(Gallery gallery) {
        this.galleryItems.remove(gallery);
        gallery.setStudentProfile(null);
        return this;
    }

    public void setGalleryItems(Set<Gallery> galleries) {
        this.galleryItems = galleries;
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
        StudentProfile studentProfile = (StudentProfile) o;
        if (studentProfile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentProfile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentProfile{" +
            "id=" + getId() +
            ", dream='" + getDream() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", bloodGroup='" + getBloodGroup() + "'" +
            ", gender='" + getGender() + "'" +
            "}";
    }
}
