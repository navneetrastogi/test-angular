package com.navneet.web.rest;

import com.navneet.TestangularApp;

import com.navneet.domain.ImmunizationRecord;
import com.navneet.repository.ImmunizationRecordRepository;
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
 * Test class for the ImmunizationRecordResource REST controller.
 *
 * @see ImmunizationRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestangularApp.class)
public class ImmunizationRecordResourceIntTest {

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_VACCINATION_DONE_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VACCINATION_DONE_ON = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_VACCINATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_VACCINATION_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ON_TIME = false;
    private static final Boolean UPDATED_IS_ON_TIME = true;

    @Autowired
    private ImmunizationRecordRepository immunizationRecordRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restImmunizationRecordMockMvc;

    private ImmunizationRecord immunizationRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImmunizationRecordResource immunizationRecordResource = new ImmunizationRecordResource(immunizationRecordRepository);
        this.restImmunizationRecordMockMvc = MockMvcBuilders.standaloneSetup(immunizationRecordResource)
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
    public static ImmunizationRecord createEntity(EntityManager em) {
        ImmunizationRecord immunizationRecord = new ImmunizationRecord()
            .createdOn(DEFAULT_CREATED_ON)
            .vaccinationDoneOn(DEFAULT_VACCINATION_DONE_ON)
            .vaccinationName(DEFAULT_VACCINATION_NAME)
            .isOnTime(DEFAULT_IS_ON_TIME);
        return immunizationRecord;
    }

