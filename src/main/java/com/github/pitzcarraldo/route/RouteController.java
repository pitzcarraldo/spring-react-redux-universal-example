package com.github.pitzcarraldo.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Alan(Minkyu Cho)
 */
@RestController
public class RouteController {
	@Autowired
	private RouteService routeService;

	@RequestMapping("/**")
	public String index(HttpServletRequest request) {
		RouteResult routeResult = routeService.getRouteResult(request.getRequestURI());
		return routeResult.getResult();
	}
}
