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

/**
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "last_modified_on")
    private LocalDate lastModifiedOn;

    @OneToMany(mappedBy = "schedule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Room> rooms = new HashSet<>();

    @OneToMany(mappedBy = "schedule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Event> events = new HashSet<>();

    @OneToMany(mappedBy = "schedule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Activity> activities = new HashSet<>();

    @OneToMany(mappedBy = "schedule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Timeline> timelines = new HashSet<>();

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

    public Schedule createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDate getLastModifiedOn() {
        return lastModifiedOn;
    }

    public Schedule lastModifiedOn(LocalDate lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
        return this;
    }

    public void setLastModifiedOn(LocalDate lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public Schedule rooms(Set<Room> rooms) {
        this.rooms = rooms;
        return this;
    }

    public Schedule addRooms(Room room) {
        this.rooms.add(room);
        room.setSchedule(this);
        return this;
    }

    public Schedule removeRooms(Room room) {
        this.rooms.remove(room);
        room.setSchedule(null);
        return this;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Schedule events(Set<Event> events) {
        this.events = events;
        return this;
    }

    public Schedule addEvents(Event event) {
        this.events.add(event);
        event.setSchedule(this);
        return this;
    }

    public Schedule removeEvents(Event event) {
        this.events.remove(event);
        event.setSchedule(null);
        return this;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Set<Activity> getActivities() {
        return activities;
    }

    public Schedule activities(Set<Activity> activities) {
        this.activities = activities;
        return this;
    }

    public Schedule addActivities(Activity activity) {
        this.activities.add(activity);
        activity.setSchedule(this);
        return this;
    }

    public Schedule removeActivities(Activity activity) {
        this.activities.remove(activity);
        activity.setSchedule(null);
        return this;
    }

    public void setActivities(Set<Activity> activities) {
        this.activities = activities;
    }

    public Set<Timeline> getTimelines() {
        return timelines;
    }

    public Schedule timelines(Set<Timeline> timelines) {
        this.timelines = timelines;
        return this;
    }

    public Schedule addTimelines(Timeline timeline) {
        this.timelines.add(timeline);
        timeline.setSchedule(this);
        return this;
    }

    public Schedule removeTimelines(Timeline timeline) {
        this.timelines.remove(timeline);
        timeline.setSchedule(null);
        return this;
    }

    public void setTimelines(Set<Timeline> timelines) {
        this.timelines = timelines;
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
        Schedule schedule = (Schedule) o;
        if (schedule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schedule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", createdOn='" + getCreatedOn() + "'" +
            ", lastModifiedOn='" + getLastModifiedOn() + "'" +
            "}";
    }
}
