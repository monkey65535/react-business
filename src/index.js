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

// 页面组件
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

// redux调试工具
const reduxDevtools = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;

// 创建store
const store = createStore(Reducers, compose(applyMiddleware(Thunk), reduxDevtools));

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
        </Switch>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
