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
 * A Center.
 */
@Entity
@Table(name = "center")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Center implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "last_modified_on")
    private LocalDate lastModifiedOn;

    @ManyToOne
    @JsonIgnoreProperties("centers")
    private Organization organization;

    @OneToMany(mappedBy = "center")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Room> rooms = new HashSet<>();

    @OneToMany(mappedBy = "center")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teacher> teachers = new HashSet<>();

    @OneToMany(mappedBy = "center")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "center")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Holiday> holidays = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Center name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Center createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDate getLastModifiedOn() {
        return lastModifiedOn;
    }

    public Center lastModifiedOn(LocalDate lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
        return this;
    }

    public void setLastModifiedOn(LocalDate lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public Organization getOrganization() {
        return organization;
    }

    public Center organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public Center rooms(Set<Room> rooms) {
        this.rooms = rooms;
        return this;
    }

    public Center addRooms(Room room) {
        this.rooms.add(room);
        room.setCenter(this);
        return this;
    }

    public Center removeRooms(Room room) {
        this.rooms.remove(room);
        room.setCenter(null);
        return this;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Center teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Center addTeachers(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.setCenter(this);
        return this;
    }

    public Center removeTeachers(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.setCenter(null);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Center students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Center addStudents(Student student) {
        this.students.add(student);
        student.setCenter(this);
        return this;
    }

    public Center removeStudents(Student student) {
        this.students.remove(student);
        student.setCenter(null);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public Set<Holiday> getHolidays() {
        return holidays;
    }

    public Center holidays(Set<Holiday> holidays) {
        this.holidays = holidays;
        return this;
    }

    public Center addHolidays(Holiday holiday) {
        this.holidays.add(holiday);
        holiday.setCenter(this);
        return this;
    }

    public Center removeHolidays(Holiday holiday) {
        this.holidays.remove(holiday);
        holiday.setCenter(null);
        return this;
    }

    public void setHolidays(Set<Holiday> holidays) {
        this.holidays = holidays;
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
        Center center = (Center) o;
        if (center.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), center.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Center{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", lastModifiedOn='" + getLastModifiedOn() + "'" +
            "}";
    }
}
