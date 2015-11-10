package com.github.pitzcarraldo;

import jdk.nashorn.api.scripting.NashornScriptEngine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

/**
 * @author Alan(Minkyu Cho)
 */
@Slf4j
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class JavaScriptRunner {
	public Object run(String method, Object... args) {
		try {
			return getEngine().invokeFunction(method, args);
		} catch (ScriptException e) {
			log.error(e.getMessage(), e);
		} catch (NoSuchMethodException e) {
			log.error(e.getMessage(), e);
		}
		return null;
	}

	private NashornScriptEngine getEngine() {
		NashornScriptEngine nashornScriptEngine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
		try {
			nashornScriptEngine.eval(read("static/nashorn.polyfill.js"));
			nashornScriptEngine.eval(read("static/server.js"));
			nashornScriptEngine.eval(read("static/app.js"));
		} catch (ScriptException e) {
			throw new RuntimeException(e);
		}
		return nashornScriptEngine;
	}

	private Reader read(String path) {
		InputStream input = getClass().getClassLoader().getResourceAsStream(path);
		return new InputStreamReader(input);
	}
}
