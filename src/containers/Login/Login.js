import React, {Component} from 'react';
import NavSimple from '../../components/NavSimple/NavSimple';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {userLogin, clearErrorMsg} from '../../reduxs/userinfo.redux';
import './Login.scss';

@connect(state => state, {userLogin, clearErrorMsg})
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmitForm = this
            .handleSubmitForm
            .bind(this);
    }
    componentDidMount() {
        // 判断props中的错误信息
        if (this.props.userInfo.errorMsg !== '') {
            this
                .props
                .clearErrorMsg('');
        }
    }
    handleChangeValue(key, ev) {
        // 判断props中的错误信息
        if (this.props.userInfo.errorMsg !== '') {
            this
                .props
                .clearErrorMsg('');
        }
        const val = ev.target.value;
        this.setState({[key]: val})
    }
    handleSubmitForm() {
        const {username, password} = this.state;
        if (!username.trim()) {
            this
                .props
                .clearErrorMsg('请填写用户名');
            return;
        }
        if (!password.trim()) {
            this
                .props
                .clearErrorMsg('请填写密码');
            return;
        }
        this
            .props
            .userLogin({username, password});
    }
    render() {

        const {errorMsg} = this.props.userInfo;
        const showError = errorMsg !== ''
            ? (
                <div className="error-item">
                    <i className="fa fa-minus-circle error-icon"></i>
                    <div className="err-msg">{errorMsg}</div>
                </div>
            )
            : null;
        const isLogin = this.props.userInfo.userAbout.username && this.props.userInfo.userAbout.username
            ? (
                <Redirect to="/"></Redirect>
            )
            : null;
        return (
            <div className="user-login-container">
                {isLogin}
                <NavSimple></NavSimple>
                <div className="page-wrap">
                    <div className="w">
                        <div className="user-con">
                            <div className="user-title">用户登录</div>
                            <div className="user-box">
                                {/*错误信息提示*/}
                                {showError}
                                <div className="user-item">
                                    <label className="user-label" htmlFor="username">
                                        <i className="fa fa-user"></i>
                                    </label>
                                    <input
                                        className="user-content"
                                        id="username"
                                        placeholder="请输入用户名"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'username')}/>
                                </div>
                                <div className="user-item">
                                    <label className="user-label" htmlFor="password">
                                        <i className="fa fa-lock"></i>
                                    </label>
                                    <input
                                        type="password"
                                        className="user-content"
                                        id="password"
                                        placeholder="请输入密码"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'password')}/>
                                </div>
                                <div className="btn btn-submit" id="submit" onClick={this.handleSubmitForm}>登录</div>
                                <div className="link-item">
                                    <Link className="link" to='/'>忘记密码</Link>
                                    <Link className="link" to='/register'>免费注册</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;