package com.navneet.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.navneet.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.navneet.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.navneet.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Organization.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Organization.class.getName() + ".centers", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Center.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Center.class.getName() + ".rooms", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Center.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Center.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Center.class.getName() + ".holidays", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Room.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Room.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Room.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Schedule.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Schedule.class.getName() + ".rooms", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Schedule.class.getName() + ".events", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Schedule.class.getName() + ".activities", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Schedule.class.getName() + ".timelines", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Event.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Event.class.getName() + ".photos", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Event.class.getName() + ".videos", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Activity.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Activity.class.getName() + ".photos", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Activity.class.getName() + ".videos", jcacheConfiguration);
            cm.createCache(com.navneet.domain.ActivityType.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Photo.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Video.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".immunizationRecords", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".illnessRecords", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".payments", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".kudosRecords", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".milestoneRecords", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".attendances", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".incidents", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".timelines", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".parents", jcacheConfiguration);
            cm.createCache(com.navneet.domain.StudentProfile.class.getName() + ".galleryItems", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Teacher.class.getName() + ".conversations", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Holiday.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Kudos.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Kudos.class.getName() + ".kudosRecords", jcacheConfiguration);
            cm.createCache(com.navneet.domain.KudosRecord.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Milestone.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Milestone.class.getName() + ".milestoneRecords", jcacheConfiguration);
            cm.createCache(com.navneet.domain.MilestoneRecord.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Incident.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Incident.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Gallery.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Payment.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.ImmunizationRecord.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.IllnessRecord.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Attendance.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Parent.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Parent.class.getName() + ".features", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Parent.class.getName() + ".notifications", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Parent.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Parent.class.getName() + ".permissions", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Parent.class.getName() + ".conversations", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Permission.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Feature.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Notification.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.TaskType.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.TaskType.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(com.navneet.domain.Conversation.class.getName(), jcacheConfiguration);
            cm.createCache(com.navneet.domain.Timeline.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
