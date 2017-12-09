import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
const App = () => (<h2>页面初始化完成</h2>)
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
