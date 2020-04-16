import React from 'react';
import ReactDOM from 'react-dom';
import MainContent from './landing/mainContent';
import Footer from './common/Footer';
import Header from './common/Header'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<MainContent />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
