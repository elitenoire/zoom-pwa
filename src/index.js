import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './store';
// import './styles/main.scss';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
