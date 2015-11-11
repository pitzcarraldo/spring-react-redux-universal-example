package com.github.pitzcarraldo.script;

import jdk.nashorn.api.scripting.NashornScriptEngine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.script.ScriptException;

/**
 * @author Alan(Minkyu Cho)
 */
@Slf4j
@Component
//@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class JavaScriptRunner {
	@Autowired
	public NashornScriptEngine nashornScriptEngine;

	public Object run(String method, Object... args) {
		try {
			return nashornScriptEngine.invokeFunction(method, args);
		} catch (ScriptException e) {
			log.error(e.getMessage(), e);
		} catch (NoSuchMethodException e) {
			log.error(e.getMessage(), e);
		}
		return null;
	}

}
