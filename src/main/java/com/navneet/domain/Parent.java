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

import com.navneet.domain.enumeration.Relation;

/**
 * A Parent.
 */
@Entity
@Table(name = "parent")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Parent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "relation")
    private Relation relation;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "is_account_active")
    private Boolean isAccountActive;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JsonIgnoreProperties("parents")
    private StudentProfile studentProfile;

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Feature> features = new HashSet<>();

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Notification> notifications = new HashSet<>();

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Permission> permissions = new HashSet<>();

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Conversation> conversations = new HashSet<>();

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

    public Parent name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Parent createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Parent phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Relation getRelation() {
        return relation;
    }

    public Parent relation(Relation relation) {
        this.relation = relation;
        return this;
    }

    public void setRelation(Relation relation) {
        this.relation = relation;
    }

    public String getStudentName() {
        return studentName;
    }

    public Parent studentName(String studentName) {
        this.studentName = studentName;
        return this;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Boolean isIsAccountActive() {
        return isAccountActive;
    }

    public Parent isAccountActive(Boolean isAccountActive) {
        this.isAccountActive = isAccountActive;
        return this;
    }

    public void setIsAccountActive(Boolean isAccountActive) {
        this.isAccountActive = isAccountActive;
    }

    public String getEmail() {
        return email;
    }

    public Parent email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public Parent studentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
        return this;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
    }

    public Set<Feature> getFeatures() {
        return features;
    }

    public Parent features(Set<Feature> features) {
        this.features = features;
        return this;
    }

    public Parent addFeatures(Feature feature) {
        this.features.add(feature);
        feature.setParent(this);
        return this;
    }

    public Parent removeFeatures(Feature feature) {
        this.features.remove(feature);
        feature.setParent(null);
        return this;
    }

    public void setFeatures(Set<Feature> features) {
        this.features = features;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public Parent notifications(Set<Notification> notifications) {
        this.notifications = notifications;
        return this;
    }

    public Parent addNotifications(Notification notification) {
        this.notifications.add(notification);
        notification.setParent(this);
        return this;
    }

    public Parent removeNotifications(Notification notification) {
        this.notifications.remove(notification);
        notification.setParent(null);
        return this;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Parent tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Parent addTasks(Task task) {
        this.tasks.add(task);
        task.setParent(this);
        return this;
    }

    public Parent removeTasks(Task task) {
        this.tasks.remove(task);
        task.setParent(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Parent permissions(Set<Permission> permissions) {
        this.permissions = permissions;
        return this;
    }

    public Parent addPermissions(Permission permission) {
        this.permissions.add(permission);
        permission.setParent(this);
        return this;
    }

    public Parent removePermissions(Permission permission) {
        this.permissions.remove(permission);
        permission.setParent(null);
        return this;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Conversation> getConversations() {
        return conversations;
    }

    public Parent conversations(Set<Conversation> conversations) {
        this.conversations = conversations;
        return this;
    }

    public Parent addConversation(Conversation conversation) {
        this.conversations.add(conversation);
        conversation.setParent(this);
        return this;
    }

    public Parent removeConversation(Conversation conversation) {
        this.conversations.remove(conversation);
        conversation.setParent(null);
        return this;
    }

    public void setConversations(Set<Conversation> conversations) {
        this.conversations = conversations;
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
        Parent parent = (Parent) o;
        if (parent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parent{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", relation='" + getRelation() + "'" +
            ", studentName='" + getStudentName() + "'" +
            ", isAccountActive='" + isIsAccountActive() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
