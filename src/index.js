import React from 'react';
import ReactDOM from 'react-dom';
import './static/reset.css';
import './static/index.scss';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';
// eslint-disable-next-line
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Reducers from './reducers';
// Axios 拦截器
import './Axios.config';

// redux调试工具
const reduxDevtools = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;

// 创建store
const store = createStore(Reducers, compose(applyMiddleware(Thunk), reduxDevtools));

const App = () => {
    return (<h2>页面初始化完成</h2>);
}
ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <Switch>
            <App></App>
        </Switch>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
