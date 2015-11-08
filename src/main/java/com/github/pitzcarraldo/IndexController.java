package com.github.pitzcarraldo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

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
		return "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>ABC</title></head><body>BODY</body></html>";
	}
}