    @Before
    public void initTest() {
        immunizationRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createImmunizationRecord() throws Exception {
        int databaseSizeBeforeCreate = immunizationRecordRepository.findAll().size();

        // Create the ImmunizationRecord
        restImmunizationRecordMockMvc.perform(post("/api/immunization-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(immunizationRecord)))
            .andExpect(status().isCreated());

        // Validate the ImmunizationRecord in the database
        List<ImmunizationRecord> immunizationRecordList = immunizationRecordRepository.findAll();
        assertThat(immunizationRecordList).hasSize(databaseSizeBeforeCreate + 1);
        ImmunizationRecord testImmunizationRecord = immunizationRecordList.get(immunizationRecordList.size() - 1);
        assertThat(testImmunizationRecord.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testImmunizationRecord.getVaccinationDoneOn()).isEqualTo(DEFAULT_VACCINATION_DONE_ON);
        assertThat(testImmunizationRecord.getVaccinationName()).isEqualTo(DEFAULT_VACCINATION_NAME);
        assertThat(testImmunizationRecord.isIsOnTime()).isEqualTo(DEFAULT_IS_ON_TIME);
    }

    @Test
    @Transactional
    public void createImmunizationRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = immunizationRecordRepository.findAll().size();

        // Create the ImmunizationRecord with an existing ID
        immunizationRecord.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImmunizationRecordMockMvc.perform(post("/api/immunization-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(immunizationRecord)))
            .andExpect(status().isBadRequest());

        // Validate the ImmunizationRecord in the database
        List<ImmunizationRecord> immunizationRecordList = immunizationRecordRepository.findAll();
        assertThat(immunizationRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImmunizationRecords() throws Exception {
        // Initialize the database
        immunizationRecordRepository.saveAndFlush(immunizationRecord);

        // Get all the immunizationRecordList
        restImmunizationRecordMockMvc.perform(get("/api/immunization-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(immunizationRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].vaccinationDoneOn").value(hasItem(DEFAULT_VACCINATION_DONE_ON.toString())))
            .andExpect(jsonPath("$.[*].vaccinationName").value(hasItem(DEFAULT_VACCINATION_NAME.toString())))
            .andExpect(jsonPath("$.[*].isOnTime").value(hasItem(DEFAULT_IS_ON_TIME.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getImmunizationRecord() throws Exception {
        // Initialize the database
        immunizationRecordRepository.saveAndFlush(immunizationRecord);

        // Get the immunizationRecord
        restImmunizationRecordMockMvc.perform(get("/api/immunization-records/{id}", immunizationRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(immunizationRecord.getId().intValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.vaccinationDoneOn").value(DEFAULT_VACCINATION_DONE_ON.toString()))
            .andExpect(jsonPath("$.vaccinationName").value(DEFAULT_VACCINATION_NAME.toString()))
            .andExpect(jsonPath("$.isOnTime").value(DEFAULT_IS_ON_TIME.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingImmunizationRecord() throws Exception {
        // Get the immunizationRecord
        restImmunizationRecordMockMvc.perform(get("/api/immunization-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImmunizationRecord() throws Exception {
        // Initialize the database
        immunizationRecordRepository.saveAndFlush(immunizationRecord);

        int databaseSizeBeforeUpdate = immunizationRecordRepository.findAll().size();

        // Update the immunizationRecord
        ImmunizationRecord updatedImmunizationRecord = immunizationRecordRepository.findById(immunizationRecord.getId()).get();
        // Disconnect from session so that the updates on updatedImmunizationRecord are not directly saved in db
        em.detach(updatedImmunizationRecord);
        updatedImmunizationRecord
            .createdOn(UPDATED_CREATED_ON)
            .vaccinationDoneOn(UPDATED_VACCINATION_DONE_ON)
            .vaccinationName(UPDATED_VACCINATION_NAME)
            .isOnTime(UPDATED_IS_ON_TIME);

        restImmunizationRecordMockMvc.perform(put("/api/immunization-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImmunizationRecord)))
            .andExpect(status().isOk());

        // Validate the ImmunizationRecord in the database
        List<ImmunizationRecord> immunizationRecordList = immunizationRecordRepository.findAll();
        assertThat(immunizationRecordList).hasSize(databaseSizeBeforeUpdate);
        ImmunizationRecord testImmunizationRecord = immunizationRecordList.get(immunizationRecordList.size() - 1);
        assertThat(testImmunizationRecord.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testImmunizationRecord.getVaccinationDoneOn()).isEqualTo(UPDATED_VACCINATION_DONE_ON);
        assertThat(testImmunizationRecord.getVaccinationName()).isEqualTo(UPDATED_VACCINATION_NAME);
        assertThat(testImmunizationRecord.isIsOnTime()).isEqualTo(UPDATED_IS_ON_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingImmunizationRecord() throws Exception {
        int databaseSizeBeforeUpdate = immunizationRecordRepository.findAll().size();

        // Create the ImmunizationRecord

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restImmunizationRecordMockMvc.perform(put("/api/immunization-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(immunizationRecord)))
            .andExpect(status().isBadRequest());

        // Validate the ImmunizationRecord in the database
        List<ImmunizationRecord> immunizationRecordList = immunizationRecordRepository.findAll();
        assertThat(immunizationRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImmunizationRecord() throws Exception {
        // Initialize the database
        immunizationRecordRepository.saveAndFlush(immunizationRecord);

        int databaseSizeBeforeDelete = immunizationRecordRepository.findAll().size();

        // Get the immunizationRecord
        restImmunizationRecordMockMvc.perform(delete("/api/immunization-records/{id}", immunizationRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ImmunizationRecord> immunizationRecordList = immunizationRecordRepository.findAll();
        assertThat(immunizationRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImmunizationRecord.class);
        ImmunizationRecord immunizationRecord1 = new ImmunizationRecord();
        immunizationRecord1.setId(1L);
        ImmunizationRecord immunizationRecord2 = new ImmunizationRecord();
        immunizationRecord2.setId(immunizationRecord1.getId());
        assertThat(immunizationRecord1).isEqualTo(immunizationRecord2);
        immunizationRecord2.setId(2L);
        assertThat(immunizationRecord1).isNotEqualTo(immunizationRecord2);
        immunizationRecord1.setId(null);
        assertThat(immunizationRecord1).isNotEqualTo(immunizationRecord2);
    }
}
