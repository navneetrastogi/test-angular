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
 * A Conversation.
 */
@Entity
@Table(name = "conversation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Conversation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "sent_on")
    private LocalDate sentOn;

    @Column(name = "status")
    private String status;

    @Column(name = "file_url")
    private String fileUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type")
    private IllumineMediaType mediaType;

    @ManyToOne
    @JsonIgnoreProperties("conversations")
    private Teacher teacher;

    @ManyToOne
    @JsonIgnoreProperties("conversations")
    private Parent parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Conversation text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Conversation createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDate getSentOn() {
        return sentOn;
    }

    public Conversation sentOn(LocalDate sentOn) {
        this.sentOn = sentOn;
        return this;
    }

    public void setSentOn(LocalDate sentOn) {
        this.sentOn = sentOn;
    }

    public String getStatus() {
        return status;
    }

    public Conversation status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public Conversation fileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
        return this;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public IllumineMediaType getMediaType() {
        return mediaType;
    }

    public Conversation mediaType(IllumineMediaType mediaType) {
        this.mediaType = mediaType;
        return this;
    }

    public void setMediaType(IllumineMediaType mediaType) {
        this.mediaType = mediaType;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Conversation teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Parent getParent() {
        return parent;
    }

    public Conversation parent(Parent parent) {
        this.parent = parent;
        return this;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
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
        Conversation conversation = (Conversation) o;
        if (conversation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), conversation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Conversation{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", sentOn='" + getSentOn() + "'" +
            ", status='" + getStatus() + "'" +
            ", fileUrl='" + getFileUrl() + "'" +
            ", mediaType='" + getMediaType() + "'" +
            "}";
    }
}
