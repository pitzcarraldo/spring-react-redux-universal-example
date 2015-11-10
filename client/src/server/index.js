import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { fetchComponentDataBeforeRender } from '../universal/api/fetchComponentDataBeforeRender';

import configureStore from '../universal/store/configureStore';
import routes from '../universal/routes';
import Html from '../universal/containers/Html';

const renderFullPage = (html, initialState) => {
	return ReactDOMServer.renderToString(<Html html={html} initialState={initialState}/>);
};

const getResponse = (status, result) => {
	return {
		status,
		result
	}
};

export default function render(url) {
	let response;
	let user = {
		name : 'John Smith',
		dept : 'Web Team',
		lastLogin : new Date(),
		email : 'john@smith.com',
		id : 'abcde1234'
	};
	const location = createLocation(url);
	match({routes, location}, (err, redirectLocation, renderProps) => {
		if (err) {
			console.error(err);
			response = getResponse(500, 'Internal server error');
			return;
		}

		if (!renderProps) {
			response = getResponse(404, 'Not found');
			return;
		}

		const store = configureStore({user: user});
		const InitialView = (
			<div>
				<Provider store={store}>
					<RoutingContext {...renderProps} />
				</Provider>
			</div>
		);

		return fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
			.then(html => {
				const componentHTML = ReactDOMServer.renderToString(InitialView);
				const initialState = store.getState();
				response = getResponse(200, renderFullPage(componentHTML, initialState));
			})
			.catch(err => {
				console.log(err);
				response = getResponse(500, renderFullPage("", {}));
			});
	});
	while (!response) {}
	return response;
}