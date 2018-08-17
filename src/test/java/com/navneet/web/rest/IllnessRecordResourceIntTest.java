package com.navneet.web.rest;

import com.navneet.TestangularApp;

import com.navneet.domain.IllnessRecord;
import com.navneet.repository.IllnessRecordRepository;
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
 * Test class for the IllnessRecordResource REST controller.
 *
 * @see IllnessRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestangularApp.class)
public class IllnessRecordResourceIntTest {

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_CURED = false;
    private static final Boolean UPDATED_IS_CURED = true;

    @Autowired
    private IllnessRecordRepository illnessRecordRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIllnessRecordMockMvc;

    private IllnessRecord illnessRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IllnessRecordResource illnessRecordResource = new IllnessRecordResource(illnessRecordRepository);
        this.restIllnessRecordMockMvc = MockMvcBuilders.standaloneSetup(illnessRecordResource)
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
    public static IllnessRecord createEntity(EntityManager em) {
        IllnessRecord illnessRecord = new IllnessRecord()
            .createdOn(DEFAULT_CREATED_ON)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .isCured(DEFAULT_IS_CURED);
        return illnessRecord;
    }

    @Before
    public void initTest() {
        illnessRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createIllnessRecord() throws Exception {
        int databaseSizeBeforeCreate = illnessRecordRepository.findAll().size();

        // Create the IllnessRecord
        restIllnessRecordMockMvc.perform(post("/api/illness-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(illnessRecord)))
            .andExpect(status().isCreated());

        // Validate the IllnessRecord in the database
        List<IllnessRecord> illnessRecordList = illnessRecordRepository.findAll();
        assertThat(illnessRecordList).hasSize(databaseSizeBeforeCreate + 1);
        IllnessRecord testIllnessRecord = illnessRecordList.get(illnessRecordList.size() - 1);
        assertThat(testIllnessRecord.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testIllnessRecord.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testIllnessRecord.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testIllnessRecord.isIsCured()).isEqualTo(DEFAULT_IS_CURED);
    }

    @Test
    @Transactional
    public void createIllnessRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = illnessRecordRepository.findAll().size();

        // Create the IllnessRecord with an existing ID
        illnessRecord.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIllnessRecordMockMvc.perform(post("/api/illness-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(illnessRecord)))
            .andExpect(status().isBadRequest());

        // Validate the IllnessRecord in the database
        List<IllnessRecord> illnessRecordList = illnessRecordRepository.findAll();
        assertThat(illnessRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIllnessRecords() throws Exception {
        // Initialize the database
        illnessRecordRepository.saveAndFlush(illnessRecord);

        // Get all the illnessRecordList
        restIllnessRecordMockMvc.perform(get("/api/illness-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(illnessRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].isCured").value(hasItem(DEFAULT_IS_CURED.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getIllnessRecord() throws Exception {
        // Initialize the database
        illnessRecordRepository.saveAndFlush(illnessRecord);

        // Get the illnessRecord
        restIllnessRecordMockMvc.perform(get("/api/illness-records/{id}", illnessRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(illnessRecord.getId().intValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.isCured").value(DEFAULT_IS_CURED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingIllnessRecord() throws Exception {
        // Get the illnessRecord
        restIllnessRecordMockMvc.perform(get("/api/illness-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIllnessRecord() throws Exception {
        // Initialize the database
        illnessRecordRepository.saveAndFlush(illnessRecord);

        int databaseSizeBeforeUpdate = illnessRecordRepository.findAll().size();

        // Update the illnessRecord
        IllnessRecord updatedIllnessRecord = illnessRecordRepository.findById(illnessRecord.getId()).get();
        // Disconnect from session so that the updates on updatedIllnessRecord are not directly saved in db
        em.detach(updatedIllnessRecord);
        updatedIllnessRecord
            .createdOn(UPDATED_CREATED_ON)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .isCured(UPDATED_IS_CURED);

        restIllnessRecordMockMvc.perform(put("/api/illness-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIllnessRecord)))
            .andExpect(status().isOk());

        // Validate the IllnessRecord in the database
        List<IllnessRecord> illnessRecordList = illnessRecordRepository.findAll();
        assertThat(illnessRecordList).hasSize(databaseSizeBeforeUpdate);
        IllnessRecord testIllnessRecord = illnessRecordList.get(illnessRecordList.size() - 1);
        assertThat(testIllnessRecord.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testIllnessRecord.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testIllnessRecord.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testIllnessRecord.isIsCured()).isEqualTo(UPDATED_IS_CURED);
    }

    @Test
    @Transactional
    public void updateNonExistingIllnessRecord() throws Exception {
        int databaseSizeBeforeUpdate = illnessRecordRepository.findAll().size();

        // Create the IllnessRecord

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restIllnessRecordMockMvc.perform(put("/api/illness-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(illnessRecord)))
            .andExpect(status().isBadRequest());

        // Validate the IllnessRecord in the database
        List<IllnessRecord> illnessRecordList = illnessRecordRepository.findAll();
        assertThat(illnessRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIllnessRecord() throws Exception {
        // Initialize the database
        illnessRecordRepository.saveAndFlush(illnessRecord);

        int databaseSizeBeforeDelete = illnessRecordRepository.findAll().size();

        // Get the illnessRecord
        restIllnessRecordMockMvc.perform(delete("/api/illness-records/{id}", illnessRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IllnessRecord> illnessRecordList = illnessRecordRepository.findAll();
        assertThat(illnessRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IllnessRecord.class);
        IllnessRecord illnessRecord1 = new IllnessRecord();
        illnessRecord1.setId(1L);
        IllnessRecord illnessRecord2 = new IllnessRecord();
        illnessRecord2.setId(illnessRecord1.getId());
        assertThat(illnessRecord1).isEqualTo(illnessRecord2);
        illnessRecord2.setId(2L);
        assertThat(illnessRecord1).isNotEqualTo(illnessRecord2);
        illnessRecord1.setId(null);
        assertThat(illnessRecord1).isNotEqualTo(illnessRecord2);
    }
}
