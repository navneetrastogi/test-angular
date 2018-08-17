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
 * A Milestone.
 */
@Entity
@Table(name = "milestone")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Milestone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "last_modified_on")
    private LocalDate lastModifiedOn;

    @OneToMany(mappedBy = "milestone")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MilestoneRecord> milestoneRecords = new HashSet<>();

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

    public Milestone title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Milestone description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Milestone imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Milestone createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDate getLastModifiedOn() {
        return lastModifiedOn;
    }

    public Milestone lastModifiedOn(LocalDate lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
        return this;
    }

    public void setLastModifiedOn(LocalDate lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public Set<MilestoneRecord> getMilestoneRecords() {
        return milestoneRecords;
    }

    public Milestone milestoneRecords(Set<MilestoneRecord> milestoneRecords) {
        this.milestoneRecords = milestoneRecords;
        return this;
    }

    public Milestone addMilestoneRecords(MilestoneRecord milestoneRecord) {
        this.milestoneRecords.add(milestoneRecord);
        milestoneRecord.setMilestone(this);
        return this;
    }

    public Milestone removeMilestoneRecords(MilestoneRecord milestoneRecord) {
        this.milestoneRecords.remove(milestoneRecord);
        milestoneRecord.setMilestone(null);
        return this;
    }

    public void setMilestoneRecords(Set<MilestoneRecord> milestoneRecords) {
        this.milestoneRecords = milestoneRecords;
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
        Milestone milestone = (Milestone) o;
        if (milestone.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), milestone.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Milestone{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", lastModifiedOn='" + getLastModifiedOn() + "'" +
            "}";
    }
}
