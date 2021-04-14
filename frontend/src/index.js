import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './app/app'
import { LoginPage } from './app/loginPage';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      ReactDOM.render(NextApp);
    });
  }