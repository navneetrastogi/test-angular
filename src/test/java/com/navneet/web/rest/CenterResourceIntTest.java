package com.navneet.web.rest;

import com.navneet.TestangularApp;

import com.navneet.domain.Center;
import com.navneet.repository.CenterRepository;
import com.navneet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.navneet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CenterResource REST controller.
 *
 * @see CenterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestangularApp.class)
public class CenterResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_MODIFIED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFIED_ON = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CenterRepository centerRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCenterMockMvc;

    private Center center;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CenterResource centerResource = new CenterResource(centerRepository);
        this.restCenterMockMvc = MockMvcBuilders.standaloneSetup(centerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Center createEntity(EntityManager em) {
        Center center = new Center()
            .name(DEFAULT_NAME)
            .createdOn(DEFAULT_CREATED_ON)
            .lastModifiedOn(DEFAULT_LAST_MODIFIED_ON);
        return center;
    }

    @Before
    public void initTest() {
        center = createEntity(em);
    }

    @Test
    @Transactional
    public void createCenter() throws Exception {
        int databaseSizeBeforeCreate = centerRepository.findAll().size();

        // Create the Center
        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(center)))
            .andExpect(status().isCreated());

        // Validate the Center in the database
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeCreate + 1);
        Center testCenter = centerList.get(centerList.size() - 1);
        assertThat(testCenter.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCenter.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testCenter.getLastModifiedOn()).isEqualTo(DEFAULT_LAST_MODIFIED_ON);
    }

    @Test
    @Transactional
    public void createCenterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = centerRepository.findAll().size();

        // Create the Center with an existing ID
        center.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(center)))
            .andExpect(status().isBadRequest());

        // Validate the Center in the database
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCenters() throws Exception {
        // Initialize the database
        centerRepository.saveAndFlush(center);

        // Get all the centerList
        restCenterMockMvc.perform(get("/api/centers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(center.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedOn").value(hasItem(DEFAULT_LAST_MODIFIED_ON.toString())));
    }
    

    @Test
    @Transactional
    public void getCenter() throws Exception {
        // Initialize the database
        centerRepository.saveAndFlush(center);

        // Get the center
        restCenterMockMvc.perform(get("/api/centers/{id}", center.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(center.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.lastModifiedOn").value(DEFAULT_LAST_MODIFIED_ON.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCenter() throws Exception {
        // Get the center
        restCenterMockMvc.perform(get("/api/centers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCenter() throws Exception {
        // Initialize the database
        centerRepository.saveAndFlush(center);

        int databaseSizeBeforeUpdate = centerRepository.findAll().size();

        // Update the center
        Center updatedCenter = centerRepository.findById(center.getId()).get();
        // Disconnect from session so that the updates on updatedCenter are not directly saved in db
        em.detach(updatedCenter);
        updatedCenter
            .name(UPDATED_NAME)
            .createdOn(UPDATED_CREATED_ON)
            .lastModifiedOn(UPDATED_LAST_MODIFIED_ON);

        restCenterMockMvc.perform(put("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCenter)))
            .andExpect(status().isOk());

        // Validate the Center in the database
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeUpdate);
        Center testCenter = centerList.get(centerList.size() - 1);
        assertThat(testCenter.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCenter.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testCenter.getLastModifiedOn()).isEqualTo(UPDATED_LAST_MODIFIED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingCenter() throws Exception {
        int databaseSizeBeforeUpdate = centerRepository.findAll().size();

        // Create the Center

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCenterMockMvc.perform(put("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(center)))
            .andExpect(status().isBadRequest());

        // Validate the Center in the database
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCenter() throws Exception {
        // Initialize the database
        centerRepository.saveAndFlush(center);

        int databaseSizeBeforeDelete = centerRepository.findAll().size();

        // Get the center
        restCenterMockMvc.perform(delete("/api/centers/{id}", center.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Center.class);
        Center center1 = new Center();
        center1.setId(1L);
        Center center2 = new Center();
        center2.setId(center1.getId());
        assertThat(center1).isEqualTo(center2);
        center2.setId(2L);
        assertThat(center1).isNotEqualTo(center2);
        center1.setId(null);
        assertThat(center1).isNotEqualTo(center2);
    }
}
