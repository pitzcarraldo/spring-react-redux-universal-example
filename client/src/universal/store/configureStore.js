import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import DevTools from '../../universal/components/DevTools';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';
import promiseMiddleware from '../api/promiseMiddleware';
import rootReducer from '../reducers';

const middlewareBuilder = (isClient) => {

  let middleware = {};
  let universalMiddleware = [thunk, promiseMiddleware];
  let allComposeElements = [];

  if (isClient) {
    middleware = applyMiddleware(...universalMiddleware, createLogger());
    allComposeElements = [
      middleware,
      reduxReactRouter({
        createHistory
      }),
      DevTools.instrument()
    ]
  } else {
    middleware = applyMiddleware(...universalMiddleware);
    allComposeElements = [
      middleware
    ]
  }

  return allComposeElements;

};

export default function configureStore(initialState, isClient) {
  const finalCreateStore = compose(...middlewareBuilder(isClient))(createStore);
  const store = finalCreateStore(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}