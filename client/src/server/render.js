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

export default function render(req, res) {
  let user = {
    name: 'John Smith',
    dept: 'Web Team',
    lastLogin: new Date(),
    email: 'john@smith.com',
    id: 'abcde1234'
  };

  const location = createLocation(req.url);

  match({routes, location}, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    const store = configureStore({user: user}, false);

    const InitialView = (
        <Provider store={store} key="provider">
          <RoutingContext {...renderProps} />
        </Provider>
    );

    return fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
      .then(html => {
        const initialState = store.getState();
        const body = renderFullPage(InitialView, initialState);
        return res.status(200).end('<!DOCTYPE html>' + body);
      })
      .catch(err => {
        console.error(err);
        const body = renderFullPage("", {});
        return res.status(500).end(body);
      });
  });
}