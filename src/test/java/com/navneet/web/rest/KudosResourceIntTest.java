package com.navneet.web.rest;

import com.navneet.TestangularApp;

import com.navneet.domain.Kudos;
import com.navneet.repository.KudosRepository;
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
 * Test class for the KudosResource REST controller.
 *
 * @see KudosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestangularApp.class)
public class KudosResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_MODIFIED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFIED_ON = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private KudosRepository kudosRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restKudosMockMvc;

    private Kudos kudos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KudosResource kudosResource = new KudosResource(kudosRepository);
        this.restKudosMockMvc = MockMvcBuilders.standaloneSetup(kudosResource)
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
    public static Kudos createEntity(EntityManager em) {
        Kudos kudos = new Kudos()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .imageUrl(DEFAULT_IMAGE_URL)
            .createdOn(DEFAULT_CREATED_ON)
            .lastModifiedOn(DEFAULT_LAST_MODIFIED_ON);
        return kudos;
    }

    @Before
    public void initTest() {
        kudos = createEntity(em);
    }

    @Test
    @Transactional
    public void createKudos() throws Exception {
        int databaseSizeBeforeCreate = kudosRepository.findAll().size();

        // Create the Kudos
        restKudosMockMvc.perform(post("/api/kudos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kudos)))
            .andExpect(status().isCreated());

        // Validate the Kudos in the database
        List<Kudos> kudosList = kudosRepository.findAll();
        assertThat(kudosList).hasSize(databaseSizeBeforeCreate + 1);
        Kudos testKudos = kudosList.get(kudosList.size() - 1);
        assertThat(testKudos.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testKudos.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testKudos.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testKudos.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testKudos.getLastModifiedOn()).isEqualTo(DEFAULT_LAST_MODIFIED_ON);
    }

    @Test
    @Transactional
    public void createKudosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kudosRepository.findAll().size();

        // Create the Kudos with an existing ID
        kudos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKudosMockMvc.perform(post("/api/kudos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kudos)))
            .andExpect(status().isBadRequest());

        // Validate the Kudos in the database
        List<Kudos> kudosList = kudosRepository.findAll();
        assertThat(kudosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllKudos() throws Exception {
        // Initialize the database
        kudosRepository.saveAndFlush(kudos);

        // Get all the kudosList
        restKudosMockMvc.perform(get("/api/kudos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kudos.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL.toString())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedOn").value(hasItem(DEFAULT_LAST_MODIFIED_ON.toString())));
    }
    

    @Test
    @Transactional
    public void getKudos() throws Exception {
        // Initialize the database
        kudosRepository.saveAndFlush(kudos);

        // Get the kudos
        restKudosMockMvc.perform(get("/api/kudos/{id}", kudos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kudos.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL.toString()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.lastModifiedOn").value(DEFAULT_LAST_MODIFIED_ON.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingKudos() throws Exception {
        // Get the kudos
        restKudosMockMvc.perform(get("/api/kudos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKudos() throws Exception {
        // Initialize the database
        kudosRepository.saveAndFlush(kudos);

        int databaseSizeBeforeUpdate = kudosRepository.findAll().size();

        // Update the kudos
        Kudos updatedKudos = kudosRepository.findById(kudos.getId()).get();
        // Disconnect from session so that the updates on updatedKudos are not directly saved in db
        em.detach(updatedKudos);
        updatedKudos
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .imageUrl(UPDATED_IMAGE_URL)
            .createdOn(UPDATED_CREATED_ON)
            .lastModifiedOn(UPDATED_LAST_MODIFIED_ON);

        restKudosMockMvc.perform(put("/api/kudos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKudos)))
            .andExpect(status().isOk());

        // Validate the Kudos in the database
        List<Kudos> kudosList = kudosRepository.findAll();
        assertThat(kudosList).hasSize(databaseSizeBeforeUpdate);
        Kudos testKudos = kudosList.get(kudosList.size() - 1);
        assertThat(testKudos.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testKudos.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testKudos.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testKudos.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testKudos.getLastModifiedOn()).isEqualTo(UPDATED_LAST_MODIFIED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingKudos() throws Exception {
        int databaseSizeBeforeUpdate = kudosRepository.findAll().size();

        // Create the Kudos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restKudosMockMvc.perform(put("/api/kudos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kudos)))
            .andExpect(status().isBadRequest());

        // Validate the Kudos in the database
        List<Kudos> kudosList = kudosRepository.findAll();
        assertThat(kudosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKudos() throws Exception {
        // Initialize the database
        kudosRepository.saveAndFlush(kudos);

        int databaseSizeBeforeDelete = kudosRepository.findAll().size();

        // Get the kudos
        restKudosMockMvc.perform(delete("/api/kudos/{id}", kudos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Kudos> kudosList = kudosRepository.findAll();
        assertThat(kudosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Kudos.class);
        Kudos kudos1 = new Kudos();
        kudos1.setId(1L);
        Kudos kudos2 = new Kudos();
        kudos2.setId(kudos1.getId());
        assertThat(kudos1).isEqualTo(kudos2);
        kudos2.setId(2L);
        assertThat(kudos1).isNotEqualTo(kudos2);
        kudos1.setId(null);
        assertThat(kudos1).isNotEqualTo(kudos2);
    }
}
