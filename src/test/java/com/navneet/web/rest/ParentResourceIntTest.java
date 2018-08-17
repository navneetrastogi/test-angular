package com.navneet.web.rest;

import com.navneet.TestangularApp;

import com.navneet.domain.Parent;
import com.navneet.repository.ParentRepository;
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

import com.navneet.domain.enumeration.Relation;
/**
 * Test class for the ParentResource REST controller.
 *
 * @see ParentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestangularApp.class)
public class ParentResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final Relation DEFAULT_RELATION = Relation.FATHER;
    private static final Relation UPDATED_RELATION = Relation.MOTHER;

    private static final String DEFAULT_STUDENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STUDENT_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACCOUNT_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACCOUNT_ACTIVE = true;

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private ParentRepository parentRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParentMockMvc;

    private Parent parent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParentResource parentResource = new ParentResource(parentRepository);
        this.restParentMockMvc = MockMvcBuilders.standaloneSetup(parentResource)
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
    public static Parent createEntity(EntityManager em) {
        Parent parent = new Parent()
            .name(DEFAULT_NAME)
            .createdOn(DEFAULT_CREATED_ON)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .relation(DEFAULT_RELATION)
            .studentName(DEFAULT_STUDENT_NAME)
            .isAccountActive(DEFAULT_IS_ACCOUNT_ACTIVE)
            .email(DEFAULT_EMAIL);
        return parent;
    }

    @Before
    public void initTest() {
        parent = createEntity(em);
    }

    @Test
    @Transactional
    public void createParent() throws Exception {
        int databaseSizeBeforeCreate = parentRepository.findAll().size();

        // Create the Parent
        restParentMockMvc.perform(post("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parent)))
            .andExpect(status().isCreated());

        // Validate the Parent in the database
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeCreate + 1);
        Parent testParent = parentList.get(parentList.size() - 1);
        assertThat(testParent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testParent.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testParent.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testParent.getRelation()).isEqualTo(DEFAULT_RELATION);
        assertThat(testParent.getStudentName()).isEqualTo(DEFAULT_STUDENT_NAME);
        assertThat(testParent.isIsAccountActive()).isEqualTo(DEFAULT_IS_ACCOUNT_ACTIVE);
        assertThat(testParent.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createParentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parentRepository.findAll().size();

        // Create the Parent with an existing ID
        parent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParentMockMvc.perform(post("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parent)))
            .andExpect(status().isBadRequest());

        // Validate the Parent in the database
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParents() throws Exception {
        // Initialize the database
        parentRepository.saveAndFlush(parent);

        // Get all the parentList
        restParentMockMvc.perform(get("/api/parents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parent.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].relation").value(hasItem(DEFAULT_RELATION.toString())))
            .andExpect(jsonPath("$.[*].studentName").value(hasItem(DEFAULT_STUDENT_NAME.toString())))
            .andExpect(jsonPath("$.[*].isAccountActive").value(hasItem(DEFAULT_IS_ACCOUNT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    

    @Test
    @Transactional
    public void getParent() throws Exception {
        // Initialize the database
        parentRepository.saveAndFlush(parent);

        // Get the parent
        restParentMockMvc.perform(get("/api/parents/{id}", parent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parent.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.relation").value(DEFAULT_RELATION.toString()))
            .andExpect(jsonPath("$.studentName").value(DEFAULT_STUDENT_NAME.toString()))
            .andExpect(jsonPath("$.isAccountActive").value(DEFAULT_IS_ACCOUNT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingParent() throws Exception {
        // Get the parent
        restParentMockMvc.perform(get("/api/parents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParent() throws Exception {
        // Initialize the database
        parentRepository.saveAndFlush(parent);

        int databaseSizeBeforeUpdate = parentRepository.findAll().size();

        // Update the parent
        Parent updatedParent = parentRepository.findById(parent.getId()).get();
        // Disconnect from session so that the updates on updatedParent are not directly saved in db
        em.detach(updatedParent);
        updatedParent
            .name(UPDATED_NAME)
            .createdOn(UPDATED_CREATED_ON)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .relation(UPDATED_RELATION)
            .studentName(UPDATED_STUDENT_NAME)
            .isAccountActive(UPDATED_IS_ACCOUNT_ACTIVE)
            .email(UPDATED_EMAIL);

        restParentMockMvc.perform(put("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParent)))
            .andExpect(status().isOk());

        // Validate the Parent in the database
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeUpdate);
        Parent testParent = parentList.get(parentList.size() - 1);
        assertThat(testParent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testParent.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testParent.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testParent.getRelation()).isEqualTo(UPDATED_RELATION);
        assertThat(testParent.getStudentName()).isEqualTo(UPDATED_STUDENT_NAME);
        assertThat(testParent.isIsAccountActive()).isEqualTo(UPDATED_IS_ACCOUNT_ACTIVE);
        assertThat(testParent.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingParent() throws Exception {
        int databaseSizeBeforeUpdate = parentRepository.findAll().size();

        // Create the Parent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restParentMockMvc.perform(put("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parent)))
            .andExpect(status().isBadRequest());

        // Validate the Parent in the database
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParent() throws Exception {
        // Initialize the database
        parentRepository.saveAndFlush(parent);

        int databaseSizeBeforeDelete = parentRepository.findAll().size();

        // Get the parent
        restParentMockMvc.perform(delete("/api/parents/{id}", parent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parent.class);
        Parent parent1 = new Parent();
        parent1.setId(1L);
        Parent parent2 = new Parent();
        parent2.setId(parent1.getId());
        assertThat(parent1).isEqualTo(parent2);
        parent2.setId(2L);
        assertThat(parent1).isNotEqualTo(parent2);
        parent1.setId(null);
        assertThat(parent1).isNotEqualTo(parent2);
    }
}
