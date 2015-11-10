package com.github.pitzcarraldo.route;

import com.github.pitzcarraldo.script.JavaScriptRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author Alan(Minkyu Cho)
 */
@Service
public class RouteService {
	private static final String STATUS_KEY = "status";
	private static final String RESULT_KEY = "result";

	@Autowired
	private JavaScriptRunner runner;

	public RouteResult getRouteResult(String requestUri) {
		Map<String, Object> result = (Map<String, Object>) runner.run("app", requestUri);
		return new RouteResult((Integer) result.get(STATUS_KEY), (String) result.get(RESULT_KEY));
	}
}
