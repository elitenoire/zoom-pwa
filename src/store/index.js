import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { createOfflineMiddleware } from '@redux-offline/redux-offline/lib/middleware';

//import reducer and saga
import reducers from './reducers';
// import rootSaga from './sagas';

// use redux devtools in dev env
const isDevelopment = process.env.NODE_ENV === 'development';

const devTools = isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const offlineConfig = {
  ...defaultConfig,
};
// const history = createHistory({ basename: process.env.PUBLIC_URL})
// const reduxSaga = createReduxSaga();
// const middlewares = [routerMiddleware(history), reduxSaga]

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, createOfflineMiddleware(offlineConfig)];


const configure = (preloadedState = {}) => {
  const createOfflineStore = offline(offlineConfig)(createStore);

  const store = createOfflineStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  // run the sagas
  // sagaMiddleware.run(rootSaga);

  return store;
};

export default configure;

// import { createOffline } from "@redux-offline/redux-offline";
// const { middleware, enhanceReducer, enhanceStore } = createOffline(config);
// const store = createStore(
//   enhanceReducer(rootReducer),
//   initialStore,
//   compose(applyMiddleware(middleware), enhanceStore)
// );