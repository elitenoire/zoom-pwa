import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import App from './App';
import configureStore from './store';
import './style/index.css';
import registerServiceWorker from './registerServiceWorker';

// loads the Icon plugin
UIkit.use(Icons);

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
registerServiceWorker();
