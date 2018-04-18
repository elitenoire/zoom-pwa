import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { PersistGate } from 'redux-persist/integration/react'


import App from './App';
import configureStore from './store';

import registerServiceWorker from './registerServiceWorker';


const history = createHistory({ basename: process.env.PUBLIC_URL});
const { store, persistor } = configureStore(history);

const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
