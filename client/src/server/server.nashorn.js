import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';

import createLocation from 'history/lib/createLocation';
import { fetchComponentDataBeforeRender } from '../common/api/fetchComponentDataBeforeRender';

import configureStore from '../common/store/configureStore';
import { getUser } from '../common/api/user';
import routes from '../common/routes';
import packagejson from '../../package.json';
import Html from '../common/containers/Html';

const renderFullPage = (html, initialState) => {
	return ReactDOMServer.renderToString(<Html html={html} initialState={initialState}/>);
};

const response = (status, result) => {
	return {
		status,
		result
	}
};

const render = (url) => {
	const location = createLocation(url);
	getUser(user => {

			if (!user) {
				return response(400, 'Not Authorised');
			}

			match({routes, location}, (err, redirectLocation, renderProps) => {

				if (err) {
					console.error(err);
					return response(500, 'Internal server error');
				}

				if (!renderProps) {
					return response(404, 'Not found');
				}

				const store = configureStore({user: user, version: packagejson.version});
				const InitialView = (
					<div>
						<Provider store={store}>
							<RoutingContext {...renderProps} />
						</Provider>
					</div>
				);
				//This method waits for all render component promises to resolve before returning to browser
				return fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
					.then(html => {
						const componentHTML = ReactDOMServer.renderToString(InitialView);
						const initialState = store.getState();
						response(200, renderFullPage(componentHTML, initialState));
					})
					.catch(err => {
						console.log(err);
						response(500, renderFullPage("", {}));
					});
			});
		}
	)
};