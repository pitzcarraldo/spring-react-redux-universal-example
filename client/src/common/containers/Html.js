import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
	static propTypes = {
		html: PropTypes.string,
		initialState: PropTypes.object
	};

	render() {
		const {html, initialState} = this.props;
		return (
			<html lang="en-us">
			<head>
				<link rel="shortcut icon" href="/favicon.ico"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
			</head>
			<body>
			<div id="root">${html}</div>
			<script>
				window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
			</script>
			<script src="/static/bundle.js"></script>
			</body>
			</html>
		);
	}
}