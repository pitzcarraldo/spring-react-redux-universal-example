function render(uri, query, cookie) {
	return JSON.stringify({uri: uri, query: query, cookie: cookie});
}

function get(uri) {
	var result;
	axios.get(uri).then(function (response) {
		result = response;
	});
	while (!result) {}
	return result;
}