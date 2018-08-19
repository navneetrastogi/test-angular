package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.navneet.domain.enumeration.IllumineMediaType;

/**
 * A Gallery.
 */
@Entity
@Table(name = "gallery")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Gallery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type")
    private IllumineMediaType mediaType;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "title")
    private String title;

    @ManyToOne
    @JsonIgnoreProperties("galleryItems")
    private StudentProfile studentProfile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public IllumineMediaType getMediaType() {
        return mediaType;
    }

    public Gallery mediaType(IllumineMediaType mediaType) {
        this.mediaType = mediaType;
        return this;
    }

    public void setMediaType(IllumineMediaType mediaType) {
        this.mediaType = mediaType;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Gallery createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public Gallery fileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
        return this;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getTitle() {
        return title;
    }

    public Gallery title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public Gallery studentProfile(StudentProfile studentProfile) {
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
        Gallery gallery = (Gallery) o;
        if (gallery.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gallery.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Gallery{" +
            "id=" + getId() +
            ", mediaType='" + getMediaType() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", fileUrl='" + getFileUrl() + "'" +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
