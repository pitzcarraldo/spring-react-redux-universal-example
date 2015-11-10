package com.github.pitzcarraldo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author Alan(Minkyu Cho)
 */
@Controller
public class IndexController {
	@Autowired
	private JavaScriptRunner runner;

	@RequestMapping("/**")
	@ResponseBody
	public String index(HttpServletRequest request) {
		Map<String, String> result = (Map<String, String>) runner.run("render", request.getRequestURI());
		return result.get("result");
	}
}
