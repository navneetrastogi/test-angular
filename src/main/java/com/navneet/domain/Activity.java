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
 * A Activity.
 */
@Entity
@Table(name = "activity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Activity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "activity_image_url")
    private String activityImageUrl;

    @Column(name = "activity_date")
    private LocalDate activityDate;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "last_modified_on")
    private LocalDate lastModifiedOn;

    @ManyToOne
    @JsonIgnoreProperties("activities")
    private Schedule schedule;

    @OneToOne
    @JoinColumn(unique = true)
    private ActivityType activityType;

    @OneToMany(mappedBy = "activity")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Photo> photos = new HashSet<>();

    @OneToMany(mappedBy = "activity")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Video> videos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Activity title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Activity description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActivityImageUrl() {
        return activityImageUrl;
    }

    public Activity activityImageUrl(String activityImageUrl) {
        this.activityImageUrl = activityImageUrl;
        return this;
    }

    public void setActivityImageUrl(String activityImageUrl) {
        this.activityImageUrl = activityImageUrl;
    }

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public Activity activityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
        return this;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Activity createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDate getLastModifiedOn() {
        return lastModifiedOn;
    }

    public Activity lastModifiedOn(LocalDate lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
        return this;
    }

    public void setLastModifiedOn(LocalDate lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public Activity schedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public ActivityType getActivityType() {
        return activityType;
    }

    public Activity activityType(ActivityType activityType) {
        this.activityType = activityType;
        return this;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public Activity photos(Set<Photo> photos) {
        this.photos = photos;
        return this;
    }

    public Activity addPhotos(Photo photo) {
        this.photos.add(photo);
        photo.setActivity(this);
        return this;
    }

    public Activity removePhotos(Photo photo) {
        this.photos.remove(photo);
        photo.setActivity(null);
        return this;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public Set<Video> getVideos() {
        return videos;
    }

    public Activity videos(Set<Video> videos) {
        this.videos = videos;
        return this;
    }

    public Activity addVideos(Video video) {
        this.videos.add(video);
        video.setActivity(this);
        return this;
    }

    public Activity removeVideos(Video video) {
        this.videos.remove(video);
        video.setActivity(null);
        return this;
    }

    public void setVideos(Set<Video> videos) {
        this.videos = videos;
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
        Activity activity = (Activity) o;
        if (activity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), activity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Activity{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", activityImageUrl='" + getActivityImageUrl() + "'" +
            ", activityDate='" + getActivityDate() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", lastModifiedOn='" + getLastModifiedOn() + "'" +
            "}";
    }
}
