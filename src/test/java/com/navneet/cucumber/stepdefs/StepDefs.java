package com.navneet.cucumber.stepdefs;

import com.navneet.TestangularApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TestangularApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
