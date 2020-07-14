import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import './styles/sneakers-page.css';
import './styles/all_models.css';
import './styles/MainPage.css';
import './styles/slider.css';
import './styles/search.css';
import * as serviceWorker from './serviceWorker';
import HttpsRedirect from "react-https-redirect";

ReactDOM.render(
  <HttpsRedirect>
    <App />
  </HttpsRedirect>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
