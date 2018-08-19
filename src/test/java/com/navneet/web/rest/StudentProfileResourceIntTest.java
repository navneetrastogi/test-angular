package com.navneet.web.rest;

import com.navneet.TestangularApp;

import com.navneet.domain.StudentProfile;
import com.navneet.repository.StudentProfileRepository;
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

import com.navneet.domain.enumeration.Gender;
/**
 * Test class for the StudentProfileResource REST controller.
 *
 * @see StudentProfileResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestangularApp.class)
public class StudentProfileResourceIntTest {

    private static final String DEFAULT_DREAM = "AAAAAAAAAA";
    private static final String UPDATED_DREAM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_BLOOD_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_BLOOD_GROUP = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    @Autowired
    private StudentProfileRepository studentProfileRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStudentProfileMockMvc;

    private StudentProfile studentProfile;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentProfileResource studentProfileResource = new StudentProfileResource(studentProfileRepository);
        this.restStudentProfileMockMvc = MockMvcBuilders.standaloneSetup(studentProfileResource)
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
    public static StudentProfile createEntity(EntityManager em) {
        StudentProfile studentProfile = new StudentProfile()
            .dream(DEFAULT_DREAM)
            .birthDate(DEFAULT_BIRTH_DATE)
            .bloodGroup(DEFAULT_BLOOD_GROUP)
            .gender(DEFAULT_GENDER);
        return studentProfile;
    }

    @Before
    public void initTest() {
        studentProfile = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudentProfile() throws Exception {
        int databaseSizeBeforeCreate = studentProfileRepository.findAll().size();

        // Create the StudentProfile
        restStudentProfileMockMvc.perform(post("/api/student-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentProfile)))
            .andExpect(status().isCreated());

        // Validate the StudentProfile in the database
        List<StudentProfile> studentProfileList = studentProfileRepository.findAll();
        assertThat(studentProfileList).hasSize(databaseSizeBeforeCreate + 1);
        StudentProfile testStudentProfile = studentProfileList.get(studentProfileList.size() - 1);
        assertThat(testStudentProfile.getDream()).isEqualTo(DEFAULT_DREAM);
        assertThat(testStudentProfile.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testStudentProfile.getBloodGroup()).isEqualTo(DEFAULT_BLOOD_GROUP);
        assertThat(testStudentProfile.getGender()).isEqualTo(DEFAULT_GENDER);
    }

    @Test
    @Transactional
    public void createStudentProfileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentProfileRepository.findAll().size();

        // Create the StudentProfile with an existing ID
        studentProfile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentProfileMockMvc.perform(post("/api/student-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentProfile)))
            .andExpect(status().isBadRequest());

        // Validate the StudentProfile in the database
        List<StudentProfile> studentProfileList = studentProfileRepository.findAll();
        assertThat(studentProfileList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStudentProfiles() throws Exception {
        // Initialize the database
        studentProfileRepository.saveAndFlush(studentProfile);

        // Get all the studentProfileList
        restStudentProfileMockMvc.perform(get("/api/student-profiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentProfile.getId().intValue())))
            .andExpect(jsonPath("$.[*].dream").value(hasItem(DEFAULT_DREAM.toString())))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].bloodGroup").value(hasItem(DEFAULT_BLOOD_GROUP.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())));
    }
    

    @Test
    @Transactional
    public void getStudentProfile() throws Exception {
        // Initialize the database
        studentProfileRepository.saveAndFlush(studentProfile);

        // Get the studentProfile
        restStudentProfileMockMvc.perform(get("/api/student-profiles/{id}", studentProfile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studentProfile.getId().intValue()))
            .andExpect(jsonPath("$.dream").value(DEFAULT_DREAM.toString()))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.bloodGroup").value(DEFAULT_BLOOD_GROUP.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingStudentProfile() throws Exception {
        // Get the studentProfile
        restStudentProfileMockMvc.perform(get("/api/student-profiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudentProfile() throws Exception {
        // Initialize the database
        studentProfileRepository.saveAndFlush(studentProfile);

        int databaseSizeBeforeUpdate = studentProfileRepository.findAll().size();

        // Update the studentProfile
        StudentProfile updatedStudentProfile = studentProfileRepository.findById(studentProfile.getId()).get();
        // Disconnect from session so that the updates on updatedStudentProfile are not directly saved in db
        em.detach(updatedStudentProfile);
        updatedStudentProfile
            .dream(UPDATED_DREAM)
            .birthDate(UPDATED_BIRTH_DATE)
            .bloodGroup(UPDATED_BLOOD_GROUP)
            .gender(UPDATED_GENDER);

        restStudentProfileMockMvc.perform(put("/api/student-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudentProfile)))
            .andExpect(status().isOk());

        // Validate the StudentProfile in the database
        List<StudentProfile> studentProfileList = studentProfileRepository.findAll();
        assertThat(studentProfileList).hasSize(databaseSizeBeforeUpdate);
        StudentProfile testStudentProfile = studentProfileList.get(studentProfileList.size() - 1);
        assertThat(testStudentProfile.getDream()).isEqualTo(UPDATED_DREAM);
        assertThat(testStudentProfile.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testStudentProfile.getBloodGroup()).isEqualTo(UPDATED_BLOOD_GROUP);
        assertThat(testStudentProfile.getGender()).isEqualTo(UPDATED_GENDER);
    }

    @Test
    @Transactional
    public void updateNonExistingStudentProfile() throws Exception {
        int databaseSizeBeforeUpdate = studentProfileRepository.findAll().size();

        // Create the StudentProfile

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restStudentProfileMockMvc.perform(put("/api/student-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentProfile)))
            .andExpect(status().isBadRequest());

        // Validate the StudentProfile in the database
        List<StudentProfile> studentProfileList = studentProfileRepository.findAll();
        assertThat(studentProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudentProfile() throws Exception {
        // Initialize the database
        studentProfileRepository.saveAndFlush(studentProfile);

        int databaseSizeBeforeDelete = studentProfileRepository.findAll().size();

        // Get the studentProfile
        restStudentProfileMockMvc.perform(delete("/api/student-profiles/{id}", studentProfile.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StudentProfile> studentProfileList = studentProfileRepository.findAll();
        assertThat(studentProfileList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentProfile.class);
        StudentProfile studentProfile1 = new StudentProfile();
        studentProfile1.setId(1L);
        StudentProfile studentProfile2 = new StudentProfile();
        studentProfile2.setId(studentProfile1.getId());
        assertThat(studentProfile1).isEqualTo(studentProfile2);
        studentProfile2.setId(2L);
        assertThat(studentProfile1).isNotEqualTo(studentProfile2);
        studentProfile1.setId(null);
        assertThat(studentProfile1).isNotEqualTo(studentProfile2);
    }
}
