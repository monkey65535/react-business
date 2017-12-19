import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';
// eslint-disable-next-line
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Reducers from './reducers';

// css
import './static/reset.css';
import './static/index.scss';
import '../node_modules/font-awesome/css/font-awesome.css';

// Axios 拦截器
import './Axios.config';

// 页面组件
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Result from './containers/Result/Result';
import PassReset from './containers/PassReset/PassReset';
import UserCenter from './containers/UserCenter/UserCenter';
import PassUpdate from './containers/PassUpdate/PassUpdate';
import Footer from './components/Footer/Footer';


// redux调试工具
const reduxDevtools = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;

// 创建store
const store = createStore(Reducers, compose(applyMiddleware(Thunk), reduxDevtools));

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <div className="router-dom">
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/usercenter' component={UserCenter}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/result/:type' component={Result}></Route>
                <Route path='/pass-reset' component={PassReset}></Route>
                <Route path='/pass-update' component={PassUpdate}></Route>
            </Switch>
            <Footer></Footer>
        </div>

    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();