package com.github.pitzcarraldo;

import com.github.pitzcarraldo.script.JavaScriptRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.script.ScriptException;

import java.util.Map;

import static org.fest.assertions.api.Assertions.assertThat;

/**
 * @author Alan(Minkyu Cho)
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = SpringReactReduxUniversalExampleApplication.class)
public class JavaScriptRunnerTest {
	@Autowired
	private MockHttpServletRequest request;

	@Autowired
	private JavaScriptRunner sut;

	@Test
	public void test() throws ScriptException, NoSuchMethodException {
		//Map<String, String> object = (Map<String, String>) sut.run("render", "/home");
		//assertThat(object).isNotNull();
	}
}