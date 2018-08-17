package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Photo.
 */
@Entity
@Table(name = "photo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Photo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "activity_id")
    private Long activityId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "jhi_date")
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("photos")
    private Event event;

    @ManyToOne
    @JsonIgnoreProperties("photos")
    private Activity activity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getActivityId() {
        return activityId;
    }

    public Photo activityId(Long activityId) {
        this.activityId = activityId;
        return this;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Long getEventId() {
        return eventId;
    }

    public Photo eventId(Long eventId) {
        this.eventId = eventId;
        return this;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public LocalDate getDate() {
        return date;
    }

    public Photo date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Event getEvent() {
        return event;
    }

    public Photo event(Event event) {
        this.event = event;
        return this;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Activity getActivity() {
        return activity;
    }

    public Photo activity(Activity activity) {
        this.activity = activity;
        return this;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
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
        Photo photo = (Photo) o;
        if (photo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), photo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Photo{" +
            "id=" + getId() +
            ", activityId=" + getActivityId() +
            ", eventId=" + getEventId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
