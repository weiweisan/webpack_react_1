import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

import axios from 'axios'
axios.defaults.baseURL = "http://47.96.21.88:8086/"

ReactDOM.render(<App />, document.getElementById('root'));
