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
			<div id="root" dangerouslySetInnerHTML={{__html: html}}/>
			<script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${serialize(initialState)};`}} charSet="UTF-8"/>
			<script src="/static/bundle.js"></script>
			</body>
			</html>
		);
	}
}