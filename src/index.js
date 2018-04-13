import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';


import App from './App';
import configureStore from './store';

import registerServiceWorker from './registerServiceWorker';


const history = createHistory({ basename: process.env.PUBLIC_URL});
const store = configureStore(history);

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
// registerServiceWorker();
