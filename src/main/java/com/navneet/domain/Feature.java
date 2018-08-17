package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.navneet.domain.enumeration.FeatureType;

/**
 * A Feature.
 */
@Entity
@Table(name = "feature")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Feature implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "feature_type")
    private FeatureType featureType;

    @ManyToOne
    @JsonIgnoreProperties("features")
    private Parent parent;

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

    public Feature name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FeatureType getFeatureType() {
        return featureType;
    }

    public Feature featureType(FeatureType featureType) {
        this.featureType = featureType;
        return this;
    }

    public void setFeatureType(FeatureType featureType) {
        this.featureType = featureType;
    }

    public Parent getParent() {
        return parent;
    }

    public Feature parent(Parent parent) {
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
        Feature feature = (Feature) o;
        if (feature.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), feature.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Feature{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", featureType='" + getFeatureType() + "'" +
            "}";
    }
}
