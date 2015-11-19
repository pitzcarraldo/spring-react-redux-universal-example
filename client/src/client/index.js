import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import configureStore from '../universal/store/configureStore';
import routes from '../universal/routes';
import DevTools from '../universal/components/DevTools';

import "../../styles/index.css";

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, true);
const InitView = (
  <Provider store={store} key="provider">
    <ReduxRouter routes={routes} />
  </Provider>
);

//ReactDOM.render(InitView, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  require('./createDevToolsWindow')(store);
}