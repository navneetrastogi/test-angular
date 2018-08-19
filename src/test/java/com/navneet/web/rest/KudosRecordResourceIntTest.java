package com.navneet.web.rest;

import com.navneet.TestangularApp;

import com.navneet.domain.KudosRecord;
import com.navneet.repository.KudosRecordRepository;
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
 * Test class for the KudosRecordResource REST controller.
 *
 * @see KudosRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestangularApp.class)
public class KudosRecordResourceIntTest {

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private KudosRecordRepository kudosRecordRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restKudosRecordMockMvc;

    private KudosRecord kudosRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KudosRecordResource kudosRecordResource = new KudosRecordResource(kudosRecordRepository);
        this.restKudosRecordMockMvc = MockMvcBuilders.standaloneSetup(kudosRecordResource)
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
    public static KudosRecord createEntity(EntityManager em) {
        KudosRecord kudosRecord = new KudosRecord()
            .createdOn(DEFAULT_CREATED_ON)
            .notes(DEFAULT_NOTES);
        return kudosRecord;
    }

    @Before
    public void initTest() {
        kudosRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createKudosRecord() throws Exception {
        int databaseSizeBeforeCreate = kudosRecordRepository.findAll().size();

        // Create the KudosRecord
        restKudosRecordMockMvc.perform(post("/api/kudos-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kudosRecord)))
            .andExpect(status().isCreated());

        // Validate the KudosRecord in the database
        List<KudosRecord> kudosRecordList = kudosRecordRepository.findAll();
        assertThat(kudosRecordList).hasSize(databaseSizeBeforeCreate + 1);
        KudosRecord testKudosRecord = kudosRecordList.get(kudosRecordList.size() - 1);
        assertThat(testKudosRecord.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testKudosRecord.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    @Transactional
    public void createKudosRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kudosRecordRepository.findAll().size();

        // Create the KudosRecord with an existing ID
        kudosRecord.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKudosRecordMockMvc.perform(post("/api/kudos-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kudosRecord)))
            .andExpect(status().isBadRequest());

        // Validate the KudosRecord in the database
        List<KudosRecord> kudosRecordList = kudosRecordRepository.findAll();
        assertThat(kudosRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllKudosRecords() throws Exception {
        // Initialize the database
        kudosRecordRepository.saveAndFlush(kudosRecord);

        // Get all the kudosRecordList
        restKudosRecordMockMvc.perform(get("/api/kudos-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kudosRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())));
    }
    

    @Test
    @Transactional
    public void getKudosRecord() throws Exception {
        // Initialize the database
        kudosRecordRepository.saveAndFlush(kudosRecord);

        // Get the kudosRecord
        restKudosRecordMockMvc.perform(get("/api/kudos-records/{id}", kudosRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kudosRecord.getId().intValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingKudosRecord() throws Exception {
        // Get the kudosRecord
        restKudosRecordMockMvc.perform(get("/api/kudos-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKudosRecord() throws Exception {
        // Initialize the database
        kudosRecordRepository.saveAndFlush(kudosRecord);

        int databaseSizeBeforeUpdate = kudosRecordRepository.findAll().size();

        // Update the kudosRecord
        KudosRecord updatedKudosRecord = kudosRecordRepository.findById(kudosRecord.getId()).get();
        // Disconnect from session so that the updates on updatedKudosRecord are not directly saved in db
        em.detach(updatedKudosRecord);
        updatedKudosRecord
            .createdOn(UPDATED_CREATED_ON)
            .notes(UPDATED_NOTES);

        restKudosRecordMockMvc.perform(put("/api/kudos-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKudosRecord)))
            .andExpect(status().isOk());

        // Validate the KudosRecord in the database
        List<KudosRecord> kudosRecordList = kudosRecordRepository.findAll();
        assertThat(kudosRecordList).hasSize(databaseSizeBeforeUpdate);
        KudosRecord testKudosRecord = kudosRecordList.get(kudosRecordList.size() - 1);
        assertThat(testKudosRecord.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testKudosRecord.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void updateNonExistingKudosRecord() throws Exception {
        int databaseSizeBeforeUpdate = kudosRecordRepository.findAll().size();

        // Create the KudosRecord

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restKudosRecordMockMvc.perform(put("/api/kudos-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kudosRecord)))
            .andExpect(status().isBadRequest());

        // Validate the KudosRecord in the database
        List<KudosRecord> kudosRecordList = kudosRecordRepository.findAll();
        assertThat(kudosRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKudosRecord() throws Exception {
        // Initialize the database
        kudosRecordRepository.saveAndFlush(kudosRecord);

        int databaseSizeBeforeDelete = kudosRecordRepository.findAll().size();

        // Get the kudosRecord
        restKudosRecordMockMvc.perform(delete("/api/kudos-records/{id}", kudosRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<KudosRecord> kudosRecordList = kudosRecordRepository.findAll();
        assertThat(kudosRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KudosRecord.class);
        KudosRecord kudosRecord1 = new KudosRecord();
        kudosRecord1.setId(1L);
        KudosRecord kudosRecord2 = new KudosRecord();
        kudosRecord2.setId(kudosRecord1.getId());
        assertThat(kudosRecord1).isEqualTo(kudosRecord2);
        kudosRecord2.setId(2L);
        assertThat(kudosRecord1).isNotEqualTo(kudosRecord2);
        kudosRecord1.setId(null);
        assertThat(kudosRecord1).isNotEqualTo(kudosRecord2);
    }
}
