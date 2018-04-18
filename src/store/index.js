import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers';


// use redux devtools in dev env
const isDevelopment = process.env.NODE_ENV === 'development';

const devTools = isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const persistConfig = {
  key: 'zoom-state',
  storage,
}


const middleware = [thunk]


const configure = (history) => {

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  let store = createStore(
    persistedReducer ,
    composeEnhancers(applyMiddleware(...middleware, routerMiddleware(history)))
  );

  let persistor = persistStore(store)

  return { store, persistor} ;
};

export default configure;
